import { Router } from "express";
import { deleteUrl, getIdUrl, goToUrl, shortenedUrl } from "../controllers/urlsController.js";
import { verifyToken } from "../middlewares/tokenMiddleware.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', verifyToken,shortenedUrl);
urlRouter.get('/urls/:id', getIdUrl);
urlRouter.get('/urls/open/:shortUrl', goToUrl);
urlRouter.delete('/urls/:id',verifyToken, deleteUrl);

export default urlRouter;