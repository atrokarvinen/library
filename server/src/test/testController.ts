import { NextFunction, Request, Response } from "express";
import { clearData, seed } from "./dbSeed";

export class TestController {
  reset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await clearData();
      res.end();
    } catch (error) {
      next(error);
    }
  };

  seed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await seed();
      res.end();
    } catch (error) {
      next(error);
    }
  };

  resetAndSeed = async (req: Request, res: Response, next: NextFunction) => {
    await this.reset(req, res, next);
    await this.seed(req, res, next);
  };
}
