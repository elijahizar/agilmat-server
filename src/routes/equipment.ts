import { Router } from "express";
import validateToken from "./validate-token";
import {
  deleteDeviceById,
  getDeviceById,
  getDevices,
  newDevice,
  updateDeviceById,
} from "../controllers/equipment";

const router = Router();

router
  .get("/", getDevices)
  .get("/:id", getDeviceById)
  .post("/", newDevice)
  .delete("/:id", deleteDeviceById)
  .put("/:id", updateDeviceById);

export default router;
