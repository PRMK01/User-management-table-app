import express from 'express';
import authenticateUser from '../controllers/Auth.js';


const router = express.Router();

router.post('/', authenticateUser);


export default router;