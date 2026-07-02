import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  toggleCourseCompletion
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.post("/:id/complete", toggleCourseCompletion);

export default router;
