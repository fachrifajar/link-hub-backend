import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { error, profile } from "console";
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

    if (!getIdToken) throw error;
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
    console.log("first");
    const getProfilePicture = (req as any)?.files?.profile_picture;
    const getPostPicture = (req as any)?.files?.post_picture;
    console.log(getProfilePicture);
    console.log(getPostPicture);

    console.log("second");
    let profilePictureCloudinary;
    let postPictureCloudinary;

    if ((req as any).files) {
      console.log("masuk");
      // getProfilePicture = (req as any)?.files?.profile_picture;
      // getPostPicture = (req as any)?.files?.post_picture;
      if (getProfilePicture || getPostPicture) {
        if (existingProfilePicture) {
          // Delete existing picture if exist
          await cloudinary.v2.uploader.destroy(
            existingProfilePicture,
            { folder: "link-hub" },
            function (error: any, result: any) {
              console.log(result, error);
            }
          );
        }
        if (existingPostPicture) {
          // Delete existing picture if exist
          await cloudinary.v2.uploader.destroy(
            existingPostPicture,
            { folder: "link-hub" },
            function (error: any, result: any) {
              console.log(result, error);
            }
          );
        }

        if (getProfilePicture) {
          // Upload new picture
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
          // Upload new picture
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
    }

    console.log("bawah");
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
    console.log("updatedUser");

    res.status(200).json({
      message: `Success update profile`,
      data: {
        ...req.body,
        profilePictureCloudinary,
        postPictureCloudinary,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { editProfile };
