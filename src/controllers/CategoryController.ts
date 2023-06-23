// express
import { Request, Response } from "express";
// third party
// app
import { paginatedResponse } from "../helper";
import { AuthRequest } from "../interfaces/generalsInterface";
import { CategoryModel, ICategorySchema } from "../models";
import { HydratedDocument } from "mongoose";

class CategoryController {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }
  
  // get all category
  public async getAll(req: Request, res: Response) {
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
  }

  // get category by id
  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const category = await CategoryModel.findById(id).populate("user", [
      "name",
      "email",
      "avatar",
      "role",
    ]);

    res.json({
      data: category,
    });
  }

  // create category
  public async create(req: AuthRequest, res: Response) {
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
  }

  // update category
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name }: { name: string } = req.body;

    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name: name.toUpperCase() },
      { new: true }
    );

    res.json({
      data: category,
    });
  }

  // delete category
  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    await CategoryModel.findByIdAndUpdate(id, { deleted: true });

    res.json({});
  }
}

export default new CategoryController();
