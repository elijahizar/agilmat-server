import { Router } from "express";
import validateToken from "./validate-token";
import { getServiceTypes } from "../controllers/type";

const router = Router();

router.get("/", getServiceTypes); //validateToken) //Appelle le methode getServices from controller  //getServices
/*    .get('/Service/:id',getServiceById)
    .post('/', newService) //Appelle le methode newServices from controller
    .delete('/',deleteServiceById)
    .put('/',updateServiceById) */

export default router;
