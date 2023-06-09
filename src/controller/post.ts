import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const addPost = async (req: Request, res: Response) => {
  interface RequestBody {
    title: string;
    bg_color: string;
  }

  try {
    const getIdToken = (req as any).id;
    const { title, bg_color }: RequestBody = req.body;

    const validateCountPost = await prisma.post.findMany({
      where: { user_id: getIdToken },
      select: {
        title: true,
      },
    });

    if (validateCountPost.length === 3)
      return res.status(400).json({
        message:
          "You have reached the maximum limit of posts. Only 3 posts are allowed per user.",
      });

    const addPost = await prisma.post.create({
      data: {
        title,
        bg_color,
        user_id: getIdToken,
      },
      select: {
        id: true,
      },
    });

    res.status(201).json({
      message: `Success add new Post: ${addPost?.id}`,
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
        use_title: true,
        bg_color: true,
        bg: true,
        bg_direction: true,
        button_option: true,
        button_color: true,
        button_font_color: true,
        font_color: true,
        url: true,
        created_at: true,
        updated_at: true,
        items: true,
        SocialMedia: {
          select: {
            id: true,
            platform: true,
            url: true,
          },
        },
      },
    });

    res.status(200).json({
      message: `Success get user Post`,
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPostSearch = async (req: Request, res: Response) => {
  try {
    const { post_id } = req?.params;

    const post = await prisma.post.findMany({
      where: { id: post_id },
      select: {
        id: true,
        title: true,
        use_title: true,
        bg_color: true,
        bg: true,
        bg_direction: true,
        button_option: true,
        button_color: true,
        button_font_color: true,
        font_color: true,
        url: true,
        created_at: true,
        updated_at: true,
        items: true,
        user_id: true,
        SocialMedia: {
          select: {
            id: true,
            platform: true,
            url: true,
          },
        },
        Item: {
          select: {
            id: true,
            title: true,
            url: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });

    const getUserId = post[0]?.user_id;

    const user = await prisma.user.findUnique({
      where: { id: getUserId },
      select: {
        username: true,
        profile_picture: true,
      },
    });

    const orderedItems = post[0]?.Item.sort((a, b) => {
      const aIndex = post[0]?.items?.indexOf(a.id) ?? -1;
      const bIndex = post[0]?.items?.indexOf(b.id) ?? -1;
      return aIndex - bIndex;
    });

    res.status(200).json({
      message: `Success get user Post`,
      data: {
        post,
        user,
        orderedItems,
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
    bg_color?: string;
    items?: string;
    bg?: string;
    bg_direction?: string;
    button_option?: string;
    button_color?: string;
    button_font_color?: string;
    font_color?: string;
    use_title?: boolean;
  }

  try {
    const {
      title,
      post_id,
      bg_color,
      items,
      bg,
      bg_direction,
      button_option,
      button_color,
      button_font_color,
      font_color,
      use_title,
    }: RequestBody = req.body;
    const getIdToken = (req as any).id;

    const validatePost = await prisma.post.findUnique({
      where: { id: post_id },
      select: {
        user_id: true,
      },
    });

    if (!validatePost) {
      return res.status(400).json({ message: "post_id not found" });
    }

    if (validatePost?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot edit another user's post." });
    }

    const updateData: {
      title?: string;
      bg_color?: string;
      items?: string[];
      bg?: string;
      bg_direction?: string;
      button_option?: string;
      button_color?: string;
      button_font_color?: string;
      font_color?: string;
      use_title?: boolean;
    } = {};

    if (title) {
      updateData.title = title;
    }
    if (bg_color) {
      updateData.bg_color = bg_color;
    }
    if (items) {
      updateData.items = items.split(",");
    }
    if (bg) {
      updateData.bg = bg;
    }
    if (bg_direction) {
      updateData.bg_direction = bg_direction;
    }
    if (button_option) {
      updateData.button_option = button_option;
    }
    if (button_color) {
      updateData.button_color = button_color;
    }
    if (button_font_color) {
      updateData.button_font_color = button_font_color;
    }
    if (font_color) {
      updateData.font_color = font_color;
    }
    if (use_title !== undefined) {
      updateData.use_title = use_title;
    }

    const editPost = await prisma.post.update({
      where: { id: post_id },
      data: updateData,
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
        Item: {
          select: {
            post_id: true,
          },
        },
      },
    });

    if (!validatePost) {
      return res.status(400).json({ message: "post_id not found" });
    }

    if (validatePost?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot delete another user's post." });
    }

    if (!validatePost?.Item?.length) {
      const deletePost = await prisma.post.delete({
        where: { id: post_id },
      });
    } else {
      const deleteItems = await prisma.item.deleteMany({
        where: { post_id },
      });
      const deletePost = await prisma.post.delete({
        where: { id: post_id },
      });
    }

    res.status(202).json({
      message: "Success delete Post",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addPost, getPost, editPost, deletePost, getPostSearch };
