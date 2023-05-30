import { RoleModel } from "../models/RoleModel";
import { UserModel } from "../models/userModel";

export const roleValidate = async (role: string) => {
  const roleExistInDb = await RoleModel.exists({ role });
  if (!roleExistInDb) {
    throw new Error(`The role is invalid`);
  }
};

export const emailExistInDb = async (email: string) => {
    const exitsEmail = await UserModel.findOne({ email });
    if (exitsEmail) {
        throw new Error(`The email already exists`);
    }
}

export const userExistInDb = async (id: string) => {
  const existUser = await UserModel.find({ _id: id, deleted: false });
  
  if (!existUser[0]) {
    throw new Error(`The user doesn't exists`);
  }
}