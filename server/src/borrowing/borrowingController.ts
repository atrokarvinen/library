import { Borrowing } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BorrowingService } from "./borrowingService";

export class BorrowingController {
  private service = new BorrowingService();

  getBorrowings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      const borrowings = await this.service.getBorrowings(userId);
      res.json(borrowings);
    } catch (error) {
      next(error);
    }
  };

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      const borrowingHistory = await this.service.getHistory(userId);
      res.json(borrowingHistory);
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

      const bookId = Number(req.body.bookId);
      const firstItem = await this.service.getFirstAvailable(bookId);
      if (!firstItem)
        return res.status(400).json({ message: "Book not available" });

      const borrowing: Omit<Borrowing, "id"> = {
        bookItemId: firstItem.id,
        start: req.body.start,
        end: req.body.end,
        userId,
      };
      const createdBorrowing = await this.service.addBorrowing(borrowing);

      console.log("created borrowing:", createdBorrowing);

      res.json(createdBorrowing);
    } catch (error) {
      next(error);
    }
  };

  updateBorrowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const borrowingId = Number(req.params.id);
      const originalBorrowing = await this.service.getBorrowing(borrowingId);
      if (!originalBorrowing)
        return res.status(404).json({ message: "Borrowing not found" });

      if (originalBorrowing.userId !== userId)
        return res
          .status(401)
          .json({ message: "Cannot extend borrowings of other people" });

      const extendPeriod_ms = 7 * 24 * 60 * 60 * 1000;
      const end = new Date(originalBorrowing.end.getTime() + extendPeriod_ms);
      const borrowing = { ...originalBorrowing, end };
      const updatedBorrowing = await this.service.updateBorrowing(borrowing);
      res.json(updatedBorrowing);
    } catch (error) {
      next(error);
    }
  };

  deleteBorrowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      console.log("deleting borrowing:", id);
      const borrowing = await this.service.deleteBorrowing(id);
      console.log(
        `deleted borrowing (${id}) of bookItem (${borrowing.bookItemId})`
      );
      res.json(borrowing);
    } catch (error) {
      next(error);
    }
  };
}
