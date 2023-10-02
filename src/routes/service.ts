import { Router } from "express";
import validateToken from "./validate-token";
import {
  deleteServiceById,
  getServiceById,
  getServices,
  newService,
  updateServiceById,
} from "../controllers/service";

const router = Router();

router
  .get("/", getServices)
  .get("/:id", getServiceById)
  .post("/", newService) //Appelle le methode newServices from controller
  .delete("/:id", deleteServiceById)
  .put("/:id", updateServiceById);

export default router;
