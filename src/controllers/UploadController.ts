// node
import path from "path";
import fs from "fs";
// express
import { Request, Response } from "express";
// third party
// app
import { errorResponse, uploadFIle } from "../helper";
import { ProductModel, UserModel } from "../models";
import { ProductMiddleware, UserMiddleware } from "../middlewares";

class UploadController {
  constructor() {
    this.upload = this.upload.bind(this);
    this.update = this.update.bind(this);
    this.showImage = this.showImage.bind(this);
  }

  // Upload file
  public async upload(req: Request, res: Response) {
    if (!req.files || !req.files.upload_file) {
      return errorResponse({
        res,
        msg: "No files were uploaded.",
        value: "",
      });
    }

    const files = req.files.upload_file;

    try {
      const nameTemp = await uploadFIle({ files, extraPath: "textos" });
      res.status(200).json({
        data: {
          path: nameTemp,
        },
      });
    } catch (error) {
      const err = error as Error;
      errorResponse({
        res,
        msg: err.message,
        value: "",
      });
    }
  }

  // Update file collection
  public async update(req: Request, res: Response) {
    const { collection, id } = req.params;
    let model: any;

    switch (collection) {
      case "products":
        model = await ProductModel.findById(id);
        if (!model) {
          ProductMiddleware.existInDb(req, res, () => {});
        }
        break;
      case "users":
        model = await UserModel.findById(id);
        if (!model) {
          UserMiddleware.existInDb(req, res, () => {});
        }
        break;
      default:
        errorResponse({
          res,
          msg: `The collection ${collection} is not valid`,
          value: collection,
          status: 500,
        });
        break;
    }

    if (!req.files || !req.files.upload_file) {
      return errorResponse({
        res,
        msg: "No files were uploaded.",
        value: "",
      });
    }

    const files = req.files.upload_file;

    try {
      const nameTemp = await uploadFIle({ files, extraPath: collection });

      switch (collection) {
        case "users":
          if (model.avatar) {
            const oldPath: string = path.join(
              __dirname,
              "../../../upload/",
              model.avatar
            );

            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }

          model.avatar = nameTemp;
          await model.save();
          break;

        default:
          if (model.image) {
            const oldPath: string = path.join(
              __dirname,
              "../../../upload/",
              model.image
            );

            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }

          model.image = nameTemp;
          await model.save();
          break;
      }

      res.status(200).json({
        data: model,
      });
    } catch (error) {
      const err = error as Error;
      errorResponse({
        res,
        msg: err.message,
        value: "",
      });
    }
  }

  // Show image
  public async showImage(req: Request, res: Response) {
    const { filePath } = req.query;
    
    const pathImage: string = path.join(
      __dirname,
      "../../../upload/",
      filePath as string
    );

    res.sendFile(pathImage);
  }
}

export default new UploadController();
