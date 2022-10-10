import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import passport from "passport";
import crypto from "crypto";
import cors from "cors";
import session from "express-session";

import { router as authRouter } from "./routes/auth";
import { router as roomRouter } from "./routes/room";
import { router as messagerRouter } from "./routes/message";
import { router as userRouter } from "./routes/user";
import { router as friendRouter } from "./routes/friend";
import { initializeSequelize } from "./services/db";
import { Dialect } from "sequelize";

import { User } from "./models/user";
import { Message } from "./models/message";
import { Room } from "./models/room";
import { UserRoom } from "./models/user_room";
import { Strategy as LocalStrategy } from "passport-local";
import { Friend } from "./models/friend";
import { ClassificationType } from "typescript";

dotenv.config();

const corsConfig = {
  origin: ["http://localhost:3000", "http://192.168.2.38:3000", "http://0.0.0.0:3000"],
  credentials: true,
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsConfig,
});

// cors
app.use(cors(corsConfig));

// express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express-session
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((usermame, password, done) => {
    User.findOne({ where: { username: usermame } }).then(
      (user) => {
        if (!user) return done("UserNotFound", false);
        const passwordHash = crypto.pbkdf2Sync(password, user.passwordSalt, 310000, 32, "sha256").toString("hex");
        if (passwordHash === user.passwordHash) return done(null, user);
        else return done("IncorrectUsernameOrPassword", false);
      },
      (err) => {
        done(err);
      }
    );
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// routes
app.use("/auth", authRouter);
app.use("/room", roomRouter);
app.use("/message", messagerRouter);
app.use("/user", userRouter);
app.use("/friend", friendRouter);

//io server
io.on("connection", (socket: Socket) => {
  console.log("-------");
  console.log(`${socket.id} connected.`);

  socket.on("connect", () => {
    console.log("Connection occured");
  });

  socket.on("disconnect", () => {
    console.log("Disconnection occured");
  });
});

initializeSequelize((process.env.DIALECT as Dialect) || "sqlite", process.env.STORAGE || ":memory:").then(() => {
  const host = process.env.HOST;
  const port = process.env.PORT || "3000";
  console.log(process.env.IP);

  Message.afterCreate(async (message) => {
    const user = await User.findOne({ where: { username: message.username } });
    const room = await Room.findOne({ where: { uuid: message.uuid } });
    const friend = await Friend.findOne({ where: { uuid: message.uuid } });
    let recipient: Room | Friend | null;

    if (!user) return;

    if (friend) {
      recipient = friend;
      message.setFriend(recipient);
    } else if (room) {
      recipient = room;
      message.setRoom(recipient);
    } else {
      return;
    }

    message.setUser(user);

    recipient.addMessage(message);

    io.emit(`message/${message.uuid}`, message);
  });

  Room.afterCreate(async (room) => {
    const user = await User.findOne({ where: { username: room.owner } });

    if (!user) return;

    io.emit(`create/room/${user.username}`, room);
  });

  Room.afterDestroy(async (room) => {
    const user = await User.findOne({ where: { username: room.owner } });

    if (!user) return;

    io.emit(`delete/room/${user.username}`, room);
  });

  server.listen(parseInt(port), host, () => {
    console.log(`Server listening on ${host}:${port}`);
  });
});
