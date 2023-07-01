// express
import { Request, Response } from "express";
// third party
import bcryptjs from "bcryptjs";
// app
import { errorResponse, paginatedResponse } from "../helper";
import { UserModel } from "../models";

class UserController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Get all Users
  public async getAll(req: Request, res: Response) {
    // query params
    const { limit = 15, page = 0 } = req.query;

    const [data, count] = await Promise.all([
      // get users
      UserModel.find(
        { deleted: false },
        "name email password role deleted google avatar"
      )
        .limit(Number(limit))
        .skip(Number(page) * Number(limit)),
      // get total users
      UserModel.countDocuments({ deleted: false }),
    ]);

    paginatedResponse({
      res,
      count,
      data,
      page: Number(page),
      limit: Number(limit),
    });
  }

  // Create User
  public async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    const user = new UserModel({
      name,
      email,
      password,
      role,
    });

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // save user
    await user.save();

    res.status(201).json({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        delete: user.deleted,
        google: user.google,
        uid: user._id,
      },
    });
  }

  // Update User
  public async update(req: Request, res: Response) {
    const id = req.params.id;
    // const { name, email, password, role, google } = req.body;
    const { _id, password, google, ...data } = req.body;

    // encrypt password
    if (password) {
      const salt = bcryptjs.genSaltSync();
      data.password = bcryptjs.hashSync(password, salt);
    }

    // update user
    let user = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!user) {
      return errorResponse({
        res,
        msg: "The user doesn't exists",
        value: id,
        status: 404,
      });
    }

    res.json({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        delete: user.deleted,
        google: user.google,
        uid: user._id,
      },
    });
  }

  // Delete User
  public async delete(req: Request, res: Response) {
    // params
    const id = req.params.id;

    // delete user
    await UserModel.findByIdAndUpdate(id, { deleted: true });

    res.status(204).json({});
  }
}

export default new UserController();
