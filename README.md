# 🎓 Université CFA — Plateforme d'Apprentissage en Alternance

Bienvenue dans le dépôt du projet **Université CFA**, une plateforme web d'apprentissage et de suivi de l'alternance. Le projet est entièrement écrit en JavaScript moderne (ES Modules) avec un **Frontend** dynamique sous **React** & **Tailwind CSS** et un **Backend** robuste sous **Node.js** / **Express** alimenté par l'IA **Gemini**.

Ce document propose une cartographie complète et détaillée de l'ensemble des fichiers constituant ce projet pour faciliter sa compréhension, sa maintenance et son extension.

---

## 📁 Structure Globale du Projet

Le projet adopte une séparation stricte des responsabilités (SOC - Separation of Concerns), répartie comme suit :

```text
├── 📂 .env.example              # Modèle de configuration des variables d'environnement
├── 📂 .gitignore                # Fichiers et dossiers à exclure du versionnage
├── 📂 db_store.json             # Base de données locale (Fichier physique JSON)
├── 📂 index.html                # Point d'entrée HTML de l'application cliente
├── 📂 metadata.json             # Métadonnées de l'application AI Studio
├── 📂 package.json              # Gestionnaire de dépendances et scripts npm
├── 📂 vite.config.js            # Configuration du bundler Vite
│
├── 📂 docs/
│   └── 📑 ARCHITECTURE_CFA.md   # Explication détaillée de l'architecture frontend/backend
│
├── 📂 src/                      # === FRONTEND (REACT/TAILWIND) ===
│   ├── 📑 App.jsx               # Composant principal d'interface et d'état client
│   ├── 📑 index.css             # Style global de l'application (import Tailwind CSS)
│   ├── 📑 main.jsx              # Point d'entrée JavaScript React (montage DOM)
│   ├── 📑 types.js              # Déclaration des modèles de données et énumérations
│   ├── 📂 components/
│   │   └── 📑 Footer.jsx        # Composant réutilisable pour le pied de page
│   └── 📂 services/
│       └── 📑 api.js            # Service centralisé d'accès à l'API (fetch)
│
└── 📂 server/                   # === BACKEND (EXPRESS/API/DATABASE) ===
    ├── 📑 server.js             # Fichier de démarrage du serveur webhook / HTTP Express
    ├── 📑 db.js                 # Proxy de compatibilité pour le module base de données
    │
    ├── 📂 config/
    │   └── 📑 config.js         # Variables de configuration globale (Ports, ENV, API)
    │
    ├── 📂 database/
    │   └── 📑 db.js             # Engine de stockage local JSON & données d'amorçage (Seed)
    │
    ├── 📂 middleware/
    │   └── 📑 logger.js         # Journalisation (Logger) des requêtes HTTP à la console
    │
    ├── 📂 routes/
    │   ├── 📑 index.js          # Routeur centralisant tous les modules d'API
    │   ├── 📑 courseRoutes.js   # Routes API pour la gestion des cours
    │   ├── 📑 exerciseRoutes.js # Routes API pour les validations d'exercices
    │   ├── 📑 videoRoutes.js    # Routes API pour le visionnage des ressources vidéos
    │   ├── 📑 statsRoutes.js    # Routes API de calcul et mise à jour d'heures d'alternance
    │   ├── 📑 messageRoutes.js  # Routes API de la messagerie interne (chat)
    │   ├── 📑 formRoutes.js     # Routes API des formulaires externes (Candidature, Contact)
    │   └── 📑 geminiRoutes.js   # Routes API du chatbot pédagogique IA (Gemini)
    │
    └── 📂 controllers/
        ├── 📑 courseController.js   # Logique métier: CRUD & complétion des cours
        ├── 📑 exerciseController.js # Logique métier: CRUD & validation d'exercices
        ├── 📑 videoController.js    # Logique métier: CRUD & complétion des vidéos
        ├── 📑 statsController.js    # Logique métier: Suivi d'heures de tutorat de l'élève
        ├── ├── messageController.js  # Logique métier: Envoi et réception de messages
        ├── 📑 formController.js     # Logique métier: Capture des dépôts de CV et emails
        └── 📑 geminiController.js   # Logique métier: Assistant IA et Rule-engine de secours
```

---

## 💻 Description Détaillée des Fichiers

### 1. Fichiers de Configuration Racine

*   **`package.json`** : Contient les scripts et dépendances de l'application :
    *   `npm run dev` : Lance le serveur de développement Express avec le middleware Vite.
    *   `npm run build` : Compile les ressources statiques React (`dist/`) et bundle le serveur avec `esbuild` (`dist/server.cjs`).
    *   `npm start` : Démarre le serveur compilé autonome en production.
*   **`vite.config.js`** : Configure Vite pour l'intégration automatique de React et la gestion des proxies.
*   **`index.html`** : Point d'ancrage sur lequel React monte le DOM (`<div id="root"></div>`).
*   **`db_store.json`** : Fichier physique persistant simulant la base de données de production locale.

### 2. Le Frontend (`/src`)

*   **`src/main.jsx`** : Initialise React 19 et lie le composant principal `App.jsx` au DOM HTML.
*   **`src/App.jsx`** : Fichier central de l'interface utilisateur. Contient l'état client complet (onglets, modales de publication, notifications éphémères) et redirige l'utilisateur apprenti ou formateur vers les briques correspondantes (Cours, Dashboard, Discussion, Chat IA, Attestations, Gestion).
*   **`src/services/api.js`** : Service autonome centralisant toutes les transactions réseau à l'aide de l'API moderne `fetch`. Aucun appel d'API n'est dispersé dans l'arborescence UI, garantissant une clarté et maintenance optimale.
*   **`src/types.js`** : Répertorie les énumérations partagées (comme les modules de cours `WEB`, `MARKETING`, `SECURITE`, `DATA`).
*   **`src/components/Footer.jsx`** : Composant de pied de page de l'école CFA.

### 3. Le Serveur Backend (`/server`)

#### 📄 Fichier de Base
*   **`server/server.js`** : Démarre le site. Il configure l'analyse des requêtes JSON, applique le middleware de log, connecte l'arborescence complète des routes sous le préfixe `/api`, et initialise le middleware de développement **Vite** ou sert la build statique en production.

#### 📂 Configuration & Base de données
*   **`server/config/config.js`** : Centralise la gestion du port et de la clé secrète `GEMINI_API_KEY` fournie de manière sécurisée par l'environnement Système.
*   **`server/database/db.js`** : Moteur d'écriture et lecture asynchrone pour la base de données locale `db_store.json`. Fournit les données d'initialisation par défaut si aucun fichier de stockage n'existe encore.

#### 📂 Routeurs (`server/routes/`)
*   **`routes/index.js`** : Routeur général regroupant et préfixant l'ensemble des modules d'API.
*   *Autres fichiers de routage (`courseRoutes.js`, etc.)* : Déclarent les verbes d'API correspondants (`GET`, `POST`, `PUT`, `DELETE`) et délèguent l'exécution au contrôleur approprié.

#### 📂 Contrôleurs (`server/controllers/`)
Ils contiennent la logique métier pure du projet :
*   **`courseController.js`** : Crée, édite, supprime et archive les activités/cours pédagogiques.
*   **`exerciseController.js`** : Valide le code résolu, stocke les tentatives de réussite des élèves.
*   **`videoController.js`** : Transforme les URLs standard YouTube en formats embarqués sécurisés afin d'aider l'apprentissage direct dans l'application.
*   **`statsController.js`** : Met à jour les heures d'alternance acquises par l'étudiant en entreprise (liaison avec son tuteur de stage).
*   **`messageController.js`** : Distribue les messages de contact des élèves aux formateurs dans la boîte de discussion pour un suivi rapproché.
*   **`formController.js`** : Traite les formulaires d'admission, de contact et d'inscription d'alternance.
*   **`geminiController.js`** : Gère l'assistant IA. En cas d'indisponibilité de la clé ou de perte d'Internet, il active un moteur de règles expertes local de secours très réaliste pour toujours guider et dépanner l'apprenti.

---

## 🛡️ Atouts de cette Séparation

1.  **Isolation de la Clé d'API** : La clé Gemini (`GEMINI_API_KEY`) réside uniquement sur le serveur. Elle n'est jamais exposée aux élèves via le navigateur.
2.  **Réseau Propre** : Les composants React consomment des méthodes du service `api.js` claires comme `apiService.getCourses()` plutôt que des requêtes HTTP manuelles avec du code verbeux.
3.  **Modularité** : Modifier le parcours d'un cours ou le calcul du dashboard ne nécessite aucune intervention côté client, de même que modifier l'affichage n'altère pas la validité logique de la base de données locale.
