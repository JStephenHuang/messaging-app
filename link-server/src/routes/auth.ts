import { Router, Request, Response } from "express";
import passport from "passport";
import crypto from "crypto";
import { User } from "../models/user";
import { LoginBodySchema, RegisterBodySchema } from "../schemas/auth";
import { isValidBody } from "../middlewares/validation";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).send(req.isAuthenticated());
});

router.post(
  "/login",
  isValidBody(LoginBodySchema),
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    return res.status(200).json();
  }
);

router.post("/register", isValidBody(RegisterBodySchema), async (req: Request, res: Response) => {
  const username = req.body.username;
  const passwordSalt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto.pbkdf2Sync(req.body.password, passwordSalt, 310000, 32, "sha256").toString("hex");
  User.create({ username, passwordSalt, passwordHash }).then(
    (user) => res.status(200).json(),
    (err) => {
      if (err.name === "SequelizeUniqueConstraintError") return res.status(409).send({ error: "UserAlreadyExists" });
      else return res.status(500).send({ error: err });
    }
  );
});

router.post("/logout", async (req: Request, res: Response) => {
  req.logout();
  return res.status(200).send();
});

export { router };
