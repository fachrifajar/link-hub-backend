require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ACC_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REF_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
  interface RegisterRequest {
    email: string;
    username: string;
    pwd: string;
  }

  interface RequestBody {
    email: string;
    username: string;
    pwd: string;
  }

  try {
    const { email, username, pwd }: RequestBody = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    const googleAuthValidate = await prisma.user.findUnique({
      where: { email },
    });

    if (googleAuthValidate) {
      throw { code: 400, message: "Email already registered" };
    }

    if (existingUser && pwd?.length) {
      throw { code: 400, message: "Email or username is already taken" };
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);
    const generatedUuid = uuidv4();
    const usernameRandom = `firebase-${generatedUuid}`;
    const secretPwd = process.env.SECRET_PWD || ""
    if (!pwd?.length) {
      const newUser = await prisma.user.create({
        data: {
          email,
          username: usernameRandom,
          pwd: secretPwd,
        },
      });
    } else {
      const newUser: RegisterRequest = await prisma.user.create({
        data: {
          email,
          username,
          pwd: hashedPwd,
        },
      });
    }

    res.status(201).json({
      message: `Success created new user: ${email}`,
    });
  } catch (error: any) {
    console.error(error);
    res.status(error?.code ?? 500).json({
      message: error || "Internal Server Error",
    });
  }
};

const login = async (req: Request, res: Response) => {
  interface RequestBody {
    email: string;
    pwd: string;
  }
  try {
    const { email, pwd }: RequestBody = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return res.status(401).json({ message: "Email not found" });

    if (pwd !== process.env.SECRET_PWD) {
      const isPasswordValid = await bcrypt.compare(pwd, user.pwd);
      if (!isPasswordValid)
        return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        id: user?.id,
        name: user?.username,
      },
      ACC_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        id: user?.id,
        name: user?.username,
      },
      REF_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const addRefToken = await prisma.user.update({
      where: { id: user?.id },
      data: {
        ref_token: refreshToken,
        is_new_user: 1,
      },
    });

    res.status(200).json({
      message: `Login successfull!`,
      data: {
        id: user?.id,
        username: user?.username,
        accessToken,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid ID" });
    }

    const refreshToken = user.ref_token;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token found" });
    }

    jwt.verify(refreshToken, REF_TOKEN_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: "Token Expired" });

      const getRefreshToken = jwt.sign(
        {
          id: user?.id,
          name: user?.username,
        },
        ACC_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Successfully retrieved refresh token",
        data: {
          getRefreshToken,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login, refreshToken };
