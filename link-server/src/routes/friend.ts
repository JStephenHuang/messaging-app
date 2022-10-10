import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { FriendAddBodySchema } from "../schemas/friend";
import { User } from "../models/user";
import { isValidBody } from "../middlewares/validation";
import { v4 as uuidv4 } from "uuid";
import { Friend } from "../models/friend";

const router = Router();

router.post("/add", isValidBody(FriendAddBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  const user = await User.findOne({ where: { username: (req.user as User).username } });
  const friend = await User.findOne({ where: { username: req.body.user1 } });
  if (!user) return res.status(404).send({ error: "UserNotFound" });
  if (!friend) return res.status(404).send({ error: "UserNotFound" });
  const user1 = req.body.user1;
  const user2 = req.body.user2;
  const tag = [user1, user2].sort().join("");
  const uuid = uuidv4();

  Friend.create({ tag, user1, user2, uuid }).then(
    (friendRoom) => {
      friendRoom.addUser(user);
      friendRoom.addUser(friend);
      res.status(200).json();
    },
    (err) => {
      if (err.name === "SequelizeUniqueConstraintError") return res.status(409).send({ error: "UserAlreadyFriend" });
    }
  );
});

export { router };
