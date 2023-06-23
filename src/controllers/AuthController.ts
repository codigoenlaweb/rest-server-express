// express
import { Request, Response } from "express";
import { UserModel } from "../models";
// third party
import bcryptjs from "bcryptjs";
// app
import { errorResponse, generateJWT, googleVerify } from "../helper";

class AuthController {
  constructor() {
    this.login = this.login.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }
  
  // Login
  public async login(req: Request, res: Response) {
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
      if (user.deleted) {
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
  }

  // Google Sign In
  public async googleSignIn(req: Request, res: Response) {
    const { id_token } = req.body;

    try {
      const payload = await googleVerify(id_token);

      let user = await UserModel.findOne({ email: payload.email });

      if (!user) {
        // create the user
        const data = {
          name: payload.name,
          email: payload.email,
          password: ":P",
          avatar: payload.picture,
          role: "USER_ROLE",
          google: true,
        };

        user = new UserModel({});
        await user.save();
      }

      // verify if the user is active
      if (user.deleted) {
        return errorResponse({
          res,
          value: user.email,
          msg: "Your account is not active, please contact with support",
          status: 401,
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
      console.log("catch");
      errorResponse({
        res,
        value: id_token,
        msg: "The token is not valid",
      });
    }
  }
}

export default new AuthController();