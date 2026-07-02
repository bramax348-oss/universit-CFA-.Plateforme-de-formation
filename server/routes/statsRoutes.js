import express from "express";
import {
  getStats,
  addTrainingHours,
  validateModuleSkill,
  clearRecentActivities
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getStats);
router.post("/add-hours", addTrainingHours);
router.post("/validate-module", validateModuleSkill);
router.post("/clear-activities", clearRecentActivities);

export default router;
