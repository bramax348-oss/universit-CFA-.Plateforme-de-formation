import { db, writeDB } from "../database/db.js";

export const getCourses = (req, res) => {
  res.json(db.courses);
};

export const createCourse = (req, res) => {
  const { title, module, description, content, duration, author } = req.body;
  if (!title || !module || !description || !content || !duration) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }
  const newCourse = {
    id: "c_" + Date.now(),
    title,
    module,
    description,
    content,
    duration: parseFloat(duration),
    author: author || "Formateur Université CFA",
    createdAt: new Date().toISOString(),
    completedBy: []
  };
  db.courses.push(newCourse);
  writeDB(db);
  db.stats.activities.unshift({
    id: "act_" + Date.now(),
    text: `Nouveau cours disponible : "${title}" publié par ${newCourse.author}.`,
    date: "À l'instant",
    icon: "book"
  });
  writeDB(db);
  res.status(201).json(newCourse);
};

export const deleteCourse = (req, res) => {
  const { id } = req.params;
  db.courses = db.courses.filter((c) => c.id !== id);
  writeDB(db);
  res.json({ success: true, message: "Cours archivé avec succès" });
};

export const updateCourse = (req, res) => {
  const { id } = req.params;
  const { title, module, description, content, duration, author } = req.body;
  const courseIndex = db.courses.findIndex((c) => c.id === id);
  if (courseIndex === -1) {
    return res.status(404).json({ error: "Cours non trouvé" });
  }
  db.courses[courseIndex] = {
    ...db.courses[courseIndex],
    title: title || db.courses[courseIndex].title,
    module: module || db.courses[courseIndex].module,
    description: description || db.courses[courseIndex].description,
    content: content || db.courses[courseIndex].content,
    duration: duration !== undefined ? parseFloat(duration) : db.courses[courseIndex].duration,
    author: author || db.courses[courseIndex].author
  };
  writeDB(db);
  res.json(db.courses[courseIndex]);
};

export const toggleCourseCompletion = (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const user = username || "etudiant";
  const course = db.courses.find((c) => c.id === id);
  if (!course) return res.status(404).json({ error: "Cours non trouvé" });
  if (!course.completedBy.includes(user)) {
    course.completedBy.push(user);
    db.stats.activities.unshift({
      id: "act_" + Date.now(),
      text: `Cours "${course.title}" marqué comme complété !`,
      date: "À l'instant",
      icon: "check"
    });
    writeDB(db);
  } else {
    course.completedBy = course.completedBy.filter((u) => u !== user);
    writeDB(db);
  }
  res.json(course);
};
