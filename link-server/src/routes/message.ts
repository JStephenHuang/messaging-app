import { Router, Request, Response } from "express";
import { isValidBody, isValidQuery } from "../middlewares/validation";
import { MessageSendBodySchema, MessageGetQuerySchema } from "../schemas/message";
import { User } from "../models/user";
import { Room } from "../models/room";
import { Message } from "../models/message";
import { isAuthenticated } from "../middlewares/auth";
import { Friend } from "../models/friend";

const router = Router();

router.get("/", isValidQuery(MessageGetQuerySchema), isAuthenticated, async (req: Request, res: Response) => {
  const room = await Room.findOne({ where: { uuid: req.query.uuid }, include: Message });
  const friend = await Friend.findOne({ where: { uuid: req.query.uuid }, include: Message });

  let recipient: Room | Friend | null;

  if (friend) {
    recipient = friend;
  } else if (room) {
    recipient = room;
  } else {
    return res.status(404).send({ error: "UserOrRoomNotFound" });
  }

  return res.status(200).json(
    recipient.Messages.map((message) => ({
      content: message.content,
      uuid: message.uuid,
      username: message.username,
    }))
  );
});

router.post("/", isValidBody(MessageSendBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");

  const message = await Message.create({
    content: req.body.content,
    uuid: req.body.uuid,
    username: (req.user as User).username,
  });

  return res.status(201).json();
});

export { router };
