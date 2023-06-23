// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import {
  AuthMiddleware,
  CategoryMiddleware,
  validateFields,
} from "../middlewares";
// controllers
import { CategoryController } from "../controllers";

// Router
export const categoryRouter = Router();

// Routes
categoryRouter.get("/", CategoryController.getAll);

categoryRouter.get(
  "/:id",
  [CategoryMiddleware.existInDb, validateFields],
  CategoryController.getById
);

categoryRouter.post(
  "/",
  [
    AuthMiddleware.userAuth,
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 3 characters").isLength({
      min: 3,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
      max: 140,
    }),
    validateFields,
    CategoryMiddleware.existInDbByName,
  ],
  CategoryController.create
);

categoryRouter.put(
  "/:id",
  [
    AuthMiddleware.userAuth,
    CategoryMiddleware.existInDb,
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 3 characters").isLength({
      min: 3,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
      max: 140,
    }),
    validateFields,
    CategoryMiddleware.existInDbByName,
  ],
  CategoryController.update
);

categoryRouter.delete(
  "/:id",
  [
    AuthMiddleware.userAuth,
    AuthMiddleware.adminAuth,
    CategoryMiddleware.existInDb,
    validateFields,
  ],
  CategoryController.delete
);
