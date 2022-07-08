import { Router } from "express";
import { getUsers } from "../controllers/usersConctroller.js";
import { verifyToken } from "../middlewares/tokenMiddleware.js";

const usersRouter = Router();

usersRouter.get('/users', verifyToken, getUsers);

export default usersRouter;