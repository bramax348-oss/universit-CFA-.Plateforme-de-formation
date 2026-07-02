import { db, writeDB } from "../database/db.js";

export const getMessages = (req, res) => {
  res.json(db.messages);
};

export const createMessage = (req, res) => {
  const { to, content, subject, fromName, fromRole } = req.body;
  if (!to || !content || !subject) {
    return res.status(400).json({ error: "Informations de message incomplètes" });
  }
  const newMessage = {
    id: "msg_" + Date.now(),
    from: fromRole === "formateur" ? "formateur" : "etudiant",
    to,
    content,
    timestamp: new Date().toISOString(),
    subject,
    fromName: fromName || (fromRole === "formateur" ? "M. Jean Olivier Andrianirina" : "Apprenti Émule"),
    fromRole: fromRole || "etudiant"
  };
  db.messages.push(newMessage);
  writeDB(db);
  res.status(201).json(newMessage);
};
