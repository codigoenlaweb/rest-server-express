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

  // check if email exist in db (blocker)
  public async emailExistInDb(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id;
    const email = req.body.email;
    const exitsEmail = await UserModel.findOne({ email });

    if (exitsEmail && exitsEmail._id.toString() !== _id) {
      return errorResponse({
        res,
        msg: `The email already exists`,
        value: email,
        status: 400,
      });
    }

    next();
  }
}

export default new UserMiddleware();