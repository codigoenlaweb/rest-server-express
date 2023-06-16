import { model, Schema } from "mongoose";

interface IRoleSchema {
  role: string;
}

const roleSchema = new Schema<IRoleSchema>({
  role: {
    type: String,
    required: [true, "The rol is required"],
  },
});

roleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const RoleModel = model<IRoleSchema>("Role", roleSchema);
