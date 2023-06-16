// express
import { Response } from "express";
// third party
import { Types } from "mongoose";
// app
import { paginatedResponse } from "../helper";
import { CategoryModel, ProductModel, UserModel } from "../models";

// search users
export const searchUsers = async (
  term: string,
  res: Response,
  limit: number,
  page: number
) => {
  const isMongoId = Types.ObjectId.isValid(term);

  if (isMongoId) {
    const [data, count] = await Promise.all([
      // get users
      UserModel.findById(term),
      // get total users
      UserModel.countDocuments({ deleted: false, _id: term }),
    ]);
    return paginatedResponse({
      res,
      count,
      data: data ? [data] : [],
      page: Number(page),
      limit: Number(limit),
    });
  }

  const regex = new RegExp(term, "i");

  const [data, count] = await Promise.all([
    // get users
    UserModel.find({
      $or: [{ name: regex }, { email: regex }],
      deleted: false,
    })
      .limit(Number(limit))
      .skip(Number(page) * Number(limit)),
    // get total users
    UserModel.countDocuments({
      $or: [{ name: regex }, { email: regex }],
      deleted: false,
    }),
  ]);

  return paginatedResponse({
    res,
    count,
    data,
    page: Number(page),
    limit: Number(limit),
  });
};

// search categories
export const searchCategories = async (
  term: string,
  res: Response,
  limit: number,
  page: number
) => {
  const isMongoId = Types.ObjectId.isValid(term);

  if (isMongoId) {
    const [data, count] = await Promise.all([
      // get categories
      CategoryModel.findById(term).populate("user", ["name", "email", "id"]),
      // get total categories
      CategoryModel.countDocuments({ deleted: false, _id: term }),
    ]);
    return paginatedResponse({
      res,
      count,
      data: data ? [data] : [],
      page: Number(page),
      limit: Number(limit),
    });
  }

  const regex = new RegExp(term, "i");

  const [data, count] = await Promise.all([
    // get categories
    CategoryModel.find({
      name: regex,
      deleted: false,
    })
      .populate("user", ["name", "email", "id"])
      .limit(Number(limit))
      .skip(Number(page) * Number(limit)),
    // get total categories
    CategoryModel.countDocuments({
      name: regex,
      deleted: false,
    }),
  ]);

  return paginatedResponse({
    res,
    count,
    data,
    page: Number(page),
    limit: Number(limit),
  });
};

// search products
export const searchProducts = async (
  term: string,
  res: Response,
  limit: number,
  page: number
) => {
  const isMongoId = Types.ObjectId.isValid(term);

  if (isMongoId) {
    const [data, count] = await Promise.all([
      // get products
      ProductModel.findById(term)
        .populate("user", ["name", "email", "id"])
        .populate("category", ["name", "id"]),
      // get total products
      ProductModel.countDocuments({ deleted: false, _id: term }),
    ]);
    return paginatedResponse({
      res,
      count,
      data: data ? [data] : [],
      page: Number(page),
      limit: Number(limit),
    });
  }

  const regex = new RegExp(term, "i");

  const [data, count] = await Promise.all([
    // get products
    ProductModel.find({
      name: regex,
      deleted: false,
    })
      .populate("user", ["name", "email", "id"])
      .populate("category", ["name", "id"])
      .limit(Number(limit))
      .skip(Number(page) * Number(limit)),
    // get total products
    ProductModel.countDocuments({
      name: regex,
      deleted: false,
    }),
  ]);

  return paginatedResponse({
    res,
    count,
    data,
    page: Number(page),
    limit: Number(limit),
  });
};
