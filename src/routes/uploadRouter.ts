// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import {
  AuthMiddleware,
  UploadMiddleware,
  validateFields,
} from "../middlewares";
// controllers
import { UploadController } from "../controllers";

// Router
export const uploadRouter = Router();

// Routes
uploadRouter.post(
  "/",
  [validateFields, AuthMiddleware.userAuth],
  UploadController.upload
);

uploadRouter.put(
  "/:collection/:id",
  [
    AuthMiddleware.userAuth,
    check("id", "The id is not valid").isMongoId(),
    check("collection").custom(UploadMiddleware.collectionExist),
    validateFields,
  ],
  UploadController.update
);

uploadRouter.get(
  "/",
  [UploadMiddleware.pathExist, validateFields],
  UploadController.showImage
);
