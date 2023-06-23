import { NextFunction, Request, Response } from "express";
import { RoleModel, UserModel } from "../models";
import { errorResponse } from "../helper";

class UserMiddleware {
  constructor() {
    this.existInDb = this.existInDb.bind(this);
    this.roleValidate = this.roleValidate.bind(this);
    this.emailExistInDb = this.emailExistInDb.bind(this);
  }
  
  // check if user exist in db (blocker)
  public async existInDb(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id;

    try {
      const existCategory = await UserModel.find({ _id, deleted: false });

      if (!existCategory[0]) {
        return errorResponse({
          res,
          msg: "The user doesn't exists",
          value: _id,
          status: 404,
        });
      }
    } catch (error) {
      return errorResponse({
        res,
        msg: "The user doesn't exists",
        value: _id,
        status: 404,
      });
    }

    next();
  }

  // check if role exist in db (no blocker)
  public async roleValidate(role: string) {
    const roleExistInDb = await RoleModel.exists({ role });
    if (!roleExistInDb) {
      throw new Error(`The role is invalid`);
    }
  }

  // check if email exist in db (no blocker)
  public async emailExistInDb(email: string) {
    const exitsEmail = await UserModel.findOne({ email });
    if (exitsEmail) {
      throw new Error(`The email already exists`);
    }
  }
}

export default new UserMiddleware();