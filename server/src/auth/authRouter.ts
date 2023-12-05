import { Router } from "express";
import { AuthController } from "./authController";

export const authRouter = Router();
const controller = new AuthController();

authRouter.post("/signin", controller.signIn);
authRouter.post("/signup", controller.signUp);
authRouter.post("/logout", controller.logout);

authRouter.post("/generate", controller.generate);
