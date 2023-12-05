import { Router } from "express";
import { BorrowingController } from "./borrowingController";

export const borrowingRouter = Router();

const controller = new BorrowingController();

borrowingRouter.get("/", controller.getBorrowings);
borrowingRouter.get("/:id", controller.getBorrowing);
borrowingRouter.post("/", controller.createBorrowing);
borrowingRouter.put("/:id", controller.updateBorrowing);
borrowingRouter.delete("/:id", controller.deleteBorrowing);
