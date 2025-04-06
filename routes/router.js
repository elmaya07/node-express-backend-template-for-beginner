import express from 'express';
import authRouter from './includes/auth.js';

const router = express.Router();
router.use('/auth',authRouter)

export default router;