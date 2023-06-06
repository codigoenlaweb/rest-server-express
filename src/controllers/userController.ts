// express
import { Request, Response } from "express";
// third party
import bcryptjs from "bcryptjs";
// app
import { paginatedResponse } from "../helper";
import { UserModel } from "../models";

// Get all Users
export const getUsersController = async (req: Request, res: Response) => {
  // query params
  
  const { limit = 15, page = 0 } = req.query;
  
  const [data, count] = await Promise.all([
    // get users
    UserModel.find({ deleted: false })
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
};

// Create User
export const postUserController = async (req: Request, res: Response) => {
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

  res.json({
    data: user,
  });
};

// Update User
export const putUserController = async (req: Request, res: Response) => {
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

  res.json({
    data: user,
  });
};

// Delete User
export const deleteUserController = async (req: Request, res: Response) => {
  // params
  const id = req.params.id;

  // delete user
  await UserModel.findByIdAndUpdate(id, { deleted: true });

  res.json({
    msg: "delete User",
  });
};
