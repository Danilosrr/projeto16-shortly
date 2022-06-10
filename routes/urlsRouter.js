import { Router } from "express";
import { deleteUrl, getIdUrl, goToUrl, shortenedUrl } from "../controllers/urlsController.js";
import { verifyToken } from "../middlewares/tokenMiddleware.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten',validateSchema(urlSchema), verifyToken, shortenedUrl);
urlRouter.get('/urls/:id', getIdUrl);
urlRouter.get('/urls/open/:shortUrl', goToUrl);
urlRouter.delete('/urls/:id',verifyToken, deleteUrl);

export default urlRouter;