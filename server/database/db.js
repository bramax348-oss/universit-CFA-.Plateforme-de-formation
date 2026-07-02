import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), "db_store.json");

export const StudyModule = {
  WEB: "web",
  MARKETING: "marketing",
  SECURITE: "securite",
  DATA: "data"
};

export function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to db_store.json:", err);
  }
}

export function readDB() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    } catch (err) {
      console.error("Error reading db_store.json, using seed data", err);
    }
  }
  const seed = {
    courses: [
      {
        id: "c1",
        title: "Introduction à JavaScript & ES6",
        module: StudyModule.WEB,
        description: "Apprenez les bases de JavaScript moderne, les variables, boucles en ES6+.",
        content: `
          <h3>Bienvenue dans l'univers de JavaScript !</h3>
          <p>JavaScript est le langage de programmation du web. Il donne vie aux pages en ajoutant de l'interactivité.</p>
          <br/>
          <h4>Concepts clés abordés :</h4>
          <ul class="list-disc pl-5 my-2">
            <li><strong>let et const :</strong> Les nouvelles variables ES6 qui remplacent var avec une notion de portée bloc (block scoped).</li>
            <li><strong>Fonctions fléchées (Arrow Functions) :</strong> Une syntaxe courte pour déclarer des fonctions : <code>const somme = (a, b) =&gt; a + b;</code></li>
            <li><strong>Template Literals :</strong> L'écriture simplifiée de chaînes de caractères avec des expressions via les accents graves : <code>\`Bonjour \${nom}\`</code>.</li>
          </ul>
          <br/>
          <p>Ce cours vous permettra de jeter les bases solides indispensables pour la programmation de frameworks modernes tels que React.js.</p>
        `,
        duration: 3,
        author: "Mme Sophie Bernard",
        createdAt: new Date().toISOString(),
        completedBy: []
      },
      {
        id: "c2",
        title: "Maîtriser les Composants et Hooks React",
        module: StudyModule.WEB,
        description: "Comprenez la gestion d'état locale avec useState, et les cycles de vie avec useEffect.",
        content: `
          <h3>Rentrez dans l'ère de React !</h3>
          <p>React est la bibliothèque JavaScript la plus populaire développée par Facebook pour concevoir des interfaces utilisateur par composants réutilisables.</p>
          <br/>
          <h4>Les deux piliers de vos composants :</h4>
          <ul class="list-disc pl-5 my-2">
            <li><strong>Le State (useState) :</strong> Représente l'état local variable de votre interface. En changeant d'état, React redessine automatiquement les éléments modifiés !</li>
            <li><strong>Les Props :</strong> Des paramètres passés aux composants de haut en bas, immuables de l'intérieur de l'enfant.</li>
          </ul>
          <br/>
          <h4>Le Hook useEffect d'évitement d'effets secondaires :</h4>
          <p>Permet d'exécuter du code à l'apparition, la disparition ou le changement de dépendances dans un composant (comme un appel API ou la synchronisation de données).</p>
        `,
        duration: 5,
        author: "Mme Sophie Bernard",
        createdAt: new Date().toISOString(),
        completedBy: []
      },
      {
        id: "c3",
        title: "Introduction de base au Marketing Digital & SEO",
        module: StudyModule.MARKETING,
        description: "Optimisez la visibilité d'un site sur les moteurs de recherche via le référencement naturel.",
        content: `
          <h3>Qu'est-ce que le SEO ?</h3>
          <p>Le SEO (Search Engine Optimization) consiste à positionner les pages d'un site web dans les premiers résultats naturels des moteurs de recherche (Google, Bing).</p>
          <br/>
          <h4>Les 3 piliers du référencement naturel :</h4>
          <ol class="list-decimal pl-5 my-2">
            <li><strong>La Technique :</strong> Vitesse de chargement de la page, optimisation mobile et propreté du code HTML.</li>
            <li><strong>Le Contenu :</strong> Des mots-clés piquants, bien structurés avec des balises h1, h2, h3 et répondant fidèlement aux intentions de recherche des internautes.</li>
            <li><strong>Le Netlinking :</strong> La popularité globale acquise par des liens de qualité provenant d'autres sites vers le vôtre.</li>
          </ol>
        `,
        duration: 4,
        author: "M. Kevine",
        createdAt: new Date().toISOString(),
        completedBy: []
      },
      {
        id: "c4",
        title: "Principes fondateurs de la Cybersécurité",
        module: StudyModule.SECURITE,
        description: "Découvrez les bases de la sécurisation des applications, cryptage et pare-feux.",
        content: `
          <h3>Introduction à la sécurité de l'information</h3>
          <p>La cybersécurité consiste à protéger les ordinateurs, réseaux, programmes et données contre les attaques de tierces personnes malveillantes.</p>
          <br/>
          <h4>La Triade CIA (Confientialité, Intégrité, Disponibilité) :</h4>
          <ul class="list-disc pl-5 my-2">
            <li><strong>Confidentialité :</strong> Prévenir l'exposition de données sensibles à des personnes non autorisées.</li>
            <li><strong>Intégrité :</strong> S'assurer que les données ne soient pas altérées ou corrompues en transit.</li>
            <li><strong>Disponibilité :</strong> Garantir l'accès légitime et continu des utilisateurs à leurs systèmes.</li>
          </ul>
        `,
        duration: 4,
        author: "M. Pierre Martin",
        createdAt: new Date().toISOString(),
        completedBy: []
      }
    ],
    exercises: [
      {
        id: "ex1",
        title: "Création d'une fonction ES6 de calcul",
        module: StudyModule.WEB,
        statement: "Écrivez une fonction fléchée JavaScript nommée 'calculerRemise' prenant en paramètres un prix brut (nombre) et un taux de remise en pourcentage (ex: 20 pour 20%), et retournant le prix net final calculé.",
        hint: "Formule: prixBrut - (prixBrut * (taux / 100))",
        solution: "const calculerRemise = (prixBrut, taux) => prixBrut * (1 - taux / 100);",
        difficulty: "debutant",
        time: 15,
        author: "Mme Sophie Bernard",
        createdAt: new Date().toISOString(),
        completedBy: []
      },
      {
        id: "ex2",
        title: "Instanciation de State dans React",
        module: StudyModule.WEB,
        statement: "Écrivez le code React d'un composant simple appelé 'Compteur' avec un bouton. Chaque clic sur le bouton doit incrémenter un compteur local de 1 et l'afficher à l'écran.",
        hint: "Utilisez le hook useState initialisé à 0, et l'événement onClick.",
        solution: "const [compteur, setCompteur] = useState(0);\n// Dans le JSX:\n<button onClick={() => setCompteur(compteur + 1)}>Total: {compteur}</button>",
        difficulty: "intermediaire",
        time: 25,
        author: "Mme Sophie Bernard",
        createdAt: new Date().toISOString(),
        completedBy: []
      },
      {
        id: "ex3",
        title: "Balise Alt : Alt-text check",
        module: StudyModule.MARKETING,
        statement: "Quelle propriété sur une balise d'image HTML <img> est absolument indispensable pour l'accessibilité SEO ?",
        hint: "Elle fournit une description textuelle de l'image pour les robots Google et synthétiseurs vocaux.",
        solution: "L'attribut alt (ex: <img src='logo.png' alt='Logo de notre école Université CFA'>)",
        difficulty: "debutant",
        time: 10,
        author: "M. Kevine",
        createdAt: new Date().toISOString(),
        completedBy: []
      }
    ],
    videos: [
      {
        id: "v1",
        title: "Les Bases Absolues de JavaScript Moderne",
        module: StudyModule.WEB,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Une vidéo courte expliquant comment l'interactivité s'implémente en HTML et JS.",
        duration: 12,
        prerequisites: "Avoir écrit ses premières lignes de HTML & CSS",
        author: "Mme Sophie Bernard",
        createdAt: new Date().toISOString(),
        completedBy: []
      },
      {
        id: "v2",
        title: "React de zéro en 15 minutes",
        module: StudyModule.WEB,
        url: "https://www.youtube.com/embed/Ke90Tje7VS0",
        description: "Guide condensé pour installer, initialiser et composer ses premières vues virtuelles en React.js.",
        duration: 15,
        prerequisites: "JavaScript ES6 (variables, objets, fonctions, maps)",
        author: "Mme Sophie Bernard",
        createdAt: new Date().toISOString(),
        completedBy: []
      }
    ],
    stats: {
      username: "etudiant",
      hoursDone: 127,
      hoursTotal: 350,
      validatedModules: 4,
      maxModules: 12,
      companyName: "TechSolutions International",
      tutorName: "M. Martin Dubois",
      nextCourse: "Développement Web Avancé (Mme Sophie Bernard)",
      courseLocation: "Salle Informatique B205, Bâtiment d'Ingénierie",
      activities: [
        { id: "act1", text: "Exercice 'Création d'une fonction ES6 de calcul' complété", date: "il y a 2 heures", icon: "check" },
        { id: "act2", text: "Validation des heures de tutorat en entreprise (+7h effectives)", date: "Hier", icon: "plus" },
        { id: "act3", text: "Participation au forum de discussion générale", date: "il y a 3 jours", icon: "message" }
      ]
    },
    messages: [
      {
        id: "m1",
        from: "formateur_web",
        to: "etudiant",
        content: "Bonjour ! J'ai bien reçu votre premier exercice. Excellent travail ! Vous avez utilisé de manière parfaite les fonctions fléchées ES6. N'hésitez pas à attaquer le module React dès demain.",
        timestamp: "2026-06-10T14:30:00.000Z",
        subject: "Félicitations sur votre exercice",
        fromName: "Mme Sophie Bernard",
        fromRole: "formateur"
      },
      {
        id: "m2",
        from: "formateur_principal",
        to: "etudiant",
        content: "Avis à tous les apprentis, n'oubliez pas de déposer vos rapports mensuels d'alternance signés par vos tuteurs avant la fin de la semaine.",
        timestamp: "2026-06-09T09:15:00.000Z",
        subject: "Rappel : Rapports mensuels obligatoires",
        fromName: "M. Bernard (Directeur Pédagogique)",
        fromRole: "formateur"
      }
    ],
    contacts: [],
    candidacies: []
  };
  writeDB(seed);
  return seed;
}

export const db = readDB();
