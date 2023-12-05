import { NextFunction, Request, Response } from "express";
import { BorrowingService } from "./borrowingService";

export class BorrowingController {
  private service = new BorrowingService();

  getBorrowings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowings = await this.service.getBorrowings();
      res.json(borrowings);
    } catch (error) {
      next(error);
    }
  };

  getBorrowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const borrowing = await this.service.getBorrowing(id);
      res.json(borrowing);
    } catch (error) {
      next(error);
    }
  };

  createBorrowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("creating borrowing:", req.body);

      const userId = req.userId;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const borrowing = { ...req.body, userId };
      const createdBorrowing = await this.service.addBorrowing(borrowing);

      console.log("created borrowing:", createdBorrowing);

      res.json(createdBorrowing);
    } catch (error) {
      next(error);
    }
  };

  updateBorrowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const borrowing = await this.service.updateBorrowing(id, req.body);
      res.json(borrowing);
    } catch (error) {
      next(error);
    }
  };

  deleteBorrowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const borrowing = await this.service.deleteBorrowing(id);
      res.json(borrowing);
    } catch (error) {
      next(error);
    }
  };
}
