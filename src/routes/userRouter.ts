// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import { validateFields } from "../middlewares/validateFields";
import {
  emailExistInDb,
  roleValidate,
  userExistInDb,
} from "../middlewares/userMiddlewares";
import {
  userAuthMiddleware,
  adminAuthMiddleware,
} from "../middlewares/authMiddlewares";
// controllers
import {
  deleteUserController,
  getUsersController,
  postUserController,
  putUserController,
} from "../controllers/userController";

// Router
export const userRouter = Router();

// Routes
userRouter.get("/", [userAuthMiddleware, validateFields], getUsersController);

userRouter.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("email", "The email is invalid").isEmail(),
    check("email").custom(emailExistInDb),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be 6 characters").isLength({ min: 6 }),
    check("role").custom(roleValidate),
    validateFields,
  ],
  postUserController
);

userRouter.put(
  "/:id",
  [
    userAuthMiddleware,
    check("id", "The id is invalid").isMongoId(),
    check("id").custom(userExistInDb),
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("email", "The email is invalid").isEmail(),
    check("email").custom(emailExistInDb),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be 6 characters").isLength({ min: 6 }),
    check("role").custom(roleValidate),
    validateFields,
  ],
  putUserController
);

userRouter.delete(
  "/:id",
  [
    adminAuthMiddleware,
    check("id", "The id is invalid").isMongoId(),
    check("id").custom(userExistInDb),
    validateFields,
  ],
  deleteUserController
);
