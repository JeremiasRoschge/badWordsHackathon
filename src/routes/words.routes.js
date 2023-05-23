import { Router } from "express";
import {
  getBadWord,
  getBadWords,
  addBadWord,
  checkTextForBadWords,
} from "../controllers/badwords.controller.js";

const router = Router();

// GET all bad words
router.get("/word", getBadWords);

// GET An bad word
router.get("/word/:words", getBadWord);

router.post("/word/check-text", checkTextForBadWords);

router.post("/word/:id", addBadWord)


export default router;
