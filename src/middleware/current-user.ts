import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { UserPayload } from "../typings/express";

export const currentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Set token from Bearer Token
      token = req.headers.authorization.split(' ')[1]
  }

  if(!token) {
    // throw new BadRequestError("Invalid email");
    return res.status(StatusCodes.UNAUTHORIZED).json({ Message: 'Not Logged In' });
}

  try {
    const payload = jwt.verify(
      // req.session.jwt,
      token,
      process.env.JWT_SECRET!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (error) {}
  next();
};
