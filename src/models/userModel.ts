import { Document, model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
  deleted?: boolean;
  google?: boolean;
}

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return { uid: _id, ...user };
};

export const UserModel = model("User", userSchema);
