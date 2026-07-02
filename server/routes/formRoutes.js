import express from "express";
import {
  submitContact,
  submitCandidacy
} from "../controllers/formController.js";

const router = express.Router();

router.post("/contact", submitContact);
router.post("/candidacy", submitCandidacy);

export default router;
