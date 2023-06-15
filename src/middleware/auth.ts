require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const { Validator } = require("node-input-validator");
const jwt = require("jsonwebtoken");
const ACC_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const rules = new Validator(req.body, {
    email: "required|email",
    pwd: "required",
  });

  rules.check().then((matched: any) => {
    if (matched) {
      next();
    } else {
      res.status(422).json({
        message: rules.errors,
      });
    }
  });
};

const registerValidator = (req: Request, res: Response, next: NextFunction) => {
  const rules = new Validator(req.body, {
    email: "required|email",
    // pwd: "required",
    username: "required",
  });

  rules.check().then((matched: any) => {
    if (matched) {
      next();
    } else {
      res.status(422).json({
        message: rules.errors,
      });
    }
  });
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  interface CustomRequest extends Request {
    id?: string;
  }
  if (
    !req?.headers?.authorization?.replace("Bearer ", "") &&
    req?.query?.token &&
    req?.cookies?.token
  ) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  const token =
    req?.headers?.authorization?.replace("Bearer ", "") ||
    req?.query?.token ||
    req?.cookies?.token;

  try {
    jwt.verify(token, ACC_TOKEN_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: "Token Expired" });
      (req as any).id = decoded.id;
      (req as any).name = decoded.name;

      next();
    });

    // const decoded = await new Promise((resolve, reject) => {
    //   jwt.verify(token, ACC_TOKEN_SECRET, (err: any, decoded: any) => {
    //     if (err) reject(err);
    //     resolve(decoded);
    //   });
    // }) as { id: string; name: string };

    // (req as any).id = decoded.id;
    // (req as any).name = decoded.name;

    // next();

    // const decoded = jwt.verify(token, ACC_TOKEN_SECRET) as {
    //   id: string;
    //   name: string;
    // };
    // (req as any).id = decoded.id;
    // (req as any).name = decoded.name;

    // next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { loginValidator, registerValidator, validateToken };
