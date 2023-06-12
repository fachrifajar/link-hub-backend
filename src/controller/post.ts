import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const addPost = async (req: Request, res: Response) => {
  interface RequestBody {
    title: string;
  }

  try {
    const getUsernameToken = (req as any).name;
    const { title }: RequestBody = req.body;

    const addPost = await prisma.post.create({
      data: {
        title,
        username: getUsernameToken,
      },
    });

    res.status(201).json({
      message: "Success Add New Post",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addPost };
