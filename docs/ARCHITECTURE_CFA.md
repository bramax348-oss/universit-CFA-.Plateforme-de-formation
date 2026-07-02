# 🎓 Architecture & Séparation de l'Université CFA

Ce document détaille l'organisation de la plateforme éducative de l'**Université CFA**, conçu avec une séparation claire et rigoureuse entre le **Frontend** (Interface Client avec React et Tailwind CSS) et le **Backend** (Serveur d'API Node.js/Express avec persistance locale).

---

## 🗺️ Vision Globale du Système

La plateforme est structurée selon une architecture **client-serveur** moderne, optimisée pour le développement et la production :

```
             ┌──────────────────────────────────────────────┐
             │            Frontend (Navigateur)             │
             │           React / Tailwind / Lucide          │
             └──────────────────────┬───────────────────────┘
                                    │
                         Requêtes HTTP (Fetch API) via
                         /src/services/api.js
                                    │
                                    ▼
             ┌──────────────────────────────────────────────┐
             │            Backend (Serveur Express)         │
             │              /server/server.js               │
             └──────────────────────┬───────────────────────┘
                                    │
                        Intégration locale & Cloud
                                    │
                 ┌──────────────────┴──────────────────┐
                 ▼                                     ▼
     ┌───────────────────────┐             ┌───────────────────────┐
     │  Stockage JSON Local  │             │   Modèle Gemini IA    │
     │      /server/db.js    │             │  @google/genai (SDK)  │
     │   (db_store.json)     │             │                       │
     └───────────────────────┘             └───────────────────────┘
```

---

## 💻 1. Le Frontend (Côté Client)

Le dossier `/src` regroupe l'entièreté de la logique d'interface utilisateur en React 19 et le style via Tailwind.

### 🗂️ Organisation des fichiers du Frontend
*   **`/src/main.jsx`** : Point d'entrée de l'application React qui monte le composant principal sur le DOM.
*   **`/src/App.jsx`** : Contrôleur principal de l'application. Il gère l'état global (authentification, sélection des onglets actifs, déclenchement des notifications de succès, et stockage des listes d'éléments en synchronisation avec l'API).
*   **`/src/services/api.js`** : **Couche d'abstraction réseau.** Aucune requête `fetch` n'est codée en dur dans les composants. Tout est centralisé dans cet objet `apiService` pour simplifier la maintenance.
*   **`/src/components/Footer.jsx`** : Composant de pied de page extrait de la vue principale pour l'alléger.
*   **`/src/index.css`** : Style global important le framework utilitaire Tailwind CSS et définissant les variables de thèmes.

### 🌐 Rôle du Service d'API (`apiService`)
Notre service centralise toutes les routes réseau en fonctions asynchrones réutilisables à travers l'application React :
*   **Cours** : `apiService.getCourses()`, `apiService.createCourse()`, `apiService.updateCourse()`, `apiService.deleteCourse()`, `apiService.toggleCourseCompletion()`
*   **Exercices** : `apiService.getExercises()`, `apiService.createExercise()`, `apiService.deleteExercise()`, `apiService.toggleExerciseCompletion()`
*   **Vidéos** : `apiService.getVideos()`, `apiService.createVideo()`, `apiService.deleteVideo()`, `apiService.toggleVideoCompletion()`
*   **Statistiques (Alternance)** : `apiService.getStats()`, `apiService.addTrainingHours()`, `apiService.validateModuleSkill()`, `apiService.clearRecentActivities()`
*   **Messages & Discussions** : `apiService.getMessages()`, `apiService.createMessage()`
*   **Formulaires externes** : `apiService.submitContact()`, `apiService.submitCandidacy()`
*   **IA Chatbot (Gemini)** : `apiService.sendGeminiPrompt()`

---

## ⚙️ 2. Le Backend (Côté Serveur)

Situé dans le dossier `/server`, le backend est léger, résilient et totalement isolé des composants graphiques.

### 🗂️ Organisation des fichiers du Backend
*   **`/server/server.js`** : Fichier serveur principal utilisant un serveur d'API RESTful standardisé avec **Express.js**.
*   **`/server/db.js`** : Système de base de données ultra-rapide basé sur un fichier de stockage JSON appelé `db_store.json`. Il gère le chargement initial des données de démonstration (seed) et s'assure que chaque écriture/mise à jour persiste automatiquement sur le disque.
*   **`/db_store.json`** : Fichier JSON physique qui stocke l'état complet de la plateforme.

### 🛠️ Résilience & Sécurité : Le Chatbot Éducatif IA
L'intégration clé avec le modèle **Gemini 3.5-flash** est sécurisée côté serveur pour que la clé d'API (`process.env.GEMINI_API_KEY`) ne soit **jamais exposée** au navigateur de l'élève :
1.  Le frontend envoie son prompt au serveur backend Express via l'itinéraire POST `/api/gemini/chat`.
2.  Le serveur vérifie si une clé d'API valide est disponible.
3.  **Si oui** : Le serveur utilise le SDK officiel puissant `@google/genai` pour générer une réponse fluide et instruite, orientée vers l'alternance et le programme d'études académiques de 2026.
4.  **Si non (Mode Hors-ligne / Clé absente)** : Le serveur bascule automatiquement sur un système de **moteur de règles expertes local** très robuste capable de catégoriser les questions portant sur JavaScript, React, le SEO, ou l'organisation de l'alternance et de répondre de façon détaillée et encourageante sans planter le serveur.

---

## 🚀 3. Processus de Build et Lancement

Grâce à notre intégration, la transition du développement local à la production hébergée sur le cloud est simplifiée :

```json
  "scripts": {
    "dev": "node server/server.js",
    "build": "vite build && esbuild server/server.js --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs"
  }
```

*   **En développement (`npm run dev`)** : Le serveur Express est démarré et intègre automatiquement **Vite** comme middleware. Vite s'occupe de compiler et d'injecter à la volée le code React (HMR) à l'adresse http://localhost:3000.
*   **En production (`npm run build` puis `npm start`)** :
    1.  Vite compile et compresse tout le code frontend (HTML/CSS/JS) dans un dossier statique et autonome `/dist`.
    2.  `esbuild` compile et assemble notre backend `/server/server.js` en un unique fichier JavaScript classique autonome `/dist/server.cjs`.
    3.  La commande standard `node dist/server.cjs` démarre le serveur cloud à pleine vitesse. Le serveur sert alors les fichiers d'actifs statiques du dossier `/dist`, garantissant des démarrages rapides.
