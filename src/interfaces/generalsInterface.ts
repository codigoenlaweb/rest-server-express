import { Request } from "express";
import { IUserSchema } from "../models/userModel";


export interface AuthRequest extends Request {
    userAuth?: IUserSchema | undefined | null;
}