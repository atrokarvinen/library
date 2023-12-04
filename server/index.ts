import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { catalogRouter } from "./src/catalog/catalogRouter";
import { prisma } from "./src/core/prisma";
import { unknownRouteMiddleware } from "./src/middleware/unknownRouteMiddleware";
import { printAll, seed } from "./src/test/dbSeed";

const getBooks = () =>
  prisma.book.findMany().then((books) => {
    if (books.length === 0) seed().then(printAll);
  });
getBooks();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/books", catalogRouter);

app.use(unknownRouteMiddleware);

app.listen(3000, () => {
  console.log("App started");
});
