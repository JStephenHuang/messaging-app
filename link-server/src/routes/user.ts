import { Router, Request, Response } from "express";

import { Op } from "sequelize";
import { UserGetQuerySchema, UserGetQuery } from "../schemas/user";
import { isValidQuery } from "../middlewares/validation";
import { RoomGetQuerySchema } from "../schemas/room";
import { TypedRequest, TypedResponse } from "../types/express";
import { isAuthenticated } from "../middlewares/auth";

import { User } from "../models/user";
import { Friend } from "../models/friend";
import { UserRoom } from "../models/user_room";
import { Room } from "../models/room";

const router = Router();

router.get(
  "/",
  isValidQuery(UserGetQuerySchema),
  async (req: TypedRequest<{ prefix: string; limit: string }, {}>, res: Response) => {
    const users = await User.findAll({
      where: { username: { [Op.like]: `${req.query.prefix}%` } },
      limit: parseInt(req.query.limit),
    });

    return res.status(200).json(users.map((user) => user.username));
  }
);

router.get("/rooms", isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  const user = await User.findOne({
    where: { username: (req.user as User).username },
    include: Room,
  });

  if (!user) return res.status(404).send({ error: "UserNotFound" });

  return res.status(200).json(user.Rooms.map((room) => ({ name: room.name, uuid: room.uuid, owner: room.owner })));
});

router.get("/friends", isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  const user = await User.findOne({
    where: { username: (req.user as User).username },
    include: Friend,
  });

  if (!user) return res.status(404).send({ error: "UserNotFound" });
  return res.status(200).json(
    user.Friends.map((friend) => ({
      recipients: { user1: friend.user1, user2: friend.user2 },
      uuid: friend.uuid,
    }))
  );
});

export { router };
