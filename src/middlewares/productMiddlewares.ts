import { ProductModel } from "../models";

export const prodcutExistInDb = async (prodcut_id: string) => {
  const _id = prodcut_id;

  try {
    const existProduct = await ProductModel.find({ _id, deleted: false });
    
    if (!existProduct[0]) {
      throw new Error(`The product doesn't exists`);
    }
  } catch (error) {
    throw new Error(`The product doesn't exists`);
  }
};
