import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

import { PORT, NODE_ENV } from "./config/config.js";
import apiRouter from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// =====================
// API ROUTES (backend)
// =====================
app.use("/api", apiRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString()
  });
});

// =====================
// START SERVER
// =====================
async function startServer() {
  if (NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });

    app.use(vite.middlewares);

    console.log("🚀 Dev mode: Vite + Express running on one server");
  } else {
    const distPath = path.join(process.cwd(), "frontend/dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });

    console.log("🚀 Production mode: serving built frontend");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🎓 Server running: http://localhost:${PORT}`);
  });
}

startServer();