import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../models";
import { errorResponse } from "../helper";

export const categoryExistInDb = async (category_id: string) => {
  const _id = category_id;

  try {
    const existCategory = await CategoryModel.find({ _id, deleted: false });

    if (!existCategory[0]) {
      throw new Error(`The category doesn't exists`);
    }
  } catch (error) {
    throw new Error(`The category doesn't exists`);
  }
};

export const categoryExistInDbByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
