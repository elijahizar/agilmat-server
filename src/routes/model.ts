import { Router } from "express";
import validateToken from "./validate-token";
import { getModels } from "../controllers/model";

const router = Router();

router.get("/", getModels); //validateToken) //Appelle le methode getServices from controller  //getServices
/*    .get('/Service/:id',getServiceById)
    .post('/', newService) //Appelle le methode newServices from controller
    .delete('/',deleteServiceById)
    .put('/',updateServiceById) */

export default router;
