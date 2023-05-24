// express
import { Request, Response } from "express";

// Get all Users
export const getUsersController = async (req: Request, res: Response) => {
  
    const { q, name, key } = req.query;
  
    res.json({
    msg: "get Users",
    data: {
        q,
        name,
        key,
    },
  });
};

// Create User
export const postUserController = async (req: Request, res: Response) => {
  const { name, age } = req.body;

  res.json({
    msg: "post User",
    data: {
      name,
      age,
    },
  });
};

// Update User
export const putUserController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { name, age } = req.body;

  res.json({
    msg: "put User",
    data: {
        id,
        name,
        age,
    },
  });
};

// Delete User
export const deleteUserController = async (req: Request, res: Response) => {
  res.json({
    msg: "delete User",
  });
};
