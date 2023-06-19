import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../helper";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../interfaces/generalsInterface";

class AuthMiddleware {
  // check if user exist in db (blocker)
  public async userAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.header("x-token");

    if (!token) {
      return errorResponse({
        res,
        msg: "There is no token in the request",
        value: "",
        status: 401,
        location: "header",
        path: "x-token",
      });
    }

    try {
      // verify token
      const { uid } = jwt.verify(token, process.env.SECRET_JWT || "") as {
        uid: string;
      };

      //  get user authenticated
      const userAuth = await UserModel.findById(uid);

      // validate if user is deleted
      if (!userAuth || userAuth.deleted) {
        return errorResponse({
          res,
          msg: "The user does not exist",
          value: "",
          status: 401,
          location: "header",
          path: "x-token",
        });
      }

      req.userAuth = await UserModel.findById(uid);

      next();
    } catch (error) {
      return errorResponse({
        res,
        msg: "The token is invalid",
        value: token || "",
        status: 401,
        location: "header",
        path: "x-token",
      });
    }
  }

  // check if user is admin (blocker)
  public async adminAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    const userAuth = req.userAuth;

    if (!userAuth || userAuth.role !== "ADMIN_ROLE") {
      return errorResponse({
        res,
        msg: "The user is not an administrator",
        value: "",
        status: 401,
        location: "header",
        path: "x-token",
      });
    }

    next();
  }

  // check if user is admin or same user (blocker)
  public async thereIsRole(...roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      const userAuth = req.userAuth;

      if (!userAuth) {
        return errorResponse({
          res,
          msg: "The user does not exist",
          value: "",
          status: 401,
          location: "header",
          path: "x-token",
        });
      }

      if (!roles.includes(userAuth.role)) {
        return errorResponse({
          res,
          msg: "The user does not have the necessary permissions",
          value: "",
          status: 401,
          location: "header",
          path: "x-token",
        });
      }

      next();
    };
  }
}

export default new AuthMiddleware();