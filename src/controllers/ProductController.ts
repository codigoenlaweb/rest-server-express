// express
import { Request, Response } from "express";
// third party
import { HydratedDocument } from "mongoose";
// app
import { paginatedResponse } from "../helper";
import { AuthRequest } from "../interfaces/generalsInterface";
import { IProductSchema, ProductModel } from "../models";

class ProductController {
  // Get all products
  public async getAll(req: Request, res: Response) {
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
  }

  // get product by id
  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const category = await ProductModel.findById(id)
      .populate("user", ["name", "email", "avatar", "role"])
      .populate("category", ["name"]);

    res.json({
      data: category,
    });
  }

  // Create product
  public async create(req: AuthRequest, res: Response) {
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
  }

  // Update product
  public async update(req: Request, res: Response) {
    const { name, description, price, available, category_id } = req.body;
    const { id } = req.params;

    const product = await ProductModel.findByIdAndUpdate(
      id,
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
  }

  // Delete product
  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    await ProductModel.findByIdAndUpdate(id, { deleted: true });

    res.json({});
  }
}

export default new ProductController();
