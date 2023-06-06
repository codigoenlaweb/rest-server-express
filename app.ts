import dotenv from "dotenv";
import { serverModel } from "./src/models";

// Load environment variables
dotenv.config();

// Create server
const server = new serverModel();
server.listen();