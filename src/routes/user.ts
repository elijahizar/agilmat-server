import { Router } from 'express';
import { deleteUser, getUser, getUsers, loginUser, newUser, updateUser } from '../controllers/user';

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/', getUsers);//appel au controller/user.ts
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);






export default router;
