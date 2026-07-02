import express from "express";

// Import modules
import courseRoutes from "./courseRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import videoRoutes from "./videoRoutes.js";
import statsRoutes from "./statsRoutes.js";
import messageRoutes from "./messageRoutes.js";
import formRoutes from "./formRoutes.js";
import geminiRoutes from "./geminiRoutes.js";

const router = express.Router();

// Centralize routes
router.use("/courses", courseRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/videos", videoRoutes);
router.use("/stats", statsRoutes);
router.use("/messages", messageRoutes);
router.use("/gemini", geminiRoutes);

// Forms mount straight onto the root of forms api
router.use("/", formRoutes);

export default router;
