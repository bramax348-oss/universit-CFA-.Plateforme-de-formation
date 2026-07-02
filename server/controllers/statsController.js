import { db, writeDB } from "../database/db.js";

export const getStats = (req, res) => {
  res.json(db.stats);
};

export const addTrainingHours = (req, res) => {
  const { hours } = req.body;
  const amount = parseFloat(hours);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Veuillez entrer un nombre d'heures valide" });
  }
  db.stats.hoursDone = Math.min(db.stats.hoursTotal, db.stats.hoursDone + amount);
  db.stats.activities.unshift({
    id: "act_" + Date.now(),
    text: `Enregistrement de +${amount}h d'apprentissage validées en alternance.`,
    date: "À l'instant",
    icon: "plus"
  });
  writeDB(db);
  res.json(db.stats);
};

export const validateModuleSkill = (req, res) => {
  db.stats.validatedModules = Math.min(db.stats.maxModules, db.stats.validatedModules + 1);
  db.stats.activities.unshift({
    id: "act_" + Date.now(),
    text: `Validation d'un nouveau bloc de compétences académiques.`,
    date: "À l'instant",
    icon: "check"
  });
  writeDB(db);
  res.json(db.stats);
};

export const clearRecentActivities = (req, res) => {
  db.stats.activities = [];
  writeDB(db);
  res.json(db.stats);
};
