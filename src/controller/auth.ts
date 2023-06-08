require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ACC_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const register = async (req: Request, res: Response) => {
  try {
    const { email, username, pwd } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw { code: 400, message: "Email or username is already taken" };
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        pwd: hashedPwd,
      },
    });

    res.status(201).json({
      message: `Success created new user: ${email}`,
      //   data: {
      //     email,
      //   },
    });
  } catch (error: any) {
    console.error(error);
    res.status(error?.code ?? 500).json({
      message: error || "Internal Server Error",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, pwd } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return res.status(401).json({ message: "Email not found" });

    const isPasswordValid = await bcrypt.compare(pwd, user.pwd);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const accessToken = jwt.sign(
      {
        id: user?.id,
        name: user?.username,
        iat: new Date().getTime(),
      },
      ACC_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

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

module.exports = { register, login };
