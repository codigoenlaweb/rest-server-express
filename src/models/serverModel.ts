// express
import express from "express";
// third apps
import cors from "cors";
import fileUpload from "express-fileupload";
// App
import { dbConection } from "../database";
import {
  authRouter,
  categoryRouter,
  productRouter,
  searchRouter,
  uploadRouter,
  userRouter,
} from "../routes";

export class serverModel {
  private app: express.Application;
  private port: string;
  private apiPaths = {
    auth: "/api/auth",
    category: "/api/categories",
    products: "/api/products",
    search: "/api/search",
    upload: "/api/uploads",
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
    this.app.use(express.static("public"));

    // File upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  // Define routes
  routes() {
    this.app.use(this.apiPaths.auth, authRouter);
    this.app.use(this.apiPaths.users, userRouter);
    this.app.use(this.apiPaths.category, categoryRouter);
    this.app.use(this.apiPaths.products, productRouter);
    this.app.use(this.apiPaths.search, searchRouter);
    this.app.use(this.apiPaths.upload, uploadRouter);
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
