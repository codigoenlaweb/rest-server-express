import { Document, model, Schema, Types } from "mongoose";

export interface ICategorySchema {
  name: string;
  deleted?: boolean;
  user: Types.ObjectId;
}

const categorySchema = new Schema<ICategorySchema>({
  name: {
    type: String,
    required: [true, "The name is required"],
    unique: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The user is required"],
  },
});

categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CategoryModel = model<ICategorySchema>("Category", categorySchema);
