import { Router } from "express";
import validateToken from "./validate-token";
import { getBrands } from "../controllers/brand";

const router = Router();

router.get("/", getBrands); //validateToken) //Appelle le methode getServices from controller  //getServices
/*    .get('/Service/:id',getServiceById)
    .post('/', newService) //Appelle le methode newServices from controller
    .delete('/',deleteServiceById)
    .put('/',updateServiceById) */

export default router;
