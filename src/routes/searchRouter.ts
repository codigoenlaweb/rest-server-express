// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
// controllers
import { SearchController } from "../controllers";

// Router
export const searchRouter = Router();

// Routes
searchRouter.get("/:collection/:term", SearchController.Search);