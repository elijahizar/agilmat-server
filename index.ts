import dotenv from "dotenv";
import Server from "./src/models/server";

//config dotenv, les variables
dotenv.config();

const server = new Server();
