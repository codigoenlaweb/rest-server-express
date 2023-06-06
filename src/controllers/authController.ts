// express
import { Request, Response } from "express";
import { UserModel } from "../models";
// third party
import bcryptjs from "bcryptjs";
// app
import { errorResponse, generateJWT } from "../helper";

// Login
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // verify if the email exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse({
        res,
        value: email,
        msg: "The email or password are incorrect",
      });
    }

    // verify if the user is active
    if (!user.deleted) {
      return errorResponse({
        res,
        value: email,
        msg: "Your account is not active, please contact with support",
      });
    }

    // verify the password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return errorResponse({
        res,
        value: password,
        msg: "The email or password are incorrect",
      });
    }

    // generate the JWT
    const token = await generateJWT(user.id);

    res.json({
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error in the server, this error is from authController.ts file and loginController function. Please contact with the administrator.",
    });
  }
};
