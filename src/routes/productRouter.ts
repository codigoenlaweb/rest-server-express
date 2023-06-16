// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import { validateFields } from "../middlewares/validateFields";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/authMiddlewares";
// controllers
import {
  CreateProductController,
  DeleteProductController,
  GetAllProductController,
  GetProductByIdController,
  UpdateProductController
} from "../controllers/productController";
import { categoryExistInDb } from "../middlewares/categoryMiddlewares";
import { prodcutExistInDb } from "../middlewares/productMiddlewares";

// Router
export const productRouter = Router();

// Routes
productRouter.get("/", GetAllProductController);

productRouter.get(
  "/:product_id",
  [
    check("product_id", "The id is invalid").isMongoId(),
    check("product_id").custom(prodcutExistInDb),
    validateFields,
  ],
  GetProductByIdController
);

productRouter.post(
  "/",
  [
    userAuthMiddleware,
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 2 characters").isLength({
      min: 2,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
      max: 140,
    }),
    check("price", "The price is not valid").isNumeric(),
    check("category_id", "The id is invalid").isMongoId(),
    check("category_id").custom(categoryExistInDb),
    validateFields,
  ],
  CreateProductController
);

productRouter.put(
  "/:product_id",
  [
    userAuthMiddleware,
    check("product_id", "The id is invalid").isMongoId(),
    check("product_id").custom(prodcutExistInDb),
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 3 characters").isLength({
      min: 3,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
        max: 140,
    }),
    check("price", "The price is not valid").isNumeric(),
    check("available", "The available is not valid").isBoolean(),
    check("category_id", "The id is invalid").isMongoId(),
    check("category_id").custom(categoryExistInDb),
    validateFields,
  ],
  UpdateProductController
);

productRouter.delete(
  "/:product_id",
  [
    userAuthMiddleware,
    adminAuthMiddleware,
    check("product_id", "The id is invalid").isMongoId(),
    check("product_id").custom(prodcutExistInDb),
    validateFields,
  ],
  DeleteProductController
);
