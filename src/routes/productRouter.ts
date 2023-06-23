// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import {
  AuthMiddleware,
  CategoryMiddleware,
  ProductMiddleware,
  validateFields,
} from "../middlewares";
// controllers
import { ProductController } from "../controllers";

// Router
export const productRouter = Router();

// Routes
productRouter.get("/", ProductController.getAll);

productRouter.get(
  "/:id",
  [ProductMiddleware.existInDb, validateFields],
  ProductController.getById
);

productRouter.post(
  "/",
  [
    AuthMiddleware.userAuth,
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 2 characters").isLength({
      min: 2,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
      max: 140,
    }),
    check("price", "The price is not valid").isNumeric(),
    check("category_id").custom(CategoryMiddleware.categoryExistInDb),
    validateFields,
  ],
  ProductController.create
);

productRouter.put(
  "/:id",
  [
    AuthMiddleware.userAuth,
    ProductMiddleware.existInDb,
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 3 characters").isLength({
      min: 3,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
      max: 140,
    }),
    check("price", "The price is not valid").isNumeric(),
    check("available", "The available is not valid").isBoolean(),
    check("category_id").custom(CategoryMiddleware.categoryExistInDb),
    validateFields,
  ],
  ProductController.update
);

productRouter.delete(
  "/:id",
  [
    AuthMiddleware.userAuth,
    AuthMiddleware.adminAuth,
    ProductMiddleware.existInDb,
    validateFields,
  ],
  ProductController.delete
);
