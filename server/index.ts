import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { authRouter } from "./src/auth/authRouter";
import { borrowingRouter } from "./src/borrowing/borrowingRouter";
import { catalogRouter } from "./src/catalog/catalogRouter";
import { prisma } from "./src/core/prisma";
import { authMiddleware } from "./src/middleware/authMiddleware";
import { unknownRouteMiddleware } from "./src/middleware/unknownRouteMiddleware";
import { printAll, seed } from "./src/test/dbSeed";

const seedIfDbEmpty = () =>
  prisma.book.findMany().then((books) => {
    if (books.length === 0) seed().then(printAll);
  });
seedIfDbEmpty();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(authMiddleware);

app.use("/auth", authRouter);
app.use("/borrowings", borrowingRouter);
app.use("/books", catalogRouter);

app.use(unknownRouteMiddleware);

app.listen(3000, () => {
  console.log("App started");
});
