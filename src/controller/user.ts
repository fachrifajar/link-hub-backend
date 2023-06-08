import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const editProfile = async (req: Request, res: Response) => {
  interface RequestBody {
    username: string;
    description: string;
  }
  try {
    const { username, description, profile_picture, post_picture } = req.body;

    console.log((req as any).id);
    return
  } catch (error) {}
};

module.exports = { editProfile };
