import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../models";
import { errorResponse } from "../helper";

class CategoryMiddlwares {
  constructor() {
    this.existInDb = this.existInDb.bind(this);
    this.existInDbByName = this.existInDbByName.bind(this);
    this.categoryExistInDb = this.categoryExistInDb.bind(this);
  }

  // check if category exist in db (blocker)
  public async existInDb(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id;

    try {
      const existCategory = await CategoryModel.find({ _id, deleted: false });

      if (!existCategory[0]) {
        return errorResponse({
          res,
          msg: "The category doesn't exists",
          value: _id,
          status: 404,
        });
      }
    } catch (error) {
      return errorResponse({
        res,
        msg: "The category doesn't exists",
        value: _id,
        status: 404,
      });
    }

    next();
  }

  // check if category exist in db (no blocker)
  public async categoryExistInDb(category_id: string) {
    const _id = category_id;

    try {
      const existCategory = await CategoryModel.find({ _id, deleted: false });

      if (!existCategory[0]) {
        throw new Error(`The category doesn't exists`);
      }
    } catch (error) {
      throw new Error(`The category doesn't exists`);
    }
  }

  // check if category exist in db by name (blocker)
  public async existInDbByName(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const name = req.body.name.toUpperCase();
    const uid = req.params.id;

    let existCategory = await CategoryModel.find({
      name: name.toUpperCase(),
    });

    if (uid) {
      existCategory = existCategory.filter((category) => category.id != uid);
    }

    if (existCategory[0]) {
      return errorResponse({
        res,
        msg: "The category already exists",
        value: name,
      });
    }

    next();
  }
}

export default new CategoryMiddlwares();
