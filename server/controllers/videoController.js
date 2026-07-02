import { db, writeDB } from "../database/db.js";

export const getVideos = (req, res) => {
  res.json(db.videos);
};

export const createVideo = (req, res) => {
  const { title, module, url, description, duration, prerequisites, author } = req.body;
  if (!title || !module || !url || !duration) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }
  let embedUrl = url;
  if (url.includes("watch?v=")) {
    embedUrl = url.replace("watch?v=", "embed/");
  } else if (url.includes("youtu.be/")) {
    embedUrl = url.replace("youtu.be/", "youtube.com/embed/");
  }
  const newVideo = {
    id: "v_" + Date.now(),
    title,
    module,
    url: embedUrl,
    description: description || "",
    duration: parseInt(duration),
    prerequisites: prerequisites || "",
    author: author || "Formateur Université CFA",
    createdAt: new Date().toISOString(),
    completedBy: []
  };
  db.videos.push(newVideo);
  writeDB(db);
  db.stats.activities.unshift({
    id: "act_" + Date.now(),
    text: `Nouvelle vidéo éducative : "${title}" publiée !`,
    date: "À l'instant",
    icon: "plus"
  });
  writeDB(db);
  res.status(201).json(newVideo);
};

export const deleteVideo = (req, res) => {
  const { id } = req.params;
  db.videos = db.videos.filter((v) => v.id !== id);
  writeDB(db);
  res.json({ success: true, message: "Vidéo retirée" });
};

export const toggleVideoCompletion = (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const user = username || "etudiant";
  const video = db.videos.find((v) => v.id === id);
  if (!video) return res.status(404).json({ error: "Vidéo non trouvée" });
  if (!video.completedBy.includes(user)) {
    video.completedBy.push(user);
    db.stats.activities.unshift({
      id: "act_" + Date.now(),
      text: `Vidéo "${video.title}" regardée !`,
      date: "À l'instant",
      icon: "check"
    });
    writeDB(db);
  } else {
    video.completedBy = video.completedBy.filter((u) => u !== user);
    writeDB(db);
  }
  res.json(video);
};
