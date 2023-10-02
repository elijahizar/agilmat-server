import express, { Application, Request } from "express";
import cors from "cors";
import routesUser from "../routes/user";
import routesEquipment from "../routes/equipment";
import routesClient from "../routes/client";
import routesType from "../routes/type";
import routesBrand from "../routes/brand";
import routesModel from "../routes/model";
import Service from "./service";
import User from "./user";
import Client from "./client";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;

  //Initialitation dans le constructor
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }
  listen() {
    this.app.use(cors<Request>());
    this.app.listen(this.port, () => {
      console.log("Listening on port: " + this.port);
    });
  }
  //Methode pour les routes
  routes() {
    this.app.use("/api/users", routesUser);
    this.app.use("/api/equipments", routesEquipment);
    this.app.use("/api/clients", routesClient);
    this.app.use("/api/type", routesType);
    this.app.use("/api/brand", routesBrand);
    this.app.use("/api/model", routesModel);
  }

  midlewares() {
    //parseo body
    this.app.use(express.json());

    //Cors
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("DB Connected");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default Server;
