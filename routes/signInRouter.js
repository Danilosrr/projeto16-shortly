import { Router } from "express";
import { signIn } from "../controllers/signInController.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import signInSchema from "../schemas/signInSchema.js";

const signInRouter = Router();

signInRouter.post('/signin',validateSchema(signInSchema) , signIn);

export default signInRouter;