/**
 * Service API pour l'Université CFA
 * Abstraction de toutes les requêtes réseau (HTTP Fetch) vers le serveur d'API Express
 */

export const apiService = {
  // --- COURS ---
  async getCourses() {
    const res = await fetch("/api/courses");
    if (!res.ok) throw new Error("Erreur lors de la récupération des cours");
    return res.json();
  },

  async createCourse(courseData) {
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Impossible de créer le cours");
    }
    return res.json();
  },

  async updateCourse(id, courseData) {
    const res = await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData)
    });
    if (!res.ok) throw new Error("Erreur lors de la modification du cours");
    return res.json();
  },

  async deleteCourse(id) {
    const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur lors de l'archivage du cours");
    return res.json();
  },

  async toggleCourseCompletion(id, username) {
    const res = await fetch(`/api/courses/${id}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    if (!res.ok) throw new Error("Erreur lors du changement de complétion du cours");
    return res.json();
  },

  // --- EXERCICES ---
  async getExercises() {
    const res = await fetch("/api/exercises");
    if (!res.ok) throw new Error("Erreur lors de la récupération des exercices");
    return res.json();
  },

  async createExercise(exerciseData) {
    const res = await fetch("/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exerciseData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Impossible d'ajouter l'exercice");
    }
    return res.json();
  },

  async deleteExercise(id) {
    const res = await fetch(`/api/exercises/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur lors de la suppression de l'exercice");
    return res.json();
  },

  async toggleExerciseCompletion(id, username) {
    const res = await fetch(`/api/exercises/${id}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    if (!res.ok) throw new Error("Erreur lors de la complétion de l'exercice");
    return res.json();
  },

  // --- VIDÉOS ---
  async getVideos() {
    const res = await fetch("/api/videos");
    if (!res.ok) throw new Error("Erreur lors de la récupération des vidéos");
    return res.json();
  },

  async createVideo(videoData) {
    const res = await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videoData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Impossible d'ajouter la vidéo");
    }
    return res.json();
  },

  async deleteVideo(id) {
    const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur lors de la suppression de la vidéo");
    return res.json();
  },

  async toggleVideoCompletion(id, username) {
    const res = await fetch(`/api/videos/${id}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    if (!res.ok) throw new Error("Erreur lors de la mise à jour de la vidéo");
    return res.json();
  },

  // --- STATISTIQUES & ALTERNANCE ---
  async getStats() {
    const res = await fetch("/api/stats");
    if (!res.ok) throw new Error("Erreur lors de la récupération de l'état d'apprentissage");
    return res.json();
  },

  async addTrainingHours(hours) {
    const res = await fetch("/api/stats/add-hours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hours })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erreur lors de l'ajout d'heures");
    }
    return res.json();
  },

  async validateModuleSkill() {
    const res = await fetch("/api/stats/validate-module", { method: "POST" });
    if (!res.ok) throw new Error("Erreur lors de la validation du module académique");
    return res.json();
  },

  async clearRecentActivities() {
    const res = await fetch("/api/stats/clear-activities", { method: "POST" });
    if (!res.ok) throw new Error("Erreur lors de la suppression de l'activité récente");
    return res.json();
  },

  // --- MESSAGES / CHAT ---
  async getMessages() {
    const res = await fetch("/api/messages");
    if (!res.ok) throw new Error("Erreur de récupération de la messagerie");
    return res.json();
  },

  async createMessage(msgData) {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msgData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Impossible d'envoyer le message de discussion");
    }
    return res.json();
  },

  // --- FORMULAIRES EXTERNES ---
  async submitContact(formData) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Impossible de soumettre le formulaire");
    }
    return res.json();
  },

  async submitCandidacy(formData) {
    const res = await fetch("/api/candidacy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "L'envoi de la candidature a échoué");
    }
    return res.json();
  },

  // --- IA CHATBOT GEMINI ---
  async sendGeminiPrompt(prompt, chatHistory = []) {
    const res = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, chatHistory })
    });
    if (!res.ok) throw new Error("Le serveur d'IA n'a pas répondu correctement.");
    return res.json();
  }
};
