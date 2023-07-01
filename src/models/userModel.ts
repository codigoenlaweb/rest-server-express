import { model, Schema, Types } from "mongoose";

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
  deleted?: boolean;
  google?: boolean;
  // relationships
  categories: Types.ObjectId[];
  products: Types.ObjectId[];
}

const userSchema = new Schema<IUserSchema>({
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
  // relationships
  categories: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.uid = document._id.toString();
    delete returnedObject._id; 
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const UserModel = model<IUserSchema>("User", userSchema);
