import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { RoomCreateBodySchema, RoomJoinBodySchema, RoomLeaveBodySchema } from "../schemas/room";
import { User } from "../models/user";
import { Room } from "../models/room";
import { isValidBody } from "../middlewares/validation";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.post("/create", isValidBody(RoomCreateBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  const room = await Room.create({ uuid: uuidv4(), name: req.body.name, owner: req.body.owner });
  const user = await User.findOne({ where: { username: (req.user as User).username } });
  if (!user) return res.status(404).send({ error: "UserNotFound" });
  await room.addUser(user);
  return res.status(200).json({ roomUuid: room.uuid });
});

router.post("/join", isValidBody(RoomJoinBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  const room = await Room.findOne({ where: { uuid: req.body.uuid } });
  const user = await User.findOne({ where: { username: (req.user as User).username } });
  if (!room) return res.status(404).send({ error: "RoomNotFound" });
  if (!user) return res.status(404).send({ error: "UserNotFound" });
  await room.addUser(user);
  return res.status(200).send();
});

router.post("/leave", isValidBody(RoomLeaveBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  const room = await Room.findOne({ where: { uuid: req.body.uuid } });
  const user = await User.findOne({ where: { username: (req.user as User).username } });
  if (!room) return res.status(404).send({ error: "RoomNotFound" });
  if (!user) return res.status(404).send({ error: "UserNotFound" });
  await room.removeUser(user);
  return res.status(200).send();
});

router.post("/delete", isValidBody(RoomLeaveBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  const room = await Room.findOne({ where: { uuid: req.body.uuid } });
  const user = await User.findOne({ where: { username: (req.user as User).username } });
  if (!room) return res.status(404).send({ error: "RoomNotFound" });
  if (!user) return res.status(404).send({ error: "UserNotFound" });
  await room.destroy();
  return res.status(200).send();
});

export { router };
