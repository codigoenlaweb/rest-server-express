import { Document, model, Schema, Types } from "mongoose";

export interface ICategorySchema {
  name: string;
  deleted?: boolean;
  // relationships
  user: Types.ObjectId;
  products: Types.ObjectId[];
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
  // relationships
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The user is required"],
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const CategoryModel = model<ICategorySchema>("Category", categorySchema);
