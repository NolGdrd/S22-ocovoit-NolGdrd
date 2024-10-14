import { Request, Response } from "express";
import HttpError from "../errors/httpError";
import debug from "debug";
import jwt from "jsonwebtoken";
import { hash, verify } from "../scrypt";

const log = debug("app:api-authentication");

const API_URL = process.env.API_USERS_URL || "http://api-users:3000";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const mainController = {
  signUp: async (req: Request, res: Response): Promise<void> => {
    req.body.password = await hash(req.body.password);
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new HttpError(response.status, result.message);
    }
    log("User created successfully");
    res.json({ staus: "success", message: "User created successfully" });
  },

  signIn: async (req: Request, res: Response) => {
    const response = await fetch(
      `${API_URL}/api/users?email=${req.body.email}`
    );
    const result = await response.json();
    const user = result.data[0];
    const isValidPassword = await verify(req.body.password, user.password);
    if (!user || !isValidPassword) {
      throw new HttpError(400, "email or password is incorrect");
    }
    const accessToken = jwt.sign(
      { user: { id: user.id, roles: user.roles } },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const { password, ...userWithoutPassword } = user;
    log("User logged in successfully");
    log(accessToken);
    res.json({
      status: "success",
      data: {
        user: userWithoutPassword,
        accessToken,
      },
    });
  },
};

export default mainController;
