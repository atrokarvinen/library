import { Router } from "express";
import { CatalogController } from "./catalogController";

export const catalogRouter = Router();
const controller = new CatalogController();

catalogRouter.get("/", controller.getBooks);
catalogRouter.get("/:id", controller.getBookById);

catalogRouter.post("/", controller.addBook);
catalogRouter.put("/:id", controller.updateBook);
catalogRouter.delete("/:id", controller.deleteBook);
