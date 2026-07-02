import { db, writeDB } from "../database/db.js";

export const submitContact = (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Veuillez remplir les champs obligatoires du formulaire." });
  }
  const request = {
    id: "cont_" + Date.now(),
    name,
    email,
    phone,
    message,
    date: new Date().toLocaleDateString("fr-FR")
  };
  db.contacts.push(request);
  writeDB(db);
  res.json({ success: true, message: `Merci ${name}, votre message a bien été envoyé à l'Université CFA!` });
};

export const submitCandidacy = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Champs obligatoires manquants pour la candidature !" });
  }
  const val = {
    id: "cand_" + Date.now(),
    name,
    email,
    phone,
    status: "reçu",
    date: new Date().toLocaleDateString("fr-FR")
  };
  db.candidacies.push(val);
  writeDB(db);
  res.json({ success: true, message: `Félicitations ${name}, votre dossier d'alternance a été mis en ligne sous l'identifiant ${val.id}.` });
};
