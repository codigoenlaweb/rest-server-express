import { Response } from "express";

interface PaginatedResponse {
  res: Response;
  data: object;
  count: number;
  page: number;
  limit: number;
}

export const paginatedResponse = ({
  res,
  data,
  count,
  page,
  limit,
}: PaginatedResponse) => {
  
  const next =
  Number(page) + 1 < Math.ceil(count / Number(limit))
  ? `http://localhost:3000/api/users?limit=${limit}&page=${
    Number(page) + 1
  }`
  : null;
  const prev =
  Number(page) > 0
  ? `http://localhost:3000/api/users?limit=${limit}&page=${
    Number(page) - 1
  }`
  : null;
  
  res.json({
    meta: {
      count: count,
      page: Number(page),
      next: next,
      prev: prev,
    },
    data: data,
  });
};
