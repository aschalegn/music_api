import { Router } from "express";
import { songControllers } from "./controllers/index.js";
import { asyncWrap } from "../../utils/asyncWrap.js";

const router = Router();

router.route("/")
    .post(asyncWrap(songControllers.addNewSong))


export default router;