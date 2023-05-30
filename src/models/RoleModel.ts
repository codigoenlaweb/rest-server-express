import { model, Schema } from "mongoose";

const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'The rol is required']
    },
});

export const RoleModel = model('Role', roleSchema);