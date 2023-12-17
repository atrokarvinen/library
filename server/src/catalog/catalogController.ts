import { NextFunction, Request, Response } from "express";
import { CatalogService } from "./catalogService";

export class CatalogController {
  catalogService = new CatalogService();

  getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("getBooks");
      const books = await this.catalogService.getBooks();
      res.json(books);
    } catch (error) {
      next(error);
    }
  };

  getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("getBookById:", req.params.id);
      const book = await this.catalogService.getBookById(+req.params.id);
      return res.json(book);
    } catch (error) {
      next(error);
    }
  };

  getBookItemsByBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookItems = await this.catalogService.getBookItemsByBook(
        +req.params.id
      );
      return res.json(bookItems);
    } catch (error) {
      next(error);
    }
  };

  addBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("addBook:", req.body);
      const addedBook = await this.catalogService.addBook(req.body);
      return res.json(addedBook);
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("updateBook:", req.params.id, req.body);
      const updatedBook = await this.catalogService.updateBook(
        +req.params.id,
        req.body
      );
      return res.json(updatedBook);
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("deleteBook:", req.params.id);
      await this.catalogService.deleteBook(+req.params.id);
      return res.json(200);
    } catch (error) {
      next(error);
    }
  };
}
