// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import {
  AuthMiddlewares,
  CategoryMiddlewares,
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
  [CategoryMiddlewares.existInDb, validateFields],
  CategoryController.getById
);

categoryRouter.post(
  "/",
  [
    AuthMiddlewares.userAuth,
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 3 characters").isLength({
      min: 3,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
      max: 140,
    }),
    validateFields,
    CategoryMiddlewares.existInDbByName,
  ],
  CategoryController.create
);

categoryRouter.put(
  "/:id",
  [
    AuthMiddlewares.userAuth,
    CategoryMiddlewares.existInDb,
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must have at least 3 characters").isLength({
      min: 3,
    }),
    check("name", "The name must not have more than 140 characters.").isLength({
      max: 140,
    }),
    validateFields,
    CategoryMiddlewares.existInDbByName,
  ],
  CategoryController.update
);

categoryRouter.delete(
  "/:id",
  [
    AuthMiddlewares.userAuth,
    AuthMiddlewares.adminAuth,
    CategoryMiddlewares.existInDb,
    validateFields,
  ],
  CategoryController.delete
);
