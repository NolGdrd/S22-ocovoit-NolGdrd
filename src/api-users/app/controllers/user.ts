import { Request, Response } from "express";
import { User } from "../models/user";
import HttpError from "../errors/httpError";

const userController = {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    let users;
    if (req.query.email && typeof req.query.email === "string") {
      users = await User.findAll({ email: req.query.email });
    } else {
      users = await User.findAll();
    }
    res.json({ status: "success", data: users });
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError(404, "user not found");
    }
    res.json({ status: "success", data: user });
  },

  async createUser(req: Request, res: Response): Promise<void> {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ status: "success", data: newUser });
  },

  async updateUser(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError(404, "user not found");
    }
    Object.assign(user, req.body);
    await user.save();
    res.json({ status: "success", data: user });
  },

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id, 10);
    const result = await User.deleteById(userId);
    if (result) {
      res.json({ status: "success" });
    } else {
      throw new HttpError(404, "user not found");
    }
  },
};

export default userController;
