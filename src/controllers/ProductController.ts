// express
import { Request, Response } from "express";
// third party
import { HydratedDocument } from "mongoose";
// app
import { paginatedResponse } from "../helper";
import { AuthRequest } from "../interfaces/generalsInterface";
import { CategoryModel, IProductSchema, ProductModel } from "../models";

class ProductController {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

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

    const product = await ProductModel.findById(id)
      .populate("user", ["name", "email", "avatar", "role"])
      .populate("category", ["name"]);

    res.json({
      data: product,
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

    // add product to category
    await CategoryModel.findByIdAndUpdate(category_id, {
      $push: { products: product._id },
    });

    res.status(201).json({
      data: product,
    });
  }

  // Update product
  public async update(req: Request, res: Response) {
    const { name, description, price, available, category_id } = req.body;
    const { id } = req.params;

    const [product, oldProduct] = await Promise.all([
      ProductModel.findByIdAndUpdate(
        id,
        {
          category: category_id,
          name,
          description,
          price,
          available,
        },
        { new: true }
      ),
      ProductModel.findById(id),
    ]);

    if (oldProduct?.category !== product?.category) {
      // deleted oldProduct to category and add product to category
      await Promise.all([
        CategoryModel.findByIdAndUpdate(product?.category, {
          $push: { products: product?._id },
        }),
        CategoryModel.findByIdAndUpdate(oldProduct?.category, {
          $pull: { products: oldProduct?._id },
        }),
      ]);
    }

    res.json({
      data: product,
    });
  }

  // Delete product
  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    await Promise.all([
      await ProductModel.findByIdAndUpdate(id, { deleted: true }),
    ]);

    res.status(204).json({});
  }
}

export default new ProductController();
