import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const addItem = async (req: Request, res: Response) => {
  interface RequestBody {
    title: string;
    url: string;
    post_id: string;
  }
  try {
    const { title, url, post_id }: RequestBody = req.body;
    const getIdToken = (req as any).id;

    const validatePost = await prisma.post.findUnique({
      where: { id: post_id },
      select: {
        user_id: true,
      },
    });

    console.log(validatePost);

    if (!validatePost)
      return res.status(400).json({ message: "post_id not found" });

    if (validatePost?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot add item from another user's post" });
    }

    const addItem = await prisma.item.create({
      data: {
        title,
        url,
        post_id,
      },
    });

    res.status(201).json({
      message: `Success add aew Item, from Post: ${post_id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addItem };
