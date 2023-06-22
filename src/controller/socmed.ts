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

    // const validateSocmed = await prisma.socialMedia.findMany({
    //   where: { post_id: post_id },
    //   select: {
    //     platform: true,
    //     post: {
    //       select: {
    //         user_id: true,
    //       },
    //     },
    //   },
    // });

    // if (validateSocmed?.length === 5)
    //   return res.status(400).json({
    //     message:
    //       "You have reached the maximum limit of Social Media. Only 5 platform are allowed per Post's.",
    //   });

    // if (validateSocmed?.[0]?.post?.user_id !== getIdToken)
    //   return res
    //     .status(400)
    //     .json({ message: "You cannot add another user's platform." });

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

const editSocmed = async (req: Request, res: Response) => {
  interface RequestBody {
    platform: string;
    url: string;
    socmed_id: string;
  }
  try {
    const { platform, url, socmed_id }: RequestBody = req.body;
    const getIdToken = (req as any).id;

    const validateSocmed = await prisma.socialMedia.findUnique({
      where: { id: socmed_id },
      select: {
        user_id: true,
      },
    });

    if (validateSocmed?.user_id !== getIdToken) {
      return res
        .status(400)
        .json({ message: "You cannot edit another user's post." });
    }

    const editSocmed = await prisma.socialMedia.update({
      where: { id: socmed_id },
      data: {
        platform,
        url,
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

const deleteSocmed = async (req: Request, res: Response) => {
  const { socmed_id } = req.params;
  const getIdToken = (req as any).id;

  const validateSocmed = await prisma.socialMedia.findUnique({
    where: { id: socmed_id },
    select: {
      user_id: true,
    },
  });

  if (!validateSocmed) {
    return res.status(400).json({ message: "socmed_id not found" });
  }

  if (validateSocmed?.user_id !== getIdToken) {
    return res
      .status(400)
      .json({ message: "You cannot delete another user's social media." });
  }

  const deleteSocmed = await prisma.socialMedia.delete({
    where: { id: socmed_id },
  });

  res.status(202).json({
    message: "Success delete social media",
  });
};

module.exports = { addSocmed, editSocmed, deleteSocmed };
