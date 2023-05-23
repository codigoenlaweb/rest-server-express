import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on host http://localhost:${port} 🚀`);
});