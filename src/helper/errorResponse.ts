import { Response } from "express";

interface Props {
  res: Response;
  value: string;
  msg: string;
  path?: string;
  type?: string;
  location?: string;
  status?: number;
}

export const errorResponse = ({
  res,
  value,
  msg,
  path = "error",
  type = "field",
  location = "body",
  status = 400,
}: Props) => {
  res.status(status).json([
    {
      type: type,
      value: value,
      msg: msg,
      path: path,
      location: location,
    }, 
  ]);
};
 