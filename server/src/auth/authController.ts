import { NextFunction, Request, Response } from "express";
import { AuthService } from "./authService";

export class AuthController {
  private authService = new AuthService();

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await this.authService.signIn(username, password);
      res.cookie("userId", user.id).json(user);
    } catch (error) {
      next(error);
    }
  };

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, confirmPassword } = req.body;
      const validationError = await this.authService.validateSignUp(req.body);
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }
      const user = await this.authService.signUp(username, password);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(403).json({ message: "Unauthenticated" });
      }
      const user = await this.authService.logout(userId);
      res.clearCookie("userId").json(user);
    } catch (error) {
      next(error);
    }
  };

  generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.generate();
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
}
