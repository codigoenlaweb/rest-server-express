// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import { categoryExistInDb, categoryExistInDbByName } from "../middlewares/categoryMiddlewares";
import { validateFields } from "../middlewares/validateFields";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddlewares";
// controllers
import {
  CreateCategoryController,
  DeleteCategoryController,
  GetAllCategoryController,
  GetCategoryByIdController,
  UpdateCategoryController,
} from "../controllers/categoryController";

// Router
export const categoryRouter = Router();

// Routes
categoryRouter.get("/", GetAllCategoryController);

categoryRouter.get(
  "/:category_id",
  [
    check("category_id", "The id is invalid").isMongoId(),
    check("category_id").custom(categoryExistInDb),
    validateFields,
  ],
  GetCategoryByIdController
);

categoryRouter.post(
  "/",
  [
    userAuthMiddleware,
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 3 characters").isLength({
      min: 3,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
      max: 140,
    }),
    categoryExistInDbByName,
    validateFields,
  ],
  CreateCategoryController
);

categoryRouter.put(
  "/:category_id",
  [
    userAuthMiddleware,
    check("category_id", "The id is invalid").isMongoId(),
    check("category_id").custom(categoryExistInDb),
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 3 characters").isLength({
      min: 3,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
        max: 140,
    }),
    categoryExistInDbByName,
    validateFields,
  ],
  UpdateCategoryController
);

categoryRouter.delete(
  "/:category_id",
  [
    userAuthMiddleware,
    adminAuthMiddleware,
    check("category_id", "The id is invalid").isMongoId(),
    check("category_id").custom(categoryExistInDb),
    validateFields,
  ],
  DeleteCategoryController
);
