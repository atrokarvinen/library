import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  const userIdCookie = cookies["userId"];
  if (!userIdCookie) {
    console.log("No userId cookie found");
    return next();
  }
  const userId = Number(userIdCookie);
  if (isNaN(userId)) {
    console.log("Invalid userId cookie found");
    return next();
  }

  console.log("Found userId cookie:", userId);

  req.userId = userId;
  next();
};
