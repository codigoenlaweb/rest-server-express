import e, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models";
import { errorResponse } from "../helper";

class ProductMiddlewares {
  // check if product exist in db (blocker)
  public async existInDb(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id;

    try {
      const existCategory = await ProductModel.find({ _id, deleted: false });

      if (!existCategory[0]) {
        return errorResponse({
          res,
          msg: "The product doesn't exists",
          value: _id,
          status: 404,
        });
      }
    } catch (error) {
      return errorResponse({
        res,
        msg: "The product doesn't exists",
        value: _id,
        status: 404,
      });
    }

    next();
  }
}
export default new ProductMiddlewares();
