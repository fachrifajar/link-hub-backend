import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const { cloudinary } = require("../middleware/upload");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const editProfile = async (req: Request, res: Response) => {
  interface RequestBody {
    username: string;
    description: string;
    profile_picture: Object;
    post_picture: Object;
  }
  try {
    const {
      username,
      description,
      profile_picture,
      post_picture,
    }: RequestBody = req.body;

    const getIdToken = (req as any).id;

    const user = await prisma.user.findUnique({
      where: { id: getIdToken },
      select: {
        username: true,
        description: true,
        profile_picture: true,
        post_picture: true,
      },
    });
    const existingProfilePicture = user?.profile_picture;
    const existingPostPicture = user?.post_picture;

    const getProfilePicture = (req as any)?.files?.profile_picture;
    const getPostPicture = (req as any)?.files?.post_picture;

    let profilePictureCloudinary;
    let postPictureCloudinary;

    if ((req as any).files) {
      // Delete existing picture if exist
      if (existingPostPicture) {
        await cloudinary.v2.uploader.destroy(
          existingPostPicture,
          { folder: "link-hub" },
          function (error: any, result: any) {
            if (error) {
              throw error;
            }
          }
        );
      }
      if (existingProfilePicture) {
        await cloudinary.v2.uploader.destroy(
          existingProfilePicture,
          { folder: "link-hub" },
          function (error: any, result: any) {
            if (error) {
              throw error;
            }
          }
        );
      }

      // Upload new picture
      if (getProfilePicture) {
        await cloudinary.v2.uploader.upload(
          getProfilePicture.tempFilePath,
          { public_id: uuidv4(), folder: "link-hub" },
          async function (error: any, result: any) {
            if (error) {
              throw error;
            }

            profilePictureCloudinary = result?.public_id;
          }
        );
      }

      if (getPostPicture) {
        await cloudinary.v2.uploader.upload(
          getPostPicture.tempFilePath,
          { public_id: uuidv4(), folder: "link-hub" },
          async function (error: any, result: any) {
            if (error) {
              throw error;
            }
            postPictureCloudinary = result?.public_id;
          }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: getIdToken },
      data: {
        username: username ? username.toLowerCase() : user?.username,
        description: description ? description : user?.description,
        profile_picture: getProfilePicture
          ? profilePictureCloudinary
          : user?.profile_picture,
        post_picture: getPostPicture
          ? postPictureCloudinary
          : user?.post_picture,
      },
    });

    res.status(200).json({
      message: `Success update profile`,
      data: {
        ...req.body,
        profilePictureCloudinary,
        postPictureCloudinary,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePicture = async (req: Request, res: Response) => {
  interface RequestBody {
    profile_picture: boolean;
    post_picture: boolean;
  }
  try {
    const { profile_picture, post_picture } = req.body;
    const getIdToken = (req as any).id;

    const user = await prisma.user.findUnique({
      where: { id: getIdToken },
      select: {
        username: true,
        description: true,
        profile_picture: true,
        post_picture: true,
      },
    });
    const existingProfilePicture = user?.profile_picture;
    const existingPostPicture = user?.post_picture;

    if (!profile_picture && !post_picture)
      return res.status(400).json({ message: "Please pick options to delete" });

    // Delete existing picture if exist
    if (post_picture) {
      await cloudinary.v2.uploader.destroy(
        existingPostPicture,
        { folder: "link-hub" },
        function (error: any, result: any) {
          if (error) {
            throw error;
          }
        }
      );
    }
    if (profile_picture) {
      await cloudinary.v2.uploader.destroy(
        existingProfilePicture,
        { folder: "link-hub" },
        function (error: any, result: any) {
          if (error) {
            throw error;
          }
        }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: getIdToken },
      data: {
        profile_picture: profile_picture ? null : existingProfilePicture,
        post_picture: post_picture ? null : existingPostPicture,
      },
    });

    res.status(202).json({
      message: `Success Delete Picture`,
      data: {
        profile_picture: profile_picture ? "deleted" : null,
        post_picture: post_picture ? "deleted" : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const getIdToken = (req as any).id;

    const user = await prisma.user.findUnique({
      where: { id: getIdToken },
      select: {
        profile_picture: true,
        username: true,
        // posts: {
        //   select: {
        //     id: true,
        //   },
        // },
        // Item: {
        //   select: {
        //     title: true,
        //     url: true,
        //   },
        // },
      },
    });

    // const postCount = user?.posts?.length;

    res.status(200).json({
      message: "Success get user profile",
      data: {
        profile_picture: user?.profile_picture,
        // post_count: postCount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { editProfile, deletePicture, getProfile };
