import { Router } from "express";
import { TestController } from "./testController";

export const testRouter = Router();

const controller = new TestController();

testRouter.get("/reset", controller.reset);
testRouter.get("/seed", controller.seed);
testRouter.get("/reset-and-seed", controller.resetAndSeed);
