// express
import { Request, Response } from "express";
// third party
// app
import { paginatedResponse } from "../helper";
import { AuthRequest } from "../interfaces/generalsInterface";
import { CategoryModel, ICategorySchema } from "../models";
import { HydratedDocument } from "mongoose";

// get all category
export const GetAllCategoryController = async (req: Request, res: Response) => {
  const { limit = 15, page = 0 } = req.query;

  const [data, count] = await Promise.all([
    // get users
    CategoryModel.find({ deleted: false })
      .populate("user", ["name", "email", "avatar", "role"])
      .limit(Number(limit))
      .skip(Number(page) * Number(limit)),
    // get total users
    CategoryModel.countDocuments({ deleted: false }),
  ]);

  paginatedResponse({
    res,
    count,
    data,
    page: Number(page),
    limit: Number(limit),
  });
};

// get category by id
export const GetCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  const { category_id } = req.params;

  const category = await CategoryModel.findById(category_id)
    .populate("user", ["name", "email", "avatar", "role"]);

  res.json({
    data: category,
  });
};

// create category
export const CreateCategoryController = async (
  req: AuthRequest,
  res: Response
) => {
  const { name }: { name: string } = req.body;
  const { userAuth } = req;

  const category: HydratedDocument<ICategorySchema> = new CategoryModel({
    name: name.toUpperCase(),
    user: userAuth?._id,
  });

  await category.save();

  res.json({
    data: category,
  });
};

// update category
export const UpdateCategoryController = async (req: Request, res: Response) => {
  const { category_id } = req.params;
  const { name }: { name: string } = req.body;

  const category = await CategoryModel.findByIdAndUpdate(
    category_id,
    { name: name.toUpperCase() },
    { new: true }
  );

  res.json({
    data: category,
  });
};

// delete category
export const DeleteCategoryController = async (req: Request, res: Response) => {
  const { category_id } = req.params;

  await CategoryModel.findByIdAndUpdate(category_id, { deleted: true });

  res.json({});
};
