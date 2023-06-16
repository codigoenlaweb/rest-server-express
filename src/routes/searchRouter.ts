// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import { validateFields } from "../middlewares/validateFields";
// controllers
import { SearchController } from "../controllers/searchController";

// Router
export const searchRouter = Router();

// Routes
searchRouter.get("/:collection/:term", SearchController);