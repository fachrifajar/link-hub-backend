import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addSocmed = async (req: Request, res: Response) => {
  interface RequestBody {
    platform: string;
    url: string;
    post_id: string;
  }

  try {
    const { platform, url, post_id }: RequestBody = req.body;
    const getIdToken = (req as any).id;

    const validateSocmed = await prisma.socialMedia.findMany({
      where: { post_id: post_id },
      select: {
        platform: true,
        post: {
          select: {
            user_id: true,
          },
        },
      },
    });

    if (validateSocmed?.length === 5)
      return res.status(400).json({
        message:
          "You have reached the maximum limit of Social Media. Only 5 platform are allowed per Post's.",
      });

    if (validateSocmed?.[0]?.post?.user_id !== getIdToken)
      return res
        .status(400)
        .json({ message: "You cannot add another user's platform." });

    const addSocmed = await prisma.socialMedia.create({
      data: {
        platform,
        url,
        post_id: post_id,
        user_id: getIdToken,
      },
      select: {
        platform: true,
      },
    });

    res.status(201).json({
      message: `Success add new Platform: ${addSocmed?.platform}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addSocmed };
