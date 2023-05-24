// express
import { Router } from "express";
import {
  deleteUserController,
  getUsersController,
  postUserController,
  putUserController,
} from "../controllers/crudsController";
// controller

export const usersRouter = Router();

usersRouter.get("/", getUsersController);

usersRouter.post("/", postUserController);

usersRouter.put("/:id", putUserController);

usersRouter.delete("/", deleteUserController);
