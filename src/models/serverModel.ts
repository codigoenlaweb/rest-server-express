// express
import express, { Request, Response } from "express";
// third apps
import cors from "cors";
// Routes
import { crudRoutes } from "../routes/crudsRoutes";

export class serverModel {
  private app: express.Application;
  private port: string;
  private apiPaths = {
    cruds: "/api/cruds",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Middlewares
    this.middlewares();

    // Define routes
    this.routes();
  }

  // Middlewares
  middlewares() {
    // CORS
    this.app.use(cors());

    // Read body
    this.app.use(express.json());

    // Public folder
    this.app.use('static', express.static("public"));
  }

  // Define routes
  routes() {
    this.app.use(this.apiPaths.cruds, crudRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Example app listening on host http://localhost:${this.port} 🚀`
      );
    });
  }
}
