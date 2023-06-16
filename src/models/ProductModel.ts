import { Document, model, Schema, Types } from "mongoose";

export interface IProductSchema {
  name: string;
  description?: string;
  available?: boolean;
  price?: number;
  deleted?: boolean;
  user: Types.ObjectId;
  category: Types.ObjectId;
}

const productSchema = new Schema<IProductSchema>({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  available: {
    type: Boolean,
    default: true,
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
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "The category is required"],
  },
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const ProductModel = model<IProductSchema>("Product", productSchema);
