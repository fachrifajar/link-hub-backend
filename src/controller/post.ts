import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const addPost = async (req: Request, res: Response) => {
  interface RequestBody {
    title: string;
  }

  try {
    const getIdToken = (req as any).id;
    const { title }: RequestBody = req.body;

    const addPost = await prisma.post.create({
      data: {
        title,
        user_id: getIdToken,
      },
    });

    res.status(201).json({
      message: "Success add new Post",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const getIdToken = (req as any).id;

    const post = await prisma.post.findMany({
      where: { user_id: getIdToken },
      select: {
        id: true,
        title: true,
        url: true,
        created_at: true,
        updated_at: true,
      },
    });

    // const updatedTime = new Date(post?.[0].created_at);
    // const formattedDate = updatedTime.toLocaleString("en-US", {
    //   day: "numeric",
    //   month: "long",
    //   year: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    // });
    // console.log(formattedDate);

    // const updatedTime2 = new Date(post?.[0].updated_at);
    // const formattedDate2 = updatedTime2.toLocaleString("en-US", {
    //   day: "numeric",
    //   month: "long",
    //   year: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    // });
    // console.log(formattedDate2);

    res.status(200).json({
      message: `Success get detail`,
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const editPost = async (req: Request, res: Response) => {
  interface RequestBody {
    title: string;
    post_id: string;
  }
  try {
    const { title, post_id }: RequestBody = req.body;
    const getIdToken = (req as any).id;

    const validatePost = await prisma.post.findUnique({
      where: { id: post_id },
      select: {
        user_id: true,
      },
    });

    if (validatePost?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot edit another user's post." });
    }

    const editPost = await prisma.post.update({
      where: { id: post_id },
      data: {
        title,
      },
    });

    res.status(201).json({
      message: "Success edit Post",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const getIdToken = (req as any).id;

    const validatePost = await prisma.post.findUnique({
      where: { id: post_id },
      select: {
        user_id: true,
      },
    });

    if (validatePost?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot delete another user's post." });
    }

    const deletePost = await prisma.post.delete({
      where: { id: post_id },
    });

    res.status(201).json({
      message: "Success Delete Post",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addPost, getPost, editPost, deletePost };
