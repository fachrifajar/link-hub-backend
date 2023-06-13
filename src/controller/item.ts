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

    const validateItem = await prisma.post.findUnique({
      where: { id: post_id },
      select: {
        user_id: true,
        Item: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!validateItem)
      return res.status(400).json({ message: "post_id not found" });

    if (validateItem?.Item?.length === 10)
      return res.status(400).json({
        message:
          "You have reached the maximum limit of items. Only 10 items are allowed per post.",
      });

    if (validateItem?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot add item from another user's post" });
    }

    for (const i of validateItem?.Item) {
      if (i?.title?.toLowerCase() === title.toLowerCase()) {
        return res.status(400).json({ message: "Title already exists." });
      }
    }

    const addItem = await prisma.item.create({
      data: {
        title,
        url,
        post_id,
        user_id: getIdToken,
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

const editItem = async (req: Request, res: Response) => {
  interface RequestBody {
    title: string;
    url: string;
    item_id: string;
  }
  try {
    const { title, url, item_id }: RequestBody = req.body;
    const getIdToken = (req as any).id;

    console.log(item_id);

    const validateItem = await prisma.item.findUnique({
      where: { id: item_id },
      select: {
        user_id: true,
      },
    });

    if (!validateItem)
      return res.status(400).json({ message: "item_id not found" });

    if (validateItem?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot edit another user's item." });
    }

    const editItem = await prisma.item.update({
      where: { id: item_id },
      data: {
        title,
        url,
      },
    });

    res.status(201).json({
      message: `Success edit Item: ${item_id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getItem = async (req: Request, res: Response) => {
  try {
    const getIdToken = (req as any).id;
    const { post_id } = req.params;

    const post = await prisma.item.findMany({
      where: { post_id: post_id },
      select: {
        id: true,
        title: true,
        url: true,
        created_at: true,
        updated_at: true,
      },
    });

    res.status(200).json({
      message: `Success get user Item`,
      data: {
        total: post?.length,
        post,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;

    const getIdToken = (req as any).id;

    const validatePost = await prisma.item.findUnique({
      where: { id: post_id },
      select: {
        user_id: true,
      },
    });

    if (!validatePost)
      return res.status(400).json({ message: "post_id not found" });

    if (validatePost?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot delete another user's post." });
    }

    const deletePost = await prisma.item.delete({
      where: { id: post_id },
    });

    res.status(202).json({
      message: "Success delete Item",
    });
  } catch (error) {}
};

module.exports = { addItem, editItem, getItem, deleteItem };
