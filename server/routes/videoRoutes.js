import express from "express";
import {
  getVideos,
  createVideo,
  deleteVideo,
  toggleVideoCompletion
} from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getVideos);
router.post("/", createVideo);
router.delete("/:id", deleteVideo);
router.post("/:id/complete", toggleVideoCompletion);

export default router;
