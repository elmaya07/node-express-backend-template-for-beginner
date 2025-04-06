import express from 'express'; 
import { getMenus, login } from '../../controllers/auth.controller.js';

const authRouter = express.Router();
authRouter.post('/login', login); // Route for user login
authRouter.get('/menus', getMenus);

export default authRouter;