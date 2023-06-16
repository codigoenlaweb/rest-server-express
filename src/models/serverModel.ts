// express
import express from "express";
// third apps
import cors from "cors";
// Routes
import { dbConection } from "../database";
import {
  authRouter,
  categoryRouter,
  productRouter,
  searchRouter,
  userRouter,
} from "../routes";

export class serverModel {
  private app: express.Application;
  private port: string;
  private apiPaths = {
    auth: "/api/auth",
    users: "/api/users",
    category: "/api/categories",
    products: "/api/products",
    search: "/api/search",
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
    this.app.use(express.static("public"));
  }

  // Define routes
  routes() {
    this.app.use(this.apiPaths.auth, authRouter);
    this.app.use(this.apiPaths.users, userRouter);
    this.app.use(this.apiPaths.category, categoryRouter);
    this.app.use(this.apiPaths.products, productRouter);
    this.app.use(this.apiPaths.search, searchRouter);
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
