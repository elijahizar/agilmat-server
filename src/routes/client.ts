import { Router } from 'express';
import { deleteClient, getClient, getClients, newClient, updateClient }from '../controllers/client';
// import validateToken from './validate-token';

const router = Router();

router.post('/', newClient);
router.get('/',  getClients) //Appelle le methode getClients from controller
router.get('/:id', getClient);
router.delete('/:id', deleteClient);
router.put('/:id', updateClient);



export default router;

// validateToken,