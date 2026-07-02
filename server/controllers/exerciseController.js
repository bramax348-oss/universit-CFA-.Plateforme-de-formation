import { db, writeDB } from "../database/db.js";

export const getExercises = (req, res) => {
  res.json(db.exercises);
};

export const createExercise = (req, res) => {
  const { title, module, statement, hint, solution, difficulty, time, author } = req.body;
  if (!title || !module || !statement || !solution || !time || !difficulty) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }
  const newExercise = {
    id: "ex_" + Date.now(),
    title,
    module,
    statement,
    hint: hint || "",
    solution,
    difficulty,
    time: parseInt(time),
    author: author || "Formateur Université CFA",
    createdAt: new Date().toISOString(),
    completedBy: []
  };
  db.exercises.push(newExercise);
  writeDB(db);
  db.stats.activities.unshift({
    id: "act_" + Date.now(),
    text: `Nouvel exercice : "${title}" ajouté par ${newExercise.author}.`,
    date: "À l'instant",
    icon: "plus"
  });
  writeDB(db);
  res.status(201).json(newExercise);
};

export const deleteExercise = (req, res) => {
  const { id } = req.params;
  db.exercises = db.exercises.filter((e) => e.id !== id);
  writeDB(db);
  res.json({ success: true, message: "Exercice supprimé avec succès" });
};

export const toggleExerciseCompletion = (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const user = username || "etudiant";
  const exercise = db.exercises.find((e) => e.id === id);
  if (!exercise) return res.status(404).json({ error: "Exercice non trouvé" });
  if (!exercise.completedBy.includes(user)) {
    exercise.completedBy.push(user);
    db.stats.activities.unshift({
      id: "act_" + Date.now(),
      text: `Exercice "${exercise.title}" complété !`,
      date: "À l'instant",
      icon: "check"
    });
    writeDB(db);
  } else {
    exercise.completedBy = exercise.completedBy.filter((u) => u !== user);
    writeDB(db);
  }
  res.json(exercise);
};
