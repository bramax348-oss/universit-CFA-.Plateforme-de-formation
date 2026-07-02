import { GoogleGenAI } from "@google/genai";
import { db } from "../database/db.js";
import { GEMINI_API_KEY } from "../config/config.js";

let aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      console.log("Lazy initialization of server-side Gemini AI completed successfully.");
    } else {
      console.log("No valid GEMINI_API_KEY found, server-side chatbot will execute in fallback expert rule-based mode.");
    }
  }
  return aiClient;
}

export const chatWithGemini = async (req, res) => {
  const { prompt, chatHistory } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Le message d'entrée est obligatoire." });
  }
  const systemInstruction = `
    Tu es l'assistant de formation intelligent de l'Université CFA, conçu par l'ingénieur Andrianirina Jean Olivier en 2026.
    Ton objectif est d'accompagner de façon pédagogique les apprentis et formateurs sur la plateforme de formation en alternance en répondant à toutes leurs questions de manière variée, créative et structurée.
    
    Directives importantes :
    1. Sois extrêmement professionnel, encourageant, calme, et pédagogue.
    2. Réponds en français clair avec une mise en forme soignée (Markdown, puces, extraits de code si nécessaire).
    3. Tu t'y connais très bien sur de nombreux domaines académiques et professionnels : enseignement universitaire en alternance, modules de Développement Web (JavaScript, React, Vite), Marketing Digital (SEO, Google Ads), Cybersécurité (Modèle CIA, pare-feux, cryptographie), Data Science (Python, Machine learning, Pandas), Modélisation et bases de données SQL/NoSQL, UI/UX Design (Figma, ergonomie), Gestion de projet agile (Scrum, Kanban), techniques de Recrutement (CV, lettre de motivation et entretien), Anglais professionnel/technique, et Mathématiques appliquées/Algorithmique.
    4. Tu es totalement à l'écoute et capable de répondre à toutes les autres requêtes variées des étudiants (méthodologie d'étude, culture générale, aide à la rédaction, questions de logique) pour offrir une expérience d'entraînement complète et tout-en-un.
    5. Propose des solutions simples, des conseils d'organisation, et guide l'élève pas à pas vers la solution au lieu de simplement lui donner la réponse.
    6. Fais de courtes blagues pédago de temps en temps si opportun.
  `;
  try {
    const client = getGeminiClient();
    if (client) {
      // Construction de la discussion avec l'historique de conversation (modèle multi-tours)
      let contents = [];
      if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 1) {
        // Le premier élément correspond au message d'accueil de l'assistant (bot), on l'exclut
        // pour démarrer proprement par un tour utilisateur "user" requis par l'API Gemini.
        for (let i = 1; i < chatHistory.length; i++) {
          const role = (i % 2 === 1) ? "user" : "model";
          contents.push({
            role: role,
            parts: [{ text: chatHistory[i] }]
          });
        }
      } else {
        contents = [
          { role: "user", parts: [{ text: prompt }] }
        ];
      }

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
      const responseText = response.text;
      if (responseText) {
        return res.json({ reply: responseText });
      }
    }
  } catch (error) {
    console.error("Gemini Real Call Error, falling back to local expert system:", error.message || error);
  }

  let reply = "Je suis ravi de vous accompagner chez **Université CFA** ! ";
  const normPrompt = prompt.toLowerCase();
  
  if (normPrompt.includes("bonjour") || normPrompt.includes("salut") || normPrompt.includes("hello") || normPrompt.includes("coucou") || normPrompt.includes("hey")) {
    reply += `
### Bonjour et bienvenue ! 😊
Je suis ravi de vous retrouver sur la plateforme d'apprentissage de l'Université CFA.

Comment s'est passée votre dernière journée d'alternance ou de cours aujourd'hui ? 
N'hésitez pas à me demander de l'aide sur vos leçons de programmations web, de SEO, de cybersécurité, ou le suivi de vos heures !`;
  } else if (normPrompt.includes("merci") || normPrompt.includes("parfait") || normPrompt.includes("génial") || normPrompt.includes("super") || normPrompt.includes("ok")) {
    reply += `
### Avec grand plaisir ! 🎓
C'est un réel plaisir de pouvoir vous guider dans votre apprentissage de pointe à l'Université CFA.

N'hésitez pas si vous avez d'autres interrogations sur vos projets techniques ou sur votre parcours en entreprise ! Bon travail à vous !`;
  } else if (normPrompt.includes("javascript") || normPrompt.includes("js")) {
    reply += `
### Les points clés de JavaScript :
JavaScript est au cœur de l'interactivité moderne sur les navigateurs web.

1. **Variables modernes** : Utilisez toujours \`let\` pour les variables qui changent et \`const\` pour les constantes. Évitez \`var\`.
2. **Fonctions fléchées (ES6)** :
   \`\`\`javascript
   const saluer = (nom) => \`Bonjour \${nom} !\`;
   \`\`\`
3. **Tableaux & Itérations** : Privilégiez les méthodes immutables comme \`.map()\`, \`.filter()\` pour manipuler vos listes de cours ou d'apprentis.

*Avez-vous essayé de résoudre notre **Exercice 1** dans la bibliothèque de cours pour valider vos compétences en JS ?*`;
  } else if (normPrompt.includes("react")) {
    reply += `
### L'essentiel de React.js :
React permet de concevoir des interfaces utilisateur robustes sous forme de composants réutilisables.

- **Le State (\`useState\`)** : C'est la mémoire locale de votre composant. Quand le state change, l'interface se met à jour automatiquement.
- **Le cycle de vie (\`useEffect\`)** : Utile pour charger des données de notre serveur Node.js par exemple :
   \`\`\`javascript
   useEffect(() => {
     fetch('/api/courses')
       .then(res => res.json())
       .then(data => setCourses(data));
   }, []);
   \`\`\`

*Conseil de l'assistant IA : ne mettez jamais à jour l'état directement au milieu du corps d'un composant pour éviter les boucles de rendu infinies !*`;
  } else if (normPrompt.includes("seo") || normPrompt.includes("marketing")) {
    reply += `
### Stratégie SEO (Référencement Naturel) :
Pour optimiser votre site et attirer des prospects gratuitement, vous devez travailler 3 axes fondamentaux :

1. **Optimisation Technique** : Un chargement rapide de vos pages sous Vite, et un code sémantique HTML5.
2. **Le Contenu** : Rédiger des articles à forte valeur ajoutée autour d'intentions de recherche claires.
3. **Le Netlinking** : Obtenir des hyperliens entrants depuis des sites institutionnels ou de renom.`;
  } else if (normPrompt.includes("alternance") || normPrompt.includes("entreprise") || normPrompt.includes("tuteur")) {
    reply += `
### Conseils pour l'alternance :
L'alternance est une alliance parfaite entre théorie universitaire et mise en application pratique en entreprise.

- **Communication continue** : Assurez-vous d'informer régulièrement votre tuteur professionnel (**${db.stats.tutorName}** dans votre cas) de votre progression académique.
- **Suivi des heures** : Enregistrez assidûment vos heures de tutorat sur votre **Tableau de Bord** (vous avez déjà effectué **${db.stats.hoursDone}h** sur **${db.stats.hoursTotal}h** requises).
- **Rapport mensuel** : Ne tardez pas à le faire signer et à l'envoyer au formateur référent.`;
  } else if (normPrompt.includes("cyber") || normPrompt.includes("sécurité") || normPrompt.includes("sec ") || normPrompt.includes("cia")) {
    reply += `
### Focus Cybersécurité (Modèle CIA) :
La protection de l'information s'appuie sur la triade clé de la sécurité :

1. **Confidentialité** : S'assurer que seules les personnes autorisées ont accès aux données.
2. **Intégrité** : Garantir que les données ne sont pas altérées accidentellement ou de manière malveillante.
3. **Disponibilité** : Veiller à ce que les systèmes et les données soient accessibles en temps voulu par les utilisateurs légitimes.

*Conseil de l'assistant : révisez bien les cours de sécurité dans l'onglet **"Mes cours"**.*`;
  } else if (normPrompt.includes("data") || normPrompt.includes("python") || normPrompt.includes("science")) {
    reply += `
### Fondations de la Data Science & Machine Learning :
Utilisez Python et ses librairies d'analyse de données pour tirer parti des informations cachées :

- **Pandas & NumPy** : Idéal pour nettoyer et manipuler vos structures de données.
- **Scikit-Learn** : Permet de concevoir des modèles de prédiction simples et avancés.
- **Visualisation** : Pratiquez avec Matplotlib ou Seaborn pour illustrer vos résultats.

*Avez-vous complété le module de Data Science disponible pour valider vos compétences ?*`;
  } else if (normPrompt.includes("sql") || normPrompt.includes("base de données") || normPrompt.includes("database") || normPrompt.includes("postgresql") || normPrompt.includes("mysql") || normPrompt.includes("mongodb")) {
    reply += `
### Modélisation & Gestion de Bases de Données (SQL) :
Une bonne structuration des données est le cœur de toute application stable :

1. **Relationnelle (PostgreSQL, MySQL)** : Idéale pour des structures de données complexes et unifiées. Utilisez des clés primaires (\`PRIMARY KEY\`) et étrangères (\`FOREIGN KEY\`) pour maintenir l'intégrité référentielle.
2. **NoSQL (MongoDB, Redis)** : Parfait pour le stockage de documents JSON hautement flexibles et performants à grande échelle.
3. **Exemple de requête SQL essentielle** :
   \`\`\`sql
   SELECT u.username, COUNT(c.id) AS cours_valides
   FROM users u
   LEFT JOIN user_courses c ON u.id = c.user_id AND c.completed = true
   GROUP BY u.id;
   \`\`\`

*Conseil de l'Université CFA : Pensez toujours à indexer vos colonnes de recherche fréquentes pour optimiser les performances de requêtes !*`;
  } else if (normPrompt.includes("design") || normPrompt.includes("ui") || normPrompt.includes("ux") || normPrompt.includes("figma") || normPrompt.includes("maquette")) {
    reply += `
### Design d'Interface (UI) / Expérience Utilisateur (UX) :
Une application technique doit avant tout offrir un usage fluide et agréable :

- **UX (Louis Sullivan)** : *"Form follows function"*. Simplifiez le parcours de vos utilisateurs. Moins il y a de clics pour arriver à l'action principale, meilleur sera le taux d'engagement.
- **UI (Esthétique)** : Respectez une grille de mise en page stricte (grille de 8px), maintenez un haut niveau de contraste (norme WCAG AA) et limitez votre palette chromatique à 3 couleurs majeures (60% couleur dominante, 30% neutre, 10% d'accent).
- **Figma** : Maîtrisez le système d'Auto-Layout et les bibliothèques de composants partagés pour accélérer vos phases de prototypage interactif.`;
  } else if (normPrompt.includes("projet") || normPrompt.includes("agile") || normPrompt.includes("scrum") || normPrompt.includes("planif") || normPrompt.includes("gantt") || normPrompt.includes("trello") || normPrompt.includes("kanban")) {
    reply += `
### Gestion de Projet & Méthodes Agiles (Scrum/Kanban) :
La réussite d'un livrable technique repose sur une organisation rigoureuse :

- **Méthode Scrum** : Découpez votre projet par itérations appelées *Sprints* (souvent de 2 semaines). Organisez chaque jour un *Daily Standup* de 15 minutes max pour aligner l'équipe de développement.
- **Visualisation Kanban** : Utilisez un tableau visuel (À faire, En cours, À tester, Terminé) comme Trello, Jira ou GitHub Projects pour suivre l'avancement en temps réel de vos tâches et limiter le cumul des tâches en cours (WIP).
- **Rôle d'Alternant** : Soyez proactif, rapportez les points de blocage le plus tôt possible lors de la planification pour éviter l'effet "tunnel".`;
  } else if (normPrompt.includes("cv") || normPrompt.includes("lettre") || normPrompt.includes("entretien") || normPrompt.includes("recrute") || normPrompt.includes("embauche") || normPrompt.includes("emploi") || normPrompt.includes("postuler")) {
    reply += `
### Réussir son Recrutement & Conseils de Carrière :
Trouver votre future alternance ou décrocher un premier emploi nécessite une stratégie ciblée :

1. **Le CV Technique** : Mettez en avant vos projets réels (liens GitHub en direct, démos de vos sites sous Vite), les technologies maîtrisées (React, Node, SQL) plutôt que des barres de progression de compétences trop vagues.
2. **Entretien de Motivation** : Renseignez-vous scrupuleusement sur l'entreprise avant l'entretien (leurs produits, leurs valeurs, leurs concurrents). Présentez votre parcours avec la méthode Star (Situation, Tâche, Action, Résultat).
3. **Réseautage** : Soignez votre profil LinkedIn, publiez régulièrement des retours d'expérience sur ce que vous apprenez à l'Université CFA, et soyez actif dans la communauté open source !`;
  } else if (normPrompt.includes("anglais") || normPrompt.includes("toeic") || normPrompt.includes("english") || normPrompt.includes("langue")) {
    reply += `
### Anglais Professionnel & Anglais Technique (IT) :
Dans les métiers du numérique et du management, la maîtrise de l'anglais est indispensable :

- **Vocabulaire clé** :
  - *To debug* : Résoudre des bugs.
  - *A bottleneck* : Un goulot d'étranglement (perte de performance, blockage).
  - *Trade-off* : Compromis (choix de conception technique).
  - *To scale* : Passer à l'échelle (absorber plus de trafic).
- **Préparation du TOEIC** : Pratiquez la compréhension écrite en lisant les documentations officielles de React, Node, SQL en version originale. Pour l'écoute, privilégiez les podcasts technologiques de 15 minutes par jour ! `;
  } else if (normPrompt.includes("ia ") || normPrompt.includes("intelligence artificielle") || normPrompt.includes("deep") || normPrompt.includes("nlp") || normPrompt.includes("llm") || normPrompt.includes("prompt") || normPrompt.includes("gemini")) {
    reply += `
### L'Intelligence Artificielle & Générative (LLM / Gemini) :
L'IA redéfinit radicalement les méthodes de travail et d'apprentissage :

- **Modèles de Langage (LLM)** : Ces systèmes (comme Gemini 3.5 Flash) prédisent le mot suivant en fonction d'un contexte colossal de connaissances acquises.
- **L'Art du Prompting (Ingénierie de requête)** :
  1. *Rôle* : "Agis en tant que développeur React sénior..."
  2. *Contexte* : "Je conçois un bouton accessible..."
  3. *Tâche claire* : "Génère un composant avec le support de l'attribut aria-label..."
  4. *Format* : "Donne-moi le code commenté avec des explications d'intégration en 3 puces."
- **Co-Pilote de Code** : Utilisez l'IA pour comprendre des portions de codes complexes ou générer des jeux d'essais unitaires, mais gardez toujours un esprit critique sur le résultat !`;
  } else if (normPrompt.includes("math") || normPrompt.includes("statistique") || normPrompt.includes("probabilité") || normPrompt.includes("algèbre") || normPrompt.includes("calcul")) {
    reply += `
### Mathématiques Appliquées & Modélisation Algorithmique :
Les algorithmes d'optimisation, de sécurité et d'IA reposent sur des bases mathématiques solides :

- **Algèbre Linéaire** : Les matrices et vecteurs sont essentiels pour comprendre les transformations de données 2D/3D et l'apprentissage profond (Deep Learning).
- **Statistiques & Probabilités** : Utilisées pour valider un test A/B en marketing digital, évaluer les marges d'erreur de prédictions énergétiques, ou détecter des anomalies de réseau suspectes en cybersécurité.
- **Complexité Big O** : Analysez l'efficacité temporelle ou spatiale de vos algorithmes. Par exemple, une recherche binaire a une complexité de \`O(log n)\`, ce qui est infiniment plus rapide qu'une recherche linéaire de \`O(n)\` sur de très grands tableaux.`;
  } else if (normPrompt.includes("formation") || normPrompt.includes("cours")) {
    reply += `
### Vos formations disponibles en 2026 :
Le CFA de l'Université vous propose des parcours professionnalisants avec un taux d'insertion d'exception (95%) :

- 💻 **Développement Web** (React, Node, Express)
- 📊 **Marketing Digital & SEO**
- 🔒 **Cybersécurité** (Protect, triade CIA)
- 📈 **Data Science** (Python, Machine Learning)

Vous pouvez accéder au détail complet et valider vos cours de n'importe où via l'onglet **"Mes cours"**.`;
  } else {
    reply += `
### Comment puis-je vous aider aujourd'hui ?
En tant que tuteur intelligent développé pour l'**Université CFA**, j'excelle à répondre à toutes vos interrogations. Que ce soit sur un sujet académique ou professionnel, je suis là pour vous :

- 👨‍💻 **Programmation & Dev** : JavaScript moderne, React, Node.js, Express.
- 📈 **Marketing & SEO** : Référencement naturel, visibilité web, contenu de marque.
- 🏢 **Pratique en Alternance** : Relation tuteur, convention d'alternance, relevés d'heures.
- 🔒 **Cybersécurité & Data Science** : Modèle CIA, protection réseau, analyses de données.

*À propos de votre question :* votre message semble porter sur un sujet d'intérêt général ou interdisciplinaire ! N'hésitez pas à préciser si vous souhaitez un exemple concret, une réexplication pédagogique pas à pas d'un concept particulier, ou une aide d'organisation d'études.`;
  }
  res.json({ reply });
};
