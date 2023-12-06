import { Router } from "express";
import { artistController } from "./controllers/index.js";
import { asyncWrap } from "../../utils/asyncWrap.js";
const router = Router();

router.route("/")
    .get(asyncWrap(artistController.getArtists))
    .post(artistController.addNewArtist)

export default router;