import express from "express";
import {
  getExercises,
  createExercise,
  deleteExercise,
  toggleExerciseCompletion
} from "../controllers/exerciseController.js";

const router = express.Router();

router.get("/", getExercises);
router.post("/", createExercise);
router.delete("/:id", deleteExercise);
router.post("/:id/complete", toggleExerciseCompletion);

export default router;
