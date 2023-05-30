// express
import express from "express";
// third apps
import cors from "cors";
// Routes
import { userRouter } from "../routes/userRouter";
import { dbConection } from "../database/config";

export class serverModel {
  private app: express.Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Connect to database
    this.connectDB();

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
    this.app.use(this.apiPaths.users, userRouter);
  }

  async connectDB() {
    await dbConection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Example app listening on host http://localhost:${this.port} 🚀`
      );
    });
  }
}
