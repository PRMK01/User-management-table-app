import express from 'express';
import { getUser, createUser, updateUsers } from '../controllers/User.js'

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);
router.put('/', updateUsers);

export default router;