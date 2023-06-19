// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import {
  AuthMiddlewares,
  UserMiddlewares,
  validateFields,
} from "../middlewares";
// controllers
import { UserController } from "../controllers";

// Router
export const userRouter = Router();

// Routes
userRouter.get(
  "/",
  [AuthMiddlewares.userAuth, validateFields],
  UserController.getAll
);

userRouter.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("email", "The email is invalid").isEmail(),
    check("email").custom(UserMiddlewares.emailExistInDb),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be 6 characters").isLength({ min: 6 }),
    check("role").custom(UserMiddlewares.roleValidate),
    validateFields,
  ],
  UserController.create
);

userRouter.put(
  "/:id",
  [
    AuthMiddlewares.userAuth,
    UserMiddlewares.existInDb,
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("email", "The email is invalid").isEmail(),
    check("email").custom(UserMiddlewares.emailExistInDb),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be 6 characters").isLength({ min: 6 }),
    check("role").custom(UserMiddlewares.roleValidate),
    validateFields,
  ],
  UserController.update
);

userRouter.delete(
  "/:id",
  [
    AuthMiddlewares.userAuth,
    AuthMiddlewares.adminAuth,
    UserMiddlewares.existInDb,
    validateFields,
  ],
  UserController.delete
);
