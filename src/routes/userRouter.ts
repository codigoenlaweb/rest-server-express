// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import {
  AuthMiddleware,
  UserMiddleware,
  validateFields,
} from "../middlewares";
// controllers
import { UserController } from "../controllers";

// Router
export const userRouter = Router();

// Routes
userRouter.get(
  "/",
  [AuthMiddleware.userAuth, validateFields],
  UserController.getAll
);

userRouter.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("email", "The email is invalid").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be 6 characters").isLength({ min: 6 }),
    check("role").custom(UserMiddleware.roleValidate),
    validateFields,
    UserMiddleware.emailExistInDb,
  ],
  UserController.create
);

userRouter.put(
  "/:id",
  [
    AuthMiddleware.userAuth,
    UserMiddleware.existInDb,
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("email", "The email is invalid").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be 6 characters").isLength({ min: 6 }),
    check("role").custom(UserMiddleware.roleValidate),
    validateFields,
    UserMiddleware.emailExistInDb,
  ],
  UserController.update
);

userRouter.delete(
  "/:id",
  [
    AuthMiddleware.userAuth,
    AuthMiddleware.adminAuth,
    UserMiddleware.existInDb,
    validateFields,
  ],
  UserController.delete
);
