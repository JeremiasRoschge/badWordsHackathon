import { Router } from "express";
import { index, ping } from "../controllers/index.rotes.js";

import { checkTextForBadWords} from "../controllers/badwords.controller.js";

const router = Router();

router.get("/", index);

router.post("/socker.html", checkTextForBadWords);

router.get("/ping", ping);

export default router;
