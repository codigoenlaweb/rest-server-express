import { Request } from "express";
import { HydratedDocument } from "mongoose";
import { IUserSchema } from "../models/userModel";


export interface AuthRequest extends Request {
    userAuth?: HydratedDocument<IUserSchema> | undefined | null;
}