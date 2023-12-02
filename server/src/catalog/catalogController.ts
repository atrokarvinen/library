import { NextFunction, Request, Response } from "express";
import { Book } from "./models/book";

const books: Book[] = [
  { id: "1", title: "Book 1" },
  { id: "2", title: "Book 2" },
];
let maxId = 2;

export class CatalogController {
  getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("getBooks");
      res.json(books);
    } catch (error) {
      next(error);
    }
  };

  getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("getBookById:", req.params.id);
      return res.json(books.find((book) => book.id === req.params.id));
    } catch (error) {
      next(error);
    }
  };

  addBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("addBook:", req.body);

      maxId++;
      const addedBook = { ...req.body, id: maxId.toString() };
      books.push(addedBook);
      return res.json(addedBook);
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("updateBook:", req.params.id, req.body);
      const index = books.findIndex((book) => book.id === req.params.id);
      if (index === -1) {
        return res.sendStatus(404);
      }
      const updatedBook = { ...req.body, id: req.params.id };
      books[index] = updatedBook;
      return res.json(updatedBook);
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("deleteBook:", req.params.id);
      const index = books.findIndex((book) => book.id === req.params.id);
      if (index === -1) {
        return res.sendStatus(404);
      }
      books.splice(index, 1);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
