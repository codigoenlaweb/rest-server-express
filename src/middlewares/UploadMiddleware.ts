// node
import path from "path";
import fs from "fs";
import { errorResponse } from "../helper";
import { NextFunction, Request, Response } from "express";

class UploadMiddleware {
  constructor() {
    this.collectionExist = this.collectionExist.bind(this);
    this.pathExist = this.pathExist.bind(this);
  }
  
  // check if collection exist (no blocker)
  public async collectionExist(collection: string) {
    const collections = ["users", "products"];

    if (!collections.includes(collection)) {
      throw new Error(`The collection ${collection} is not valid`);
    }
  }

  public async pathExist(req: Request, res: Response, next: NextFunction) {
    const { filePath } = req.query;
    const completePath: string = path.join(
      __dirname,
      "../../../upload/",
      filePath as string
    );

    if (!fs.existsSync(completePath)) {
      return errorResponse({
        res,
        msg: "The user doesn't exists",
        value: filePath as string,
        status: 404,
        location: "path",
      });
    }

    next();
  }
}

export default new UploadMiddleware();
