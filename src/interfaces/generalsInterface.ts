import { Request } from "express";
import { IUserSchema } from "../models/userModel";
import { HydratedDocument } from "mongoose";


export interface AuthRequest extends Request {
    userAuth?: HydratedDocument<IUserSchema> | undefined | null;
}