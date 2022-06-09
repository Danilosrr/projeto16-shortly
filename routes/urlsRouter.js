import { Router } from "express";
import { getIdUrl, goToUrl, shortenedUrl } from "../controllers/urlsController.js";
import { verifyToken } from "../middlewares/tokenMiddleware.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', verifyToken,shortenedUrl);
urlRouter.get('/urls/:id', getIdUrl);
urlRouter.get('/urls/open/:shortUrl', goToUrl);

export default urlRouter;