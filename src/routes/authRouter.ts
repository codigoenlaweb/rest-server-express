// express
import { Router } from "express";
// third party
import { check } from "express-validator";
// middlewares
import { validateFields } from "../middlewares/validateFields";
// controllers
import { googleController, loginController } from "../controllers/authController";

// Router
export const authRouter = Router();

// Routes
authRouter.post("/login", [
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is invalid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "The password must be 6 characters").isLength({ min: 6 }),
    validateFields,
], loginController);

authRouter.post("/google", [
    check("id_token", "id_token is required").not().isEmpty(),
    validateFields,
], googleController);



