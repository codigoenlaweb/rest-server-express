// express
import { Request, Response } from "express";
// third party
// app
import { paginatedResponse } from "../helper";
import { AuthRequest } from "../interfaces/generalsInterface";
import { HydratedDocument, Types } from "mongoose";
import { IProductSchema, ProductModel } from "../models";

// get all product
export const GetAllProductController = async (req: Request, res: Response) => {
  const { limit = 15, page = 0 } = req.query;

  const [data, count] = await Promise.all([
    // get users
    ProductModel.find({ deleted: false })
      .populate("user", ["name", "email", "avatar", "role"])
      .populate("category", ["name"])
      .limit(Number(limit))
      .skip(Number(page) * Number(limit)),
    // get total users
    ProductModel.countDocuments({ deleted: false }),
  ]);

  paginatedResponse({
    res,
    count,
    data,
    page: Number(page),
    limit: Number(limit),
  });
};

// get product by id
export const GetProductByIdController = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  const category = await ProductModel.findById(product_id)
    .populate("user", ["name", "email", "avatar", "role"])
    .populate("category", ["name"]);

  res.json({
    data: category,
  });
};

// create product
export const CreateProductController = async (
  req: AuthRequest,
  res: Response
) => {
  const { name, description, price, available, category_id } = req.body;
  const { userAuth } = req;

  const product: HydratedDocument<IProductSchema> = new ProductModel({
    category: category_id,
    user: userAuth?._id,
    name,
    description,
    price,
    available,
  });

  await product.save();

  res.json({
    data: product,
  });
};

// update product
export const UpdateProductController = async (
  req: AuthRequest,
  res: Response
) => {
  const { name, description, price, available, category_id } = req.body;
  const { userAuth } = req;
  const { product_id } = req.params;

  const product = await ProductModel.findByIdAndUpdate(
    product_id,
    {
      category: category_id,
      name,
      description,
      price,
      available,
    },
    { new: true }
  );

  res.json({
    data: product,
  });
};

// delete product
export const DeleteProductController = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  await ProductModel.findByIdAndUpdate(product_id, { deleted: true });

  res.json({});
};
