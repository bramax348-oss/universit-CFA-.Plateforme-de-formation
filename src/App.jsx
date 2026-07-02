import { useState, useEffect } from "react";
import Footer from "./components/Footer.jsx";
import { apiService } from "./services/api.js";
import {
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  Bot,
  LogOut,
  Plus,
  Search,
  CheckCircle2,
  Building2,
  Calendar,
  Bell,
  Trash2,
  HelpCircle,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  Code,
  AlertCircle,
  Info,
  Star,
  Users,
  Check,
  UserCheck,
  Shield,
  Receipt,
  Lock,
  Key,
  Eye,
  EyeOff,
  Zap,
  FileCheck,
  Save,
  Edit3,
  Printer
} from "lucide-react";
export default function App() {
  const [isLaunching, setIsLaunching] = useState(true);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [activeTab, _setActiveTab] = useState("accueil");
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("cfa_username") || "etudiant";
  });
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem("cfa_userRole");
    return saved || "etudiant";
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("cfa_isLoggedIn") === "true";
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("etudiant");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupRole, setSignupRole] = useState("etudiant");
  const [signupError, setSignupError] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem("cfa_registered_users");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
      }
    }
    const defaults = [
      { username: " Mr kevine Marinot", password: "password", role: "etudiant" },
      { username: "RASANDIARIMANANA Kevin ", password: "password", role: "admin" }
    ];
    localStorage.setItem("cfa_registered_users", JSON.stringify(defaults));
    return defaults;
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem("cfa_username") || "etudiant";
  });
  const [profileEmail, setProfileEmail] = useState(() => {
    return localStorage.getItem("cfa_profile_email") || "";
  });
  const [profilePhone, setProfilePhone] = useState(() => {
    return localStorage.getItem("cfa_profile_phone") || "06 12 34 56 78";
  });
  const [profileSpecialty, setProfileSpecialty] = useState(() => {
    return localStorage.getItem("cfa_profile_specialty") || "";
  });
  useEffect(() => {
    setProfileName(username);
    if (!localStorage.getItem("cfa_profile_email")) {
      setProfileEmail(userRole === "admin" ? "directeur.kevine@universitecfa.fr" : "Marinot@universitecfa.fr");
    } else {
      setProfileEmail(localStorage.getItem("cfa_profile_email") || "");
    }
    if (!localStorage.getItem("cfa_profile_specialty")) {
      setProfileSpecialty(userRole === "admin" ? "Directeur des Études • Tout le Bâtiment " : "Parcours Ingénierie & Développement Web en Alternance 2026");
    } else {
      setProfileSpecialty(localStorage.getItem("cfa_profile_specialty") || "");
    }
  }, [username, userRole]);

  useEffect(() => {
    if (!isLaunching) return;
    const interval = setInterval(() => {
      setLaunchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const timer = setTimeout(() => {
            setIsLaunching(false);
          }, 800);
          return 100;
        }
        return prev + 4;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [isLaunching]);
  const handleSaveProfile = (newName, newEmail, newPhone, newSpecialty) => {
    if (!newName.trim()) {
      triggerNotification("Le nom ne peut pas être vide.");
      return;
    }
    const nameExists = registeredUsers.some(
      (u) => u.username.toLowerCase() === newName.trim().toLowerCase() && u.username.toLowerCase() !== username.toLowerCase()
    );
    if (nameExists) {
      triggerNotification("Ce nom d'utilisateur est déjà utilisé par un autre compte.");
      return;
    }
    const updatedUsers = registeredUsers.map((u) => {
      if (u.username.toLowerCase() === username.toLowerCase()) {
        return { ...u, username: newName.trim() };
      }
      return u;
    });
    setRegisteredUsers(updatedUsers);
    localStorage.setItem("cfa_registered_users", JSON.stringify(updatedUsers));
    setUsername(newName.trim());
    localStorage.setItem("cfa_username", newName.trim());
    setProfileName(newName.trim());
    setProfileEmail(newEmail.trim());
    setProfilePhone(newPhone.trim());
    setProfileSpecialty(newSpecialty.trim());
    localStorage.setItem("cfa_profile_email", newEmail.trim());
    localStorage.setItem("cfa_profile_phone", newPhone.trim());
    localStorage.setItem("cfa_profile_specialty", newSpecialty.trim());
    setIsEditingProfile(false);
    triggerNotification("Informations de profil mises à jour avec succès !");
  };
  const handlePrintAttestation = (att) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Attestation Administrative - ${att.reference}</title>
            <style>
              body {
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                margin: 0;
                padding: 40px;
                color: #1e293b;
                background-color: white;
              }
              .border-container {
                border: 6px double #065f46;
                padding: 40px;
                text-align: center;
                background-color: #f8fafc;
                max-width: 800px;
                margin: 0 auto;
                box-sizing: border-box;
              }
              .logo {
                font-size: 28px;
                font-weight: 900;
                color: #065f46;
                letter-spacing: -0.05em;
                margin-bottom: 2px;
                text-transform: uppercase;
              }
              .tagline {
                font-size: 10px;
                font-family: monospace;
                letter-spacing: 0.1em;
                color: #64748b;
                margin-bottom: 25px;
              }
              .divider {
                width: 150px;
                height: 3px;
                background-color: #065f46;
                margin: 0 auto 30px;
              }
              .doc-title {
                font-family: Georgia, Cambria, "Times New Roman", Times, serif;
                font-style: italic;
                font-size: 22px;
                font-weight: bold;
                color: #0f172a;
                margin-bottom: 30px;
                line-height: 1.3;
              }
              .body-paragraph {
                color: #334155;
                font-size: 14px;
                line-height: 1.8;
                max-width: 600px;
                margin: 0 auto 20px;
              }
              .student-name {
                font-size: 24px;
                font-weight: 900;
                color: #0f172a;
                margin: 20px 0;
                letter-spacing: -0.02em;
              }
              .course-title {
                font-weight: bold;
                color: #065f46;
                font-size: 16px;
                margin: 15px 0;
              }
              .footer-grid {
                display: grid;
                grid-template-cols: 1fr 1fr;
                gap: 20px;
                margin-top: 50px;
                padding-top: 30px;
                border-top: 1px solid #e2e8f0;
                text-align: left;
                font-size: 11px;
              }
              .footer-left {
                text-align: left;
              }
              .footer-right {
                text-align: right;
              }
              .meta-label {
                color: #94a3b8;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 9px;
                letter-spacing: 0.05em;
                margin-bottom: 4px;
              }
              .meta-val {
                font-weight: bold;
                color: #475569;
                font-family: monospace;
              }
              .sig-title {
                font-family: Georgia, serif;
                font-style: italic;
                font-weight: bold;
                color: #1e293b;
                margin-top: 5px;
              }
              .sig-stamp {
                color: #047857;
                font-family: monospace;
                font-weight: bold;
                font-size: 10px;
                margin-top: 10px;
              }
              .btn-print {
                display: block;
                width: 100%;
                max-width: 200px;
                margin: 35px auto 0;
                background-color: #10b981;
                color: white;
                border: none;
                padding: 10px 15px;
                font-weight: bold;
                border-radius: 8px;
                cursor: pointer;
                text-align: center;
              }
              @media print {
                .btn-print {
                  display: none;
                }
                body {
                  padding: 10px;
                }
              }
            </style>
          </head>
          <body>
            <div class="border-container">
              <div class="logo">Université CFA </div>
              <div class="tagline">ÉTABLISSEMENT D'ENSEIGNEMENT SUPÉRIEUR ET ALTERNANCE AGRÉÉ</div>
              <div class="divider"></div>
              
              <div class="doc-title">ATTESTATION ADMINISTRATIVE D'ASSIDUITÉ ET DE RÉUSSITE</div>
              
              <div class="body-paragraph">
                Par la présente, la direction de l'Université CFA certifie sous le sceau de l'école que l'apprenti(e) :
              </div>
              
              <div class="student-name">${att.studentName}</div>
              
              <div class="body-paragraph">
                A suivi et validé avec assiduité et succès son enseignement théorique et académique rattaché aux modules de :
              </div>
              
              <div class="course-title">${att.courseTitle}</div>
              
              <div class="body-paragraph">
                L'élève a validé un total agrégé de <strong>${att.hoursDone} heures</strong> d'ateliers professionnels, ainsi que l'ensemble des livrables requis dans notre référentiel 2026.
              </div>
              
              <div class="footer-grid">
                <div class="footer-left">
                  <div class="meta-label">Référence d'enregistrement</div>
                  <div class="meta-val">${att.reference}</div>
                  <div style="color: #64748b; margin-top: 5px;">Généré le: ${att.dateGenerated}</div>
                </div>
                <div class="footer-right">
                  <div class="meta-label">Le Directeur Pédagogique</div>
                  <div class="sig-title">RASANDIARIMANANA Kevin</div>
                  <div class="sig-stamp">✔ SIGNÉ ÉLECTRONIQUEMENT</div>
                </div>
              </div>
            </div>
            
            <button class="btn-print" onclick="window.print()">Imprimer l'Attestation</button>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              }
            <\/script>
          </body>
        </html>
      `);
      printWindow.document.close();
      triggerNotification("Impression de l'attestation démarrée !");
    } else {
      triggerNotification("Bloqueur de pop-up détecté. Veuillez autoriser les fenêtres pop-up.");
    }
  };
  const handlePrintReceipt = (receipt) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Reçu Fiscal - ${receipt.id}</title>
            <style>
              body {
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                margin: 0;
                padding: 40px;
                color: #1e293b;
                background-color: white;
              }
              .receipt-container {
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 30px;
                background-color: #f8fafc;
                max-width: 600px;
                margin: 0 auto;
                box-sizing: border-box;
              }
              .header {
                display: flex;
                justify-content: space-between;
                border-bottom: 2px dashed #cbd5e1;
                padding-bottom: 20px;
                margin-bottom: 20px;
              }
              .title {
                font-weight: 900;
                font-size: 18px;
                color: #0f172a;
              }
              .subtitle {
                font-size: 11px;
                color: #64748b;
              }
              .doc-type {
                font-weight: bold;
                font-size: 13px;
                color: #0f172a;
                text-align: right;
              }
              .doc-id {
                font-size: 11px;
                color: #065f46;
                background-color: #d1fae5;
                padding: 4px 8px;
                border-radius: 6px;
                font-weight: bold;
                display: inline-block;
                margin-top: 4px;
                font-family: monospace;
              }
              .row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                font-size: 13px;
              }
              .label {
                color: #64748b;
              }
              .value {
                font-weight: bold;
                color: #0f172a;
              }
              .total-row {
                border-top: 2px dashed #cbd5e1;
                padding-top: 15px;
                margin-top: 20px;
                font-size: 16px;
              }
              .btn-print {
                display: block;
                width: 100%;
                max-width: 200px;
                margin: 30px auto 0;
                background-color: #10b981;
                color: white;
                border: none;
                padding: 10px 15px;
                font-weight: bold;
                border-radius: 8px;
                cursor: pointer;
                text-align: center;
              }
              @media print {
                .btn-print {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="receipt-container">
              <div class="header">
                <div>
                  <div class="title">UNIVERSITÉ CFA</div>
                  <div class="subtitle">SIRET: 894 112 003 4402 - Paris, France</div>
                </div>
                <div style="text-align: right;">
                  <div class="doc-type">REÇU FISCAL</div>
                  <div class="doc-id">${receipt.id}</div>
                </div>
              </div>
              
              <div class="row">
                <span class="label">Date d'émission :</span>
                <span class="value">${receipt.date}</span>
              </div>
              <div class="row">
                <span class="label">Pour l'apprenti :</span>
                <span class="value">${receipt.studentName}</span>
              </div>
              <div class="row">
                <span class="label">Débiteur (Organisme) :</span>
                <span class="value">${receipt.opco}</span>
              </div>
              <div class="row">
                <span class="label">Moyen de règlement :</span>
                <span class="value">${receipt.method}</span>
              </div>
              
              <div class="row total-row">
                <span class="label" style="font-weight: bold; color: #475569;">Total Encaissé :</span>
                <span class="value" style="color: #065f46; font-size: 16px;">${(receipt.amount * 5e3).toLocaleString("fr-FR")} MGA (${receipt.amount.toLocaleString("fr-FR")} &euro;)</span>
              </div>
              
              <div style="background-color: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 10px; color: #64748b; line-height: 1.5; margin-top: 25px;">
                Université CFA France certifie avoir perçu les fonds susmentionnés au titre du financement de la scolarité de l'apprenti, conformément à la convention d'études 2026. Ce reçu a valeur de décharge libératoire pour l'exercice fiscal concerné.
              </div>
            </div>
            
            <button class="btn-print" onclick="window.print()">Imprimer le Reçu</button>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              }
            <\/script>
          </body>
        </html>
      `);
      printWindow.document.close();
      triggerNotification("Impression du reçu démarrée !");
    } else {
      triggerNotification("Bloqueur de pop-up détecté. Veuillez autoriser les fenêtres pop-up.");
    }
  };
  const [attestations, setAttestations] = useState(() => {
    const saved = localStorage.getItem("cfa_attestations");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
      }
    }
    return [
      {
        id: "at1",
        studentName: "kevine",
        courseTitle: "Développement Web Fullstack",
        hoursDone: 322,
        hoursRequired: 350,
        validatedModules: 8,
        status: "genere",
        reference: "ATT-2026-WEB-042",
        dateGenerated: "10/06/2026"
      },
      {
        id: "at2",
        studentName: "Alice",
        courseTitle: "Master Marketing Digital & SEO",
        hoursDone: 280,
        hoursRequired: 350,
        validatedModules: 10,
        status: "eligible",
        reference: "ATT-2026-MKT-019"
      },
      {
        id: "at3",
        studentName: "Mendrika",
        courseTitle: "BSc Expert Cybersécurité",
        hoursDone: 85,
        hoursRequired: 350,
        validatedModules: 2,
        status: "insuffisant",
        reference: "ATT-2026-CYB-004"
      }
    ];
  });
  const [selectedAttestation, setSelectedAttestation] = useState(null);
  const [receipts, setReceipts] = useState(() => {
    const saved = localStorage.getItem("cfa_receipts");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
      }
    }
    return [
      {
        id: "RE-2026-101",
        date: "2026-03-12",
        studentName: "Kevine",
        opco: "OPCO Atlas",
        amount: 8400,
        method: "Virement Bancaire SEPA",
        status: "paye"
      },
      {
        id: "RE-2026-102",
        date: "2026-04-18",
        studentName: "Alice ",
        opco: "OPCO Mobilités",
        amount: 9600,
        method: "Prélèvement OPCO",
        status: "paye"
      },
      {
        id: "RE-2026-103",
        date: "2026-05-30",
        studentName: "Mendrika",
        opco: "OPCO Atlas (En attente)",
        amount: 4500,
        method: "Virement Bancaire SEPA",
        status: "en_attente"
      }
    ];
  });
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [newRecStudent, setNewRecStudent] = useState("");
  const [newRecOpco, setNewRecOpco] = useState("");
  const [newRecAmount, setNewRecAmount] = useState("");
  const [newRecMethod, setNewRecMethod] = useState("Virement Bancaire SEPA");
  const [courses, setCourses] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [videos, setVideos] = useState([]);
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseAnswer, setExerciseAnswer] = useState("");
  const [exerciseResult, setExerciseResult] = useState(null);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseModule, setNewCourseModule] = useState("web");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [newCourseContent, setNewCourseContent] = useState("");
  const [newCourseDuration, setNewCourseDuration] = useState("");
  const [newCourseAuthor, setNewCourseAuthor] = useState("Mr Haja");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editCourseTitle, setEditCourseTitle] = useState("");
  const [editCourseModule, setEditCourseModule] = useState("");
  const [editCourseDesc, setEditCourseDesc] = useState("");
  const [editCourseContent, setEditCourseContent] = useState("");
  const [editCourseDuration, setEditCourseDuration] = useState("");
  const [editCourseAuthor, setEditCourseAuthor] = useState("");
  const [attEditingId, setAttEditingId] = useState(null);
  const [attShowForm, setAttShowForm] = useState(false);
  const [attFormStudentName, setAttFormStudentName] = useState("");
  const [attFormCourseTitle, setAttFormCourseTitle] = useState("");
  const [attFormHoursDone, setAttFormHoursDone] = useState("");
  const [attFormHoursRequired, setAttFormHoursRequired] = useState("350");
  const [attFormValidatedModules, setAttFormValidatedModules] = useState("");
  const [attFormStatus, setAttFormStatus] = useState("genere");
  const [attFormReference, setAttFormReference] = useState("");
  const [attFormDateGenerated, setAttFormDateGenerated] = useState("");
  const [recEditingId, setRecEditingId] = useState(null);
  const [recShowForm, setRecShowForm] = useState(false);
  const [recFormStudentName, setRecFormStudentName] = useState("");
  const [recFormOpco, setRecFormOpco] = useState("");
  const [recFormAmount, setRecFormAmount] = useState("");
  const [recFormMethod, setRecFormMethod] = useState("Virement Bancaire SEPA");
  const [recFormStatus, setRecFormStatus] = useState("paye");
  const [recFormDate, setRecFormDate] = useState("");
  const [newExTitle, setNewExTitle] = useState("");
  const [newExModule, setNewExModule] = useState("web");
  const [newExStatement, setNewExStatement] = useState("");
  const [newExHint, setNewExHint] = useState("");
  const [newExSolution, setNewExSolution] = useState("");
  const [newExDifficulty, setNewExDifficulty] = useState("debutant");
  const [newExTime, setNewExTime] = useState("");
  const [newVidTitle, setNewVidTitle] = useState("");
  const [newVidModule, setNewVidModule] = useState("web");
  const [newVidUrl, setNewVidUrl] = useState("");
  const [newVidDesc, setNewVidDesc] = useState("");
  const [newVidDuration, setNewVidDuration] = useState("");
  const [newVidPrereq, setNewVidPrereq] = useState("");
  const [activeChatChannel, setActiveChatChannel] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [newConvOpen, setNewConvOpen] = useState(false);
  const [newConvTo, setNewConvTo] = useState("");
  const [newConvSubject, setNewConvSubject] = useState("");
  const [newConvFirstMsg, setNewConvFirstMsg] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      sender: "bot",
      text: "Bonjour ! Je suis l'assistant pédagogique  d'Université CFA. Posez-moi vos questions sur le JavaScript, React, le SEO, ou encore l'alternance !",
      time: "08:00"
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [candidacyName, setCandidacyName] = useState("");
  const [candidacyEmail, setCandidacyEmail] = useState("");
  const [candidacyPhone, setCandidacyPhone] = useState("");
  const [candidacySuccess, setCandidacySuccess] = useState(null);
  const [enrollStudentName, setEnrollStudentName] = useState("");
  const [enrollStudentPassword, setEnrollStudentPassword] = useState("");
  const [enrollStudentEmail, setEnrollStudentEmail] = useState("");
  const [enrollStudentError, setEnrollStudentError] = useState("");
  const [globalNotif, setGlobalNotif] = useState(null);
  const [trainerTab, setTrainerTab] = useState("cours");
  const [selectedEnrollmentStudent, setSelectedEnrollmentStudent] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("2026-06-11");
  const [attendanceSession, setAttendanceSession] = useState("Cours Collectif - Matin");
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem("cfa_attendance_records");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: "demo-a1", studentUsername: "Marinot", date: "2026-06-11", session: "Cours Collectif - Marinot", status: "present", notes: "Volontaire et ponctuel" },
      { id: "demo-a2", studentUsername: "Angelo", date: "2026-06-10", session: "Atelier Pratique", status: "late", notes: "Retard de 15 min" },
      { id: "demo-a3", studentUsername: "Jeannot", date: "2026-06-09", session: "Cours Collectif - Jeannot", status: "present", notes: "" }
    ];
  });
  const triggerNotification = (message) => {
    setGlobalNotif(message);
    setTimeout(() => {
      setGlobalNotif(null);
    }, 4500);
  };
  const setActiveTab = (tabName) => {
    if (!localStorage.getItem("cfa_isLoggedIn") && tabName !== "accueil" && tabName !== "connexion") {
      triggerNotification("Veuillez vous authentifier pour accéder à cet espace.");
      _setActiveTab("connexion");
    } else {
      _setActiveTab(tabName);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    if (!loginUsername.trim()) {
      setLoginError("Veuillez saisir votre nom d'utilisateur.");
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError("Veuillez saisir votre mot de passe.");
      return;
    }
    const matchedUser = registeredUsers.find(
      (u) => u.username.toLowerCase() === loginUsername.trim().toLowerCase()
    );
    if (!matchedUser) {
      setLoginError("Utilisateur non trouvé. Veuillez créer un compte.");
      return;
    }
    if (matchedUser.password !== loginPassword) {
      setLoginError("Mot de passe incorrect.");
      return;
    }
    if (matchedUser.role !== loginRole) {
      setLoginError(`Ce compte est enregistré avec le rôle : ${matchedUser.role === "admin" ? "Administrateur" : "Étudiant"}.`);
      return;
    }
    setIsLoggedIn(true);
    setUserRole(matchedUser.role);
    setUsername(matchedUser.username);
    localStorage.setItem("cfa_isLoggedIn", "true");
    localStorage.setItem("cfa_userRole", matchedUser.role);
    localStorage.setItem("cfa_username", matchedUser.username);
    if (matchedUser.email) {
      setProfileEmail(matchedUser.email);
      localStorage.setItem("cfa_profile_email", matchedUser.email);
    }
    if (matchedUser.phone) {
      setProfilePhone(matchedUser.phone);
      localStorage.setItem("cfa_profile_phone", matchedUser.phone);
    }
    setLoginUsername("");
    setLoginPassword("");
    setLoginError("");
    triggerNotification(`Connexion réussie ! Bienvenue ${matchedUser.username} (${matchedUser.role === "admin" ? "Administrateur" : "Étudiant"}).`);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    setSignupError("");
    if (!signupUsername.trim()) {
      setSignupError("Veuillez saisir un nom.");
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      setSignupError("Veuillez saisir une adresse email valide.");
      return;
    }
    if (!signupPhone.trim()) {
      setSignupError("Veuillez saisir un numéro de téléphone.");
      return;
    }
    if (!signupPassword.trim()) {
      setSignupError("Veuillez saisir un mot de passe.");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Les mots de passe ne correspondent pas.");
      return;
    }
    const exists = registeredUsers.some(
      (u) => u.username.toLowerCase() === signupUsername.trim().toLowerCase()
    );
    if (exists) {
      setSignupError("Ce nom d'utilisateur est déjà utilisé.");
      return;
    }
    const newUser = {
      username: signupUsername.trim(),
      email: signupEmail.trim(),
      phone: signupPhone.trim(),
      password: signupPassword,
      role: signupRole
    };
    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem("cfa_registered_users", JSON.stringify(updated));
    setSignupUsername("");
    setSignupEmail("");
    setSignupPhone("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setSignupError("");
    setIsSignUp(false);
    setLoginUsername(newUser.username);
    setLoginRole(newUser.role);
    triggerNotification(`Compte créé avec succès pour ${newUser.username} (${newUser.role === "admin" ? "Administrateur" : "Étudiant"}) ! Vous pouvez maintenant vous connecter.`);
  };
  const handleEnrollStudent = (e) => {
    e.preventDefault();
    setEnrollStudentError("");
    if (!enrollStudentName.trim()) {
      setEnrollStudentError("Veuillez saisir le nom complet de l'étudiant.");
      return;
    }
    if (!enrollStudentPassword.trim()) {
      setEnrollStudentError("Veuillez saisir un mot de passe initial.");
      return;
    }
    const nameExists = registeredUsers.some(
      (u) => u.username.toLowerCase() === enrollStudentName.trim().toLowerCase()
    );
    if (nameExists) {
      setEnrollStudentError("Cet étudiant est déjà inscrit ou ce nom d'utilisateur existe déjà.");
      return;
    }
    const newStudent = {
      username: enrollStudentName.trim(),
      password: enrollStudentPassword.trim(),
      email: enrollStudentEmail.trim() || `${enrollStudentName.trim().toLowerCase().replace(/\s+/g, ".")}@universitecfa.fr`,
      role: "etudiant",
      dateEnrolled: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")
    };
    const updated = [...registeredUsers, newStudent];
    setRegisteredUsers(updated);
    localStorage.setItem("cfa_registered_users", JSON.stringify(updated));
    setEnrollStudentName("");
    setEnrollStudentPassword("");
    setEnrollStudentEmail("");
    triggerNotification(`Étudiant "${newStudent.username}" inscrit avec succès !`);
  };
  const handleDeleteStudent = (studentUsername) => {
    const updated = registeredUsers.filter((u) => u.username !== studentUsername);
    setRegisteredUsers(updated);
    localStorage.setItem("cfa_registered_users", JSON.stringify(updated));
    triggerNotification(`Compte de l'étudiant "${studentUsername}" supprimé.`);
  };
  const handleDeleteAttestation = (id) => {
    const updated = attestations.filter((att) => att.id !== id);
    setAttestations(updated);
    localStorage.setItem("cfa_attestations", JSON.stringify(updated));
    triggerNotification("Attestation supprimée avec succès.");
  };
  const handleDeleteReceipt = (id) => {
    const updated = receipts.filter((rec) => rec.id !== id);
    setReceipts(updated);
    localStorage.setItem("cfa_receipts", JSON.stringify(updated));
    triggerNotification("Reçu financier supprimé avec succès.");
  };
  const handleSaveAttendance = (studentUsername, status, notes) => {
    let updated = [...attendanceRecords];
    const existingIndex = updated.findIndex(
      (r) => r.studentUsername === studentUsername && r.date === attendanceDate && r.session === attendanceSession
    );
    if (existingIndex > -1) {
      updated[existingIndex] = {
        ...updated[existingIndex],
        status,
        notes: notes.trim()
      };
    } else {
      updated.push({
        id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        studentUsername,
        date: attendanceDate,
        session: attendanceSession,
        status,
        notes: notes.trim()
      });
    }
    setAttendanceRecords(updated);
    localStorage.setItem("cfa_attendance_records", JSON.stringify(updated));
    triggerNotification(`Présence enregistrée pour ${studentUsername} (${status === "present" ? "Présent" : status === "absent" ? "Absent" : "En Retard"}) !`);
  };
  const handleMarkAllPresent = () => {
    const students = registeredUsers.filter((u) => u.role === "etudiant");
    if (students.length === 0) {
      triggerNotification("Aucun étudiant à marquer présent.");
      return;
    }
    let updated = [...attendanceRecords];
    students.forEach((student) => {
      const existingIndex = updated.findIndex(
        (r) => r.studentUsername === student.username && r.date === attendanceDate && r.session === attendanceSession
      );
      if (existingIndex > -1) {
        updated[existingIndex] = {
          ...updated[existingIndex],
          status: "present"
        };
      } else {
        updated.push({
          id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          studentUsername: student.username,
          date: attendanceDate,
          session: attendanceSession,
          status: "present",
          notes: ""
        });
      }
    });
    setAttendanceRecords(updated);
    localStorage.setItem("cfa_attendance_records", JSON.stringify(updated));
    triggerNotification("Tous les étudiants enregistrés ont été marqués présents pour cette session !");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("etudiant");
    setUsername("etudiant");
    localStorage.removeItem("cfa_isLoggedIn");
    localStorage.removeItem("cfa_userRole");
    localStorage.removeItem("cfa_username");
    setActiveTab("accueil");
    triggerNotification("Vous avez été déconnecté avec succès.");
  };
  const handleAddReceipt = (e) => {
    e.preventDefault();
    if (!newRecStudent.trim() || !newRecOpco.trim() || !newRecAmount) {
      triggerNotification("Veuillez remplir correctement tous les champs du reçu financier.");
      return;
    }
    const amt = parseFloat(newRecAmount);
    if (isNaN(amt) || amt <= 0) {
      triggerNotification("Montant incorrect.");
      return;
    }
    const newReceipt = {
      id: `RE-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      studentName: newRecStudent.trim(),
      opco: newRecOpco.trim(),
      amount: amt,
      method: newRecMethod,
      status: "paye"
    };
    setReceipts([newReceipt, ...receipts]);
    setNewRecStudent("");
    setNewRecOpco("");
    setNewRecAmount("");
    setNewRecMethod("Virement Bancaire SEPA");
    triggerNotification(`Reçu financier ${newReceipt.id} créé et enregistré avec succès.`);
  };
  const handleGenerateCertificate = (id) => {
    const updated = attestations.map((att) => {
      if (att.id === id) {
        return {
          ...att,
          status: "genere",
          dateGenerated: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR"),
          reference: `ATT-2026-${att.studentName.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`
        };
      }
      return att;
    });
    setAttestations(updated);
    const target = updated.find((a) => a.id === id);
    if (target) {
      setSelectedAttestation(target);
    }
    triggerNotification(`Attestation officielle générée avec succès pour !`);
  };
  const handleSaveAttestationForm = (e) => {
    e.preventDefault();
    if (!attFormStudentName.trim() || !attFormCourseTitle.trim()) {
      triggerNotification("Le nom de l'élève et la spécialisation/cours sont obligatoires.");
      return;
    }
    const done = parseFloat(attFormHoursDone) || 0;
    const req = parseFloat(attFormHoursRequired) || 350;
    const mods = parseInt(attFormValidatedModules) || 0;
    let updatedAtts = [...attestations];
    if (attEditingId) {
      updatedAtts = updatedAtts.map((att) => {
        if (att.id === attEditingId) {
          return {
            ...att,
            studentName: attFormStudentName.trim(),
            courseTitle: attFormCourseTitle.trim(),
            hoursDone: done,
            hoursRequired: req,
            validatedModules: mods,
            status: attFormStatus,
            reference: attFormReference || att.reference || `ATT-2026-${attFormStudentName.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
            dateGenerated: attFormDateGenerated || att.dateGenerated || (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")
          };
        }
        return att;
      });
      triggerNotification("Attestation modifiée et sauvegardée avec succès.");
    } else {
      const newId = `att_${Date.now()}`;
      const newRef = attFormReference || `ATT-2026-${attFormStudentName.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      const newAtt = {
        id: newId,
        studentName: attFormStudentName.trim(),
        courseTitle: attFormCourseTitle.trim(),
        hoursDone: done,
        hoursRequired: req,
        validatedModules: mods,
        status: attFormStatus,
        reference: newRef,
        dateGenerated: attFormDateGenerated || (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")
      };
      updatedAtts = [newAtt, ...updatedAtts];
      triggerNotification("Nouvelle attestation ajoutée avec succès.");
    }
    setAttestations(updatedAtts);
    localStorage.setItem("cfa_attestations", JSON.stringify(updatedAtts));
    setAttShowForm(false);
    setAttEditingId(null);
  };
  const handleSaveReceiptForm = (e) => {
    e.preventDefault();
    if (!recFormStudentName.trim() || !recFormOpco.trim() || !recFormAmount) {
      triggerNotification("Veuillez remplir proprement tous les champs obligatoires.");
      return;
    }
    const amt = parseFloat(recFormAmount);
    if (isNaN(amt) || amt <= 0) {
      triggerNotification("Veuillez saisir un montant valide.");
      return;
    }
    let updatedRecs = [...receipts];
    if (recEditingId) {
      updatedRecs = updatedRecs.map((rec) => {
        if (rec.id === recEditingId) {
          return {
            ...rec,
            studentName: recFormStudentName.trim(),
            opco: recFormOpco.trim(),
            amount: amt,
            method: recFormMethod,
            status: recFormStatus,
            date: recFormDate || rec.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          };
        }
        return rec;
      });
      triggerNotification("Reçu financier modifié et sauvegardé avec succès.");
    } else {
      const newId = `RE-2026-${Math.floor(100 + Math.random() * 900)}`;
      const newRec = {
        id: newId,
        date: recFormDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        studentName: recFormStudentName.trim(),
        opco: recFormOpco.trim(),
        amount: amt,
        method: recFormMethod,
        status: recFormStatus
      };
      updatedRecs = [newRec, ...updatedRecs];
      triggerNotification("Nouveau reçu financier ajouté avec succès.");
    }
    setReceipts(updatedRecs);
    localStorage.setItem("cfa_receipts", JSON.stringify(updatedRecs));
    setRecShowForm(false);
    setRecEditingId(null);
  };
  const refreshAllData = async () => {
    try {
      const [coursesRes, exRes, vRes, sRes, msgRes] = await Promise.all([
        apiService.getCourses(),
        apiService.getExercises(),
        apiService.getVideos(),
        apiService.getStats(),
        apiService.getMessages()
      ]);
      setCourses(coursesRes);
      setExercises(exRes);
      setVideos(vRes);
      setStats(sRes);
      setMessages(msgRes);
      const uniquePartners = /* @__PURE__ */ new Set();
      msgRes.forEach((m) => {
        if (m.from !== username) uniquePartners.add(m.fromName || m.from);
        if (m.to !== username && !m.to.startsWith("groupe_")) {
          uniquePartners.add(m.to);
        }
      });
      const convList = Array.from(uniquePartners).map((p) => {
        const related = msgRes.filter((m) => m.fromName === p || m.to === p || m.from === p);
        const last = related[related.length - 1];
        return {
          id: p,
          partnerName: p,
          subject: last ? last.subject : "Discussion",
          lastMessage: last ? last.content : "",
          timestamp: last ? last.timestamp : (/* @__PURE__ */ new Date()).toISOString(),
          status: "En ligne"
        };
      });
      setConversations(convList);
    } catch (err) {
      console.error("Erreur lors de la synchronisation des données backend :", err);
    }
  };
  useEffect(() => {
    refreshAllData();
  }, [username]);
  const toggleCourseCompletion = async (courseId) => {
    try {
      const updatedCourse = await apiService.toggleCourseCompletion(courseId, username);
      setCourses(courses.map((c) => c.id === courseId ? updatedCourse : c));
      triggerNotification(`Statut du cours "${updatedCourse.title}" mis à jour !`);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };
  const toggleVideoCompletion = async (videoId) => {
    try {
      const updatedVideo = await apiService.toggleVideoCompletion(videoId, username);
      setVideos(videos.map((v) => v.id === videoId ? updatedVideo : v));
      triggerNotification(`Statut de visionnage pour "${updatedVideo.title}" mis à jour !`);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };
  const addTrainingHours = async (hours) => {
    try {
      const newStats = await apiService.addTrainingHours(hours);
      setStats(newStats);
      triggerNotification(`+${hours} heures d'alternance enregistrées avec succès !`);
    } catch (err) {
      console.error(err);
    }
  };
  const validateCompetenceModule = async () => {
    try {
      const newStats = await apiService.validateModuleSkill();
      setStats(newStats);
      triggerNotification("Excellent ! Bloc de compétences universitaires validé !");
    } catch (err) {
      console.error(err);
    }
  };
  const clearDashboardActivities = async () => {
    try {
      await apiService.clearRecentActivities();
      refreshAllData();
      triggerNotification("Notifications effacées !");
    } catch (err) {
      console.error(err);
    }
  };
  const handlePublishCourse = async (e) => {
    e.preventDefault();
    if (!newCourseTitle || !newCourseDesc || !newCourseContent || !newCourseDuration) {
      return triggerNotification("Veuillez remplir l'ensemble des champs.");
    }
    try {
      const c = await apiService.createCourse({
        title: newCourseTitle,
        module: newCourseModule,
        description: newCourseDesc,
        content: newCourseContent,
        duration: newCourseDuration,
        author: newCourseAuthor || "Jeremmy"
      });
      setCourses([...courses, c]);
      triggerNotification(`Félicitations ! Le cours "${newCourseTitle}" a été publié !`);
      setNewCourseTitle("");
      setNewCourseDesc("");
      setNewCourseContent("");
      setNewCourseDuration("");
      setNewCourseAuthor("Tojo");
      setShowAddCourseModal(false);
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleSaveCourse = async (courseId, updatedFields) => {
    try {
      const updatedCourse = await apiService.updateCourse(courseId, updatedFields);
      setCourses(courses.map((c) => c.id === courseId ? updatedCourse : c));
      triggerNotification(`Le cours "${updatedCourse.title}" a été sauvegardé avec succès.`);
      setEditingCourseId(null);
      refreshAllData();
    } catch (err) {
      console.error(err);
      triggerNotification("Une erreur s'est produite lors de la communication avec le serveur.");
    }
  };
  const handlePublishVideo = async (e) => {
    e.preventDefault();
    if (!newVidTitle || !newVidUrl || !newVidDuration) {
      return triggerNotification("Veuillez remplir les informations requises.");
    }
    try {
      const v = await apiService.createVideo({
        title: newVidTitle,
        module: newVidModule,
        url: newVidUrl,
        description: newVidDesc,
        duration: newVidDuration,
        prerequisites: newVidPrereq,
        author: "Finaritra"
      });
      setVideos([...videos, v]);
      triggerNotification(`La vidéo pédagogique "${newVidTitle}" est en ligne !`);
      setNewVidTitle("");
      setNewVidUrl("");
      setNewVidDesc("");
      setNewVidDuration("");
      setNewVidPrereq("");
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteCourse = async (id) => {
    if (!confirm("Voulez-vous vraiment retirer ce cours ?")) return;
    try {
      await apiService.deleteCourse(id);
      setCourses(courses.filter((c) => c.id !== id));
      triggerNotification("Cours retiré de la bibliothèque.");
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteExercise = async (id) => {
    if (!confirm("Voulez-vous vraiment retirer cet exercice ?")) return;
    try {
      await apiService.deleteExercise(id);
      setExercises(exercises.filter((e) => e.id !== id));
      triggerNotification("Exercice supprimé.");
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteVideo = async (id) => {
    if (!confirm("Retirer cette vidéo d'apprentissage ?")) return;
    try {
      await apiService.deleteVideo(id);
      setVideos(videos.filter((v) => v.id !== id));
      triggerNotification("Vidéo retirée.");
    } catch (err) {
      console.error(err);
    }
  };
  const handlePublishExercise = async (e) => {
    e.preventDefault();
    if (!newExTitle || !newExStatement || !newExSolution || !newExTime) {
      return triggerNotification("Veuillez remplir l'ensemble des champs du problème.");
    }
    try {
      const ex = await apiService.createExercise({
        title: newExTitle,
        module: newExModule,
        statement: newExStatement,
        hint: newExHint,
        solution: newExSolution,
        difficulty: newExDifficulty,
        time: newExTime,
        author: "Noel"
      });
      setExercises([...exercises, ex]);
      triggerNotification(`Exercice complexe "${newExTitle}" publié avec succès !`);
      setNewExTitle("");
      setNewExStatement("");
      setNewExHint("");
      setNewExSolution("");
      setNewExTime("");
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeChatChannel) return;
    try {
      const msg = await apiService.createMessage({
        to: activeChatChannel,
        content: newMessageText,
        subject: "Sujet d'étude",
        fromName: userRole === "admin" ? "M.Kevine" : "Apprenti Émule",
        fromRole: userRole
      });
      setMessages([...messages, msg]);
      setNewMessageText("");
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleStartConversation = async (e) => {
    e.preventDefault();
    if (!newConvTo || !newConvSubject || !newConvFirstMsg) {
      return triggerNotification("Fiche d'envoi incomplète.");
    }
    try {
      await apiService.createMessage({
        to: newConvTo,
        content: newConvFirstMsg,
        subject: newConvSubject,
        fromName: userRole === "admin" ? "Olivier" : "Apprenti Émule",
        fromRole: userRole
      });
      triggerNotification("Votre message initial a été transmis !");
      setNewConvOpen(false);
      setActiveChatChannel(newConvTo);
      setNewConvTo("");
      setNewConvSubject("");
      setNewConvFirstMsg("");
      refreshAllData();
    } catch (err) {
      console.error(err);
    }
  };
  const handleSendAiMessage = async () => {
    if (!aiPrompt.trim()) return;
    const userMsg = aiPrompt;
    setAiPrompt("");
    const newMsgs = [
      ...aiChatMessages,
      { sender: "user", text: userMsg, time: (/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) }
    ];
    setAiChatMessages(newMsgs);
    setIsAiLoading(true);
    try {
      const data = await apiService.sendGeminiPrompt(userMsg, newMsgs.map((m) => m.text));
      setAiChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          time: (/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (e) {
      setAiChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Désolé, j'ai rencontré un contretemps technique lors de l'accès au cerveau Gemini 3.5. 

Voici un conseil : pour vos exercices d'algorithmique ou de développement web, essayez de bien lire la documentation d'Université CFA ou de demander à votre tuteur en entreprise (**${stats?.tutorName || "M. Martin Dubois"}**)!`,
          time: (/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };
  const askPopularQuestion = (txt) => {
    setActiveTab("assistant");
    setAiPrompt(txt);
  };
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      return alert("Veuillez renseigner les éléments obligatoires.");
    }
    try {
      const out = await apiService.submitContact({ name: contactName, email: contactEmail, phone: contactPhone, message: contactMsg });
      triggerNotification(out.message);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactMsg("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleCandidacySubmit = async (e) => {
    e.preventDefault();
    if (!candidacyName || !candidacyEmail) return;
    try {
      const out = await apiService.submitCandidacy({ name: candidacyName, email: candidacyEmail, phone: candidacyPhone });
      setCandidacySuccess(out.message);
      triggerNotification("Votre candidature d'alternance est envoyée !");
      setCandidacyName("");
      setCandidacyEmail("");
      setCandidacyPhone("");
    } catch (err) {
      console.error(err);
    }
  };
  const testCurrentExerciseSolution = async (e) => {
    e.preventDefault();
    if (!selectedExercise) return;
    const standardAns = exerciseAnswer.replace(/\s+/g, "").trim();
    const standardSol = selectedExercise.solution.replace(/\s+/g, "").trim();
    if (standardAns.includes(standardSol) || standardSol.includes(standardAns)) {
      setExerciseResult({ success: true, msg: "Félicitations ! Votre code est syntaxiquement correct et répond aux exigences !" });
      try {
        await apiService.toggleExerciseCompletion(selectedExercise.id, username);
        refreshAllData();
      } catch (err) {
        console.error(err);
      }
    } else {
      setExerciseResult({
        success: false,
        msg: "La réponse ou la signature de fonction ne correspond pas exactement à la solution attendue. Réessayez !"
      });
    }
  };
  const getAllInstructors = () => {
    const instructors = /* @__PURE__ */ new Set();
    courses.forEach((c) => c.author && instructors.add(c.author));
    exercises.forEach((e) => e.author && instructors.add(e.author));
    videos.forEach((v) => v.author && instructors.add(v.author));
    return Array.from(instructors).filter((name) => name.trim() !== "");
  };
  const filteredContents = () => {
    let combined = [];
    if (courseFilter === "all" || courseFilter === "course") {
      combined = [...combined, ...courses.map((c) => ({ ...c, type: "course" }))];
    }
    if (courseFilter === "all" || courseFilter === "exercise") {
      combined = [...combined, ...exercises.map((e) => ({ ...e, type: "exercise" }))];
    }
    if (courseFilter === "all" || courseFilter === "video") {
      combined = [...combined, ...videos.map((v) => ({ ...v, type: "video" }))];
    }
    if (selectedModule !== "all") {
      combined = combined.filter((x) => x.module === selectedModule);
    }
    if (selectedTeacherFilter !== "all") {
      combined = combined.filter((x) => x.author && x.author.toLowerCase() === selectedTeacherFilter.toLowerCase());
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      combined = combined.filter(
        (x) => x.title && x.title.toLowerCase().includes(q) || x.description && x.description.toLowerCase().includes(q) || x.statement && x.statement.toLowerCase().includes(q)
      );
    }
    return combined;
  };
  if (!isLoggedIn && activeTab !== "accueil") {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        {
      /* Toast Notifs inside Login page too */
    }
        {globalNotif && <div
      id="login-notification"
      className="fixed top-4 right-4 z-50 bg-emerald-600 text-white shadow-xl px-4 py-3 rounded-lg border border-emerald-500 flex items-center gap-2 transform transition-all duration-300 animate-bounce"
    >
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">{globalNotif}</span>
          </div>}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 border border-slate-100 min-h-[550px]">
          
          {
      /* Left Panel: Aesthetic info/welcome panel */
    }
          <div className="md:col-span-12 lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-950 text-white p-8 flex flex-col justify-between relative overflow-hidden">
            {
      /* Visual background decor lines */
    }
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -ml-20 -mb-20" />

            <div className="relative z-10 my-auto flex flex-col items-center text-center">
              {
      /* Brand Logo centered as a high-end minimalist seal */
    }
              <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20 mb-4 inline-block">
                <GraduationCap className="h-10 w-10 text-emerald-400" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-white block">
                  UNIVERSITÉ<span className="text-emerald-400">CFA</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-mono mt-1 block uppercase tracking-widest text-opacity-80">
                  Espace Pédagogique
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 text-[10px] text-emerald-300/60 font-mono text-center">
              <span>Université CFA © 2026</span>
            </div>
          </div>

          {
      /* Right Panel: Clean form sheet */
    }
          <div className="md:col-span-12 lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white relative">
            <div className="max-w-md w-full mx-auto">

              {isSignUp ? <>
                  {signupError && <div className="mb-4 p-3 bg-red-500/10 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                      <span className="font-medium">{signupError}</span>
                    </div>}

                  <form onSubmit={handleSignUp} className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight font-display text-center mb-2">
                      Créer un compte
                    </h3>

                    {
      /* User Type Cards Selector for signup */
    }
                    <div>
                      <div className="grid grid-cols-2 gap-3">
                        {
      /* Student card option */
    }
                        <div
      onClick={() => setSignupRole("etudiant")}
      className={`cursor-pointer border-2 rounded-2xl p-3 text-center transition-all flex flex-col items-center justify-center ${signupRole === "etudiant" ? "border-emerald-600 bg-emerald-50/40 shadow-sm font-bold" : "border-slate-200 bg-slate-50 hover:border-slate-350"}`}
    >
                          <GraduationCap className={`h-6 w-6 mb-1.5 ${signupRole === "etudiant" ? "text-emerald-600" : "text-slate-400"}`} />
                          <span className={`text-xs font-bold ${signupRole === "etudiant" ? "text-emerald-800" : "text-slate-700"}`}>
                            Étudiant
                          </span>
                        </div>

                        {
      /* Admin card option */
    }
                        <div
      onClick={() => setSignupRole("admin")}
      className={`cursor-pointer border-2 rounded-2xl p-3 text-center transition-all flex flex-col items-center justify-center ${signupRole === "admin" ? "border-emerald-600 bg-emerald-50/40 shadow-sm font-bold" : "border-slate-200 bg-slate-50 hover:border-slate-350"}`}
    >
                          <Shield className={`h-6 w-6 mb-1.5 ${signupRole === "admin" ? "text-emerald-700" : "text-slate-400"}`} />
                          <span className={`text-xs font-bold ${signupRole === "admin" ? "text-emerald-800" : "text-slate-700"}`}>
                            Administrateur
                          </span>
                        </div>
                      </div>
                    </div>

                    {
      /* Nom (Name) */
    }
                    <div>
                      <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wider block mb-1">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Users className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                          value={signupUsername}
                          onChange={(e) => setSignupUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {
    

                  
      
                    
      /* Password */
    }
                    <div>
                      <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wider block mb-1">
                        Mot de passe *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-404">
                          <Lock className="h-4 w-4" />
                        </span>
                        <input
                          type="password"
                          className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {
      /* Confirm Password */
    }
                    <div>
                      <label className="text-[10px] font-bold text-slate-555 uppercase tracking-wider block mb-1">
                        Confirmer le mot de passe *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-404">
                          <Lock className="h-4 w-4" />
                        </span>
                        <input
                          type="password"
                          className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {
      /* Option: Mot de passe oublié */
    }
                    <div className="text-right pt-0.5">
                      <button
                        type="button"
                        onClick={() => triggerNotification("Veuillez réinitialiser votre mot de passe depuis l'écran de connexion ou contacter le secrétariat de l'Université CFA.")}
                        className="text-[10px] text-emerald-650 hover:text-emerald-750 font-bold underline transition-all cursor-pointer"
                      >
                        Mot de passe oublié ?
                      </button>
                    </div>

                    {
      /* Submit button */
    }
                    <button
      type="submit"
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
    >
                      <Plus className="h-4 w-4" /> Créer un nouveau compte
                    </button>

                    <div className="mt-4 pt-3 border-t border-slate-150 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(false);
                          setSignupError("");
                          setLoginError("");
                        }}
                        className="text-xs text-emerald-650 hover:text-emerald-750 font-bold underline transition-all cursor-pointer flex items-center justify-center gap-1 mx-auto"
                      >
                        Retour ? Se connecter
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setActiveTab("accueil")}
                        className="text-xs text-slate-500 hover:text-slate-600 font-bold underline transition-all cursor-pointer flex items-center justify-center gap-1 mx-auto"
                      >
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        Acceuil
                      </button>
                    </div>
                  </form>
                </> : <>
                  {loginError && <div className="mb-4 p-3 bg-red-500/10 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-650 shrink-0" />
                      <span className="font-medium">{loginError}</span>
                    </div>}

                  <form onSubmit={handleLogin} className="space-y-4">
                    
                    {
      /* User Type Cards Selector */
    }
                    <div>
                      <div className="grid grid-cols-2 gap-3">
                        {
      /* Student card option */
    }
                        <div
      onClick={() => setLoginRole("etudiant")}
      className={`cursor-pointer border-2 rounded-2xl p-3 text-center transition-all flex flex-col items-center justify-center ${loginRole === "etudiant" ? "border-emerald-600 bg-emerald-50/40 shadow-sm font-bold" : "border-slate-200 bg-slate-50 hover:border-slate-350"}`}
    >
                          <GraduationCap className={`h-6 w-6 mb-1.5 ${loginRole === "etudiant" ? "text-emerald-600" : "text-slate-400"}`} />
                          <span className={`text-xs font-bold ${loginRole === "etudiant" ? "text-emerald-800" : "text-slate-700"}`}>
                            Étudiant
                          </span>
                        </div>

                        {
      /* Admin card option */
    }
                        <div
      onClick={() => setLoginRole("admin")}
      className={`cursor-pointer border-2 rounded-2xl p-3 text-center transition-all flex flex-col items-center justify-center ${loginRole === "admin" ? "border-emerald-600 bg-emerald-50/40 shadow-sm font-bold" : "border-slate-200 bg-slate-50 hover:border-slate-350"}`}
    >
                          <Shield className={`h-6 w-6 mb-1.5 ${loginRole === "admin" ? "text-emerald-700" : "text-slate-400"}`} />
                          <span className={`text-xs font-bold ${loginRole === "admin" ? "text-emerald-800" : "text-slate-700"}`}>
                            Administrateur
                          </span>
                        </div>
                      </div>
                    </div>

                    {
      /* Username */
    }
                    <div>
                      <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wider block mb-1">
                        Nom d'utilisateur ou Email *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Users className="h-4 w-4" />
                        </span>
                        <input
      type="text"
      className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
      value={loginUsername}
      onChange={(e) => setLoginUsername(e.target.value)}
      required
    />
                      </div>
                    </div>

                    {
      /* Password */
    }
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wider block">
                          Mot de passe *
                        </label>
                      </div>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="h-4 w-4" />
                        </span>
                        <input
      type={showPassword ? "text" : "password"}
      className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
      value={loginPassword}
      onChange={(e) => setLoginPassword(e.target.value)}
      required
    />
                        <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
    >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="mt-1.5 text-right">
                        <button
      type="button"
      onClick={() => triggerNotification("Veuillez contacter le secrétariat ou votre formateur référent pour réinitialiser votre mot de passe.")}
      className="text-[10px] text-emerald-650 hover:text-emerald-750 font-bold underline transition-all cursor-pointer"
    >
                          Mot de passe oublié ?
                        </button>
                      </div>
                    </div>

                    {
      /* Submit button */
    }
                    <button
      type="submit"
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
    >
                      <Key className="h-4 w-4" /> Se connecter maintenant
                    </button>

                    {
      /* SignUp Link Option */
    }
                    <div className="text-center pt-1">
                      <button
      type="button"
      onClick={() => {
        setIsSignUp(true);
        setSignupError("");
        setLoginError("");
      }}
      className="text-xs text-emerald-650 hover:text-emerald-750 font-bold underline transition-all cursor-pointer"
    >
                        Créer un nouveau compte
                      </button>
                    </div>
                  </form>

                  <div className="mt-4 pt-3 border-t border-slate-150 text-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab("accueil")}
                      className="text-xs text-emerald-650 hover:text-emerald-750 font-bold underline transition-all cursor-pointer flex items-center justify-center gap-1 mx-auto"
                    >
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      Accueil
                    </button>
                  </div>
                </>}

            </div>
          </div>

        </div>
      </div>;
  }

  if (isLaunching) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans text-slate-100 p-6 relative overflow-hidden" id="loading-screen">
        {/* Abstract background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full text-center relative z-10 transition-all duration-500 transform scale-100">
          
          {/* LOGO EXACTEMENT COMME SUR L'IMAGE (PURÉMENT LE LOGO DE LA FOUDRE GRADIENT) */}
          <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
            {/* Soft background blue/purple radial glow behind the raw logo */}
            <div className="absolute w-44 h-44 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none animate-pulse delay-700" />

            <svg 
              className="h-36 w-28 drop-shadow-[0_4px_24px_rgba(168,85,247,0.45)] hover:scale-105 transition-transform duration-300 relative z-10" 
              viewBox="0 0 56 78" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bolt-gradient-image" x1="0%" y1="0%" x2="100%" y2="100%">
                  {/* Matching purple and indigo-blue gradient colors perfectly as in the image */}
                  <stop offset="0%" stopColor="#7c3aed" />     {/* Deep warm premium violet */}
                  <stop offset="40%" stopColor="#8b5cf6" />    {/* Rich bright purple-indigo */}
                  <stop offset="70%" stopColor="#6366f1" />    {/* Indigo */}
                  <stop offset="100%" stopColor="#3b82f6" />   {/* Power electric blue */}
                </linearGradient>
              </defs>
              <path 
                d="M23.4273 48.2853C23.7931 47.5845 23.0614 46.8837 22.3298 46.8837H1.11228C0.0148224 46.8837 -0.350997 45.8326 0.380642 45.1318L40.9866 0.282084C41.7182 -0.418693 43.1815 0.282084 42.8157 1.33325L32.9386 30.0651C32.5727 30.7659 32.9386 31.4666 33.6702 31.4666H54.8877C55.9852 31.4666 56.351 32.5178 55.6194 33.2186L15.0134 77.7179C14.2818 78.4187 12.8185 77.7179 13.1843 76.6667L23.4273 48.2853Z" 
                fill="url(#bolt-gradient-image)"
              />
            </svg>
          </div>

          {/* Titles */}
          <h1 className="font-display font-black text-2xl tracking-tight text-white uppercase mb-1">
            Université<span className="text-purple-450">CFA</span> 
          </h1>
          <p className="text-[10px] text-purple-300 font-mono tracking-widest uppercase mb-6 font-bold">
            
          </p>

          {/* Progress bar */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-emerald-500 h-full rounded-full transition-all duration-200 ease-out"
              style={{ width: `${launchProgress}%` }}
            />
          </div>

          {/* Progress Status label */}
          <div className="flex justify-between items-center text-[11px] font-mono mb-4 text-slate-400">
            <span className="text-purple-400 font-semibold animate-pulse">
              {launchProgress < 30 && "Chargement des modules d'apprentissage..."}
              {launchProgress >= 30 && launchProgress < 60 && "Vérification des accès Google Chrome..."}
              {launchProgress >= 60 && launchProgress < 90 && "Interconnexion du serveur dev express..."}
              {launchProgress >= 90 && "Prêt à démarrer l'application !"}
            </span>
            <span className="font-bold text-white">{launchProgress}%</span>
          </div>

          {/* Clean minimal localhost badge with NO subtext underneath */}
          <div className="mb-6 flex flex-col items-center">
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl px-5 py-2.5 flex items-center gap-2.5 shadow-xl backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase">chargement</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => setIsLaunching(false)}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xl shadow-purple-900/20 hover:shadow-purple-900/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Zap className="h-4 w-4 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
            
          </button>
          
        </div>

        {/* Brand signature */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-slate-500 font-mono">
          Compte certifié par l'Université CFA • 2026
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {
    /* GLOBAL NOTIFICATION SYSTEM */
  }
      {globalNotif && <div
    id="global-notification"
    className="fixed top-4 right-4 z-50 bg-emerald-600 text-white shadow-xl px-4 py-3 rounded-lg border border-emerald-500 flex items-center gap-2 transform transition-all duration-300 animate-bounce"
  >
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium">{globalNotif}</span>
        </div>}

      {
    /* HEADER NAVIGATION WITH TOP PREMIUM GRADIENT STRIP */
  }
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 w-full sticky top-0 z-50" />
      
      <nav id="navbar" className="bg-white border-b border-slate-200 sticky top-1 z-40 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {
    /* Logo */
  }
            <div className="flex items-center">
              <div
    id="brand-logo"
    className="flex items-center gap-2.5 cursor-pointer group"
    onClick={() => setActiveTab("accueil")}
  >
                <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-md group-hover:bg-emerald-700 group-hover:rotate-3 transition-all duration-300">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-display font-black text-xl tracking-tight text-slate-900 block group-hover:text-emerald-750 transition-colors">
                    UNIVERSITÉ<span className="text-emerald-600">CFA</span>
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono -mt-1 block uppercase tracking-widest leading-none font-bold">
                    PARCOURS PROFESSIONNEL 2026
                  </span>
                </div>
              </div>
            </div>
 
            {
    /* Menu Links */
  }
            <div className="hidden md:flex items-center space-x-1.5">
              <button
    id="nav-tab-accueil"
    onClick={() => setActiveTab("accueil")}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 border ${activeTab === "accueil" ? "bg-emerald-50 border-emerald-150 text-emerald-700 shadow-sm" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-102"}`}
  >
                <Star className="h-3.5 w-3.5" /> Accueil
              </button>
 
              <button
    id="nav-tab-dashboard"
    onClick={() => setActiveTab("dashboard")}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 border ${activeTab === "dashboard" ? "bg-emerald-50 border-emerald-150 text-emerald-700 shadow-sm" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-102"}`}
  >
                <LayoutDashboard className="h-3.5 w-3.5" /> Tableau de bord
              </button>
 
              <button
    id="nav-tab-cours"
    onClick={() => setActiveTab("cours")}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 border ${activeTab === "cours" ? "bg-emerald-50 border-emerald-150 text-emerald-700 shadow-sm" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-102"}`}
  >
                <BookOpen className="h-3.5 w-3.5" /> Mes cours
              </button>
 
              <button
    id="nav-tab-discussion"
    onClick={() => setActiveTab("discussion")}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 border ${activeTab === "discussion" ? "bg-emerald-50 border-emerald-150 text-emerald-700 shadow-sm" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-102"}`}
  >
                <MessageSquare className="h-3.5 w-3.5" /> Discussions
              </button>
 

 
              {userRole === "admin" && <button
    id="nav-tab-formateur"
    onClick={() => setActiveTab("formateur")}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 border ${activeTab === "formateur" ? "bg-emerald-50 border-emerald-150 text-emerald-700 shadow-sm" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-102"}`}
  >
                  <UserCheck className="h-3.5 w-3.5" /> Espace Formateur
                </button>}
 
              <button
    id="nav-tab-attestations"
    onClick={() => setActiveTab("attestations")}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 border ${activeTab === "attestations" ? "bg-emerald-50 border-emerald-150 text-emerald-700 shadow-sm" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-102"}`}
  >
                <FileCheck className="h-3.5 w-3.5" /> {userRole === "admin" ? "Attestations" : "Mes Attestations"}
              </button>
 
              <button
    id="nav-tab-recurs"
    onClick={() => setActiveTab("reçus")}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 border ${activeTab === "reçus" ? "bg-emerald-50 border-emerald-150 text-emerald-700 shadow-sm" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:scale-102"}`}
  >
                <Receipt className="h-3.5 w-3.5" /> {userRole === "admin" ? "Reçus" : "Mes Reçus"}
              </button>
            </div>
 
            {
    /* Profile Info Card & Log Out Button or Login Button */
  }
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs font-black text-slate-800 tracking-tight font-display">
                    {username}
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${userRole === "admin" ? "bg-emerald-100 text-emerald-800 border border-emerald-250" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                    {userRole === "admin" ? "🛡️ Administrateur" : "🎓 Étudiant"}
                  </span>
                </div>

                {
      /* Mobile Role badge */
    }
                <div className="sm:hidden text-[10px] bg-slate-100 px-2 py-1 rounded-lg font-bold border border-slate-250">
                  {userRole === "admin" ? "🛡️ Admin" : "🎓 Élève"}
                </div>

                {
      /* Log Out Button */
    }
                <button
                  id="btn-logout"
                  onClick={handleLogout}
                  title="Se déconnecter de la plateforme"
                  className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-xl border border-slate-200 hover:border-red-200 transition-all duration-300 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                id="btn-login-nav"
                onClick={() => setActiveTab("connexion")}
                title="Se connecter"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-tight transition-all duration-300 shadow-md shadow-emerald-600/10 hover:scale-102 cursor-pointer"
              >
                <Key className="h-4 w-4" /> Se connecter
              </button>
            )}
 
          </div>
        </div>
      </nav>
 
      {
    /* MOBILE HEADER TAB NAVIGATION ROW - HIGHLY POLISHED SCROLLABLE PILLS */
  }
      <div className="bg-emerald-900 border-b border-emerald-800 md:hidden py-2.5 px-3.5 shadow-md flex overflow-x-auto gap-2 scrollbar-none text-xs sticky top-[68px] z-30 justify-start items-center">
        <button
    onClick={() => setActiveTab("accueil")}
    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all duration-200 ${activeTab === "accueil" ? "bg-white text-emerald-900 shadow-sm scale-102 font-black" : "text-emerald-100/80 hover:text-white hover:bg-white/10"}`}
  >
          Accueil
        </button>
        <button
    onClick={() => setActiveTab("dashboard")}
    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all duration-200 ${activeTab === "dashboard" ? "bg-white text-emerald-900 shadow-sm scale-102 font-black" : "text-emerald-100/80 hover:text-white hover:bg-white/10"}`}
  >
          Suivi
        </button>
        <button
    onClick={() => setActiveTab("cours")}
    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all duration-200 ${activeTab === "cours" ? "bg-white text-emerald-900 shadow-sm scale-102 font-black" : "text-emerald-100/80 hover:text-white hover:bg-white/10"}`}
  >
          Mes cours
        </button>
        <button
    onClick={() => setActiveTab("discussion")}
    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all duration-200 ${activeTab === "discussion" ? "bg-white text-emerald-900 shadow-sm scale-102 font-black" : "text-emerald-100/80 hover:text-white hover:bg-white/10"}`}
  >
          Discussions
        </button>

        {userRole === "admin" && <button
    onClick={() => setActiveTab("formateur")}
    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all duration-200 ${activeTab === "formateur" ? "bg-white text-emerald-900 shadow-sm scale-102 font-black" : "text-emerald-100/80 hover:text-white hover:bg-white/10"}`}
  >
            Formateur
          </button>}
        <button
    onClick={() => setActiveTab("attestations")}
    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all duration-200 ${activeTab === "attestations" ? "bg-white text-emerald-900 shadow-sm scale-102 font-black" : "text-emerald-100/80 hover:text-white hover:bg-white/10"}`}
  >
          {userRole === "admin" ? "Attestations" : "Certificats"}
        </button>
        <button
    onClick={() => setActiveTab("reçus")}
    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all duration-200 ${activeTab === "reçus" ? "bg-white text-emerald-900 shadow-sm scale-102 font-black" : "text-emerald-100/80 hover:text-white hover:bg-white/10"}`}
  >
          {userRole === "admin" ? "Reçus OPCO" : "Mes Reçus"}
        </button>
      </div>

      {
    /* MAIN VIEWPORT */
  }
      <main className="flex-grow">
        
        {
    /* ========================================================== */
  }
        {
    /* TABS 1: ACCUEIL - LANDING PAGE & REGISTRATIONS */
  }
        {
    /* ========================================================== */
  }
        {activeTab === "accueil" && <div id="view-accueil" className="animate-fade-in">
            
            {
    /* Modern Hero Section */
  }
            <div className="relative bg-emerald-900 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-700/50 via-emerald-900 to-slate-950 opacity-90" />
              <div className="relative max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-sm border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>Nouveau en 2026 : Assistant Pédagogique inclus</span>
                </div>
                <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none mb-6">
                  Apprenez la théorie. <br />
                  <span className="text-emerald-400">Maîtrisez la pratique.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-emerald-100 text-base sm:text-lg mb-8 leading-relaxed">
                  L'Université CFA propose des formations d'excellence en alternance. Connectez-vous à votre espace apprenti, validez vos heures de stage et posez vos questions à notre éducative.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
    onClick={() => setActiveTab("cours")}
    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/40 transition-all flex items-center gap-2 cursor-pointer text-sm"
  >
                    <BookOpen className="h-4 w-4" /> Ma bibliothèque de cours
                  </button>
                  <a
    href="#formations"
    className="px-6 py-3 bg-emerald-800/40 hover:bg-emerald-800/70 text-white border border-emerald-400/40 rounded-lg font-semibold transition-all text-sm"
  >
                    Voir nos formations
                  </a>
                </div>
              </div>
            </div>

            {
    /* CFA Key Metrics Rows */
  }
            <section className="bg-white border-b border-slate-200 py-10">
              <div className="max-w-7xl mx-auto px-4 divide-y divide-slate-100 md:divide-y-0 md:grid md:grid-cols-3 md:gap-8">
                <div className="p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-emerald-50 text-emerald-600 mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-slate-900">5 000+</h3>
                  <p className="text-sm font-semibold text-slate-500 mt-1">Apprentis diplômés et insérés</p>
                </div>
                <div className="p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-emerald-50 text-emerald-600 mb-4">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-slate-900">800+</h3>
                  <p className="text-sm font-semibold text-slate-500 mt-1">Entreprises partenaires technologiques</p>
                </div>
                <div className="p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-emerald-50 text-emerald-600 mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-slate-900">95%</h3>
                  <p className="text-sm font-semibold text-slate-500 mt-1">Taux d'embauche post-alternance</p>
                </div>
              </div>
            </section>

            {
    /* Formations Grid */
  }
            <section id="formations" className="py-20 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                  Nos Piliers de Formation en Alternance
                </h2>
                <p className="text-slate-500 mt-2 max-w-xl mx-auto">
                  Des spécialisations de Bac+2 à Bac+5 reconnues par l'État et co-construites avec les géants de l'industrie.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {
    /* Card 1 */
  }
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Développement Web</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Apprenez les architectures frontend réactives avec React, les backends asynchrones en Node.js, Express, et le déploiement Cloud sécurisé.
                  </p>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    Diplôme Niveau 6 & 7
                  </span>
                </div>

                {
    /* Card 2 */
  }
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Marketing Digital</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    SEO appliqué, campagnes d'acquisition payantes, analyse de trafic avancée, et design d'expérience utilisateur à forte conversion.
                  </p>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    Diplôme Niveau 6
                  </span>
                </div>

                {
    /* Card 3 */
  }
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Cybersécurité</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Analyse des risques de sécurité réseau, audit de code, gouvernance des données selon la triade CIA standardisée et pare-feux.
                  </p>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    Diplôme Niveau 7
                  </span>
                </div>

                {
    /* Card 4 */
  }
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Data Science</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Exploration de données géantes, algorithmes de Machine Learning, pipelines de données, et intégration industrielle d'API LLM.
                  </p>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    Diplôme Niveau 7
                  </span>
                </div>

              </div>
            </section>

            {
    /* Alternance section & candidate form */
  }
            <section className="bg-slate-100 py-16 border-t border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {
    /* Column left */
  }
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                    L'alternance clé en main
                  </h2>
                  <p className="text-slate-600 mt-4 leading-relaxed">
                    Étudier chez Université CFA, c'est l'assurance d'avoir l'intégralité de sa scolarité payée par son entreprise d'accueil et de percevoir un salaire mensuel stable tout au long de sa formation.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-lg h-8 w-8 flex items-center justify-center shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Frais de scolarité à 10€</h4>
                        <p className="text-sm text-slate-500">Prise en charge à 100% par l'OPCO de l'entreprise d'alternance.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-lg h-8 w-8 flex items-center justify-center shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Expérience professionnelle validée</h4>
                        <p className="text-sm text-slate-500">Validez vos heures d'internship en même temps que vos cours académiques.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {
    /* Column right - Form */
  }
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">Postuler en ligne rapidement</h3>
                  <p className="text-xs text-slate-400 mb-6">Activez vos opportunités en alternance en remplissant cette demande préliminaire.</p>

                  {candidacySuccess ? <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-lg text-sm">
                      <p className="font-bold">Dossier reçu !</p>
                      <p className="text-xs mt-1">{candidacySuccess}</p>
                      <button
    onClick={() => setCandidacySuccess(null)}
    className="mt-3 text-emerald-700 underline text-xs font-semibold hover:text-emerald-900 block"
  >
                        Soumettre une autre candidature
                      </button>
                    </div> : <form onSubmit={handleCandidacySubmit} className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Nom Complet *</label>
                        <input
    type="text"
    required
    value={candidacyName}
    onChange={(e) => setCandidacyName(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
  />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Email *</label>
                          <input
    type="email"
    required
    value={candidacyEmail}
    onChange={(e) => setCandidacyEmail(e.target.value)}
    placeholder="nom@mail.com"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 uppercase block mb-1">Téléphone</label>
                          <input
    type="tel"
    value={candidacyPhone}
    onChange={(e) => setCandidacyPhone(e.target.value)}
    placeholder="06 12 34 56 78"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                        </div>
                      </div>
                      <button
    type="submit"
    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer"
  >
                        Soumettre ma candidature d'apprenti
                      </button>
                    </form>}
                </div>

              </div>
            </section>

            {
    /* General Contact Form */
  }
            <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-xl text-indigo-950 font-display">Nous contacter</h3>
                    <p className="text-xs text-slate-500 mt-2">Notre administration est à votre écoute pour toute demande d'informations.</p>
                  </div>

                  <div className="mt-6 space-y-4 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>FIIIP35B Manantenasoa Ambomahitsy, 101 Antananarivo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>0336779911</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>kehvine@gmail.com</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Nom *</label>
                        <input
    type="text"
    required
    value={contactName}
    onChange={(e) => setContactName(e.target.value)}
    placeholder="Votre Nom"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Email *</label>
                        <input
    type="email"
    required
    value={contactEmail}
    onChange={(e) => setContactEmail(e.target.value)}
    placeholder="votre@email.com"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Message *</label>
                      <textarea
    rows={4}
    required
    value={contactMsg}
    onChange={(e) => setContactMsg(e.target.value)}
    placeholder="Quelles sont vos questions ?"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                    </div>
                    <button
    type="submit"
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2"
  >
                      <Send className="h-4 w-4" /> Envoyer le message
                    </button>
                  </form>
                </div>

              </div>
            </section>

          </div>}

        {
    /* ========================================================== */
  }
        {
    /* TABS 2: MES COURS - LIBRARY WITH SEARCH & FILTER */
  }
        {
    /* ========================================================== */
  }
        {activeTab === "cours" && <div id="view-cours" className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            
            {
    /* Header */
  }
            <div className="mb-8 border-b border-slate-200 pb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-emerald-600" /> Ma bibliothèque de formation
              </h1>
              <p className="text-slate-500 mt-1">Accédez aux supports de cours, aux exercices guidés, et aux tutoriels vidéos.</p>
            </div>

            {
    /* Statistics Mini row */
  }
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="bg-emerald-100 text-emerald-800 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Contenus de formation</span>
                  <span className="text-2xl font-black text-slate-800 block">
                    {courses.length + exercises.length + videos.length}
                  </span>
                </div>
              </div>
              
              {
    /* Count completed by this student */
  }
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="bg-emerald-100 text-emerald-800 p-3 rounded-lg">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Formations terminées</span>
                  <span className="text-2xl font-black text-slate-800 block">
                    {courses.filter((c) => c.completedBy.includes(username)).length + exercises.filter((e) => e.completedBy.includes(username)).length + videos.filter((v) => v.completedBy.includes(username)).length}
                  </span>
                </div>
              </div>

              {
    /* Training progress ratio */
  }
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                <div className="bg-emerald-100 text-emerald-800 p-3 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Académique</span>
                  <span className="text-2xl font-black text-slate-800 block">
                    {stats?.hoursDone || 0}h / {stats?.hoursTotal || 350}h
                  </span>
                </div>
              </div>
            </div>

            {
    /* Filter controls panel */
  }
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between mb-8">
              
              <div className="flex flex-wrap gap-2">
                <button
    onClick={() => setCourseFilter("all")}
    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer ${courseFilter === "all" ? "bg-emerald-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}
  >
                  Tout voir
                </button>
                <button
    onClick={() => setCourseFilter("course")}
    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer ${courseFilter === "course" ? "bg-emerald-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}
  >
                  📚 Cours théoriques
                </button>
                <button
    onClick={() => setCourseFilter("exercise")}
    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer ${courseFilter === "exercise" ? "bg-emerald-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}
  >
                  ✍️ Exercices pratiques
                </button>
                <button
    onClick={() => setCourseFilter("video")}
    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer ${courseFilter === "video" ? "bg-emerald-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}
  >
                  🎥 Vidéos & Replays
                </button>

                <button
    onClick={() => {
      setNewCourseTitle("");
      setNewCourseDesc("");
      setNewCourseContent("");
      setNewCourseDuration("");
      setNewCourseAuthor("M. Jean Olivier Andrianirina");
      setNewCourseModule("web");
      setShowAddCourseModal(true);
    }}
    className="px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1 transition-all cursor-pointer border border-emerald-600"
    id="btn-add-course-main"
  >
                  <Plus className="h-3.5 w-3.5" /> Ajouter un cours
                </button>
              </div>

              {
    /* Right filters */
  }
              <div className="flex flex-wrap gap-3 w-full md:w-auto mt-4 md:mt-0">
                <select
    value={selectedModule}
    onChange={(e) => setSelectedModule(e.target.value)}
    className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
  >
                  <option value="all">📚 Tous les modules d'étude</option>
                  <option value="web">💻 Développement Web</option>
                  <option value="marketing">📊 Marketing Digital</option>
                  <option value="securite">🔒 Cybersécurité</option>
                  <option value="Réseaux">🌍  Réseaux Informatiques</option>
                  <option value="Cloud">☁️ Cloud Computing</option>
                  <option value="systeme">🖧  Administration Système</option>
                  
                </select>

                <select
    value={selectedTeacherFilter}
    onChange={(e) => setSelectedTeacherFilter(e.target.value)}
    className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-700"
  >
                  <option value="all">👨‍🏫 Tous les enseignants</option>
                  {getAllInstructors().map((instructor, idx) => <option key={idx} value={instructor}>🎓 {instructor}</option>)}
                </select>

                {
    /* Text search */
  }
                <div className="relative flex-grow md:flex-grow-0">
                  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Rechercher un concept..."
    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                  <Search className="h-4 w-4 text-slate-400 absolute left-2 top-2" />
                </div>
              </div>

            </div>

            {
    /* List and Grid display */
  }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContents().length === 0 ? <div className="col-span-1 md:col-span-3 text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                  <Info className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-700">Aucun contenu ne correspond à vos filtres</h3>
                  <p className="text-slate-400 text-xs">Veuillez modifier votre filtre thématique ou réinitialiser votre recherche.</p>
                </div> : filteredContents().map((item) => {
    const isCompleted = item.completedBy?.includes(username);
    const isEditing = editingCourseId === item.id;
    if (item.type === "course" && isEditing) {
      return <div
        key={item.id}
        className="bg-white rounded-2xl shadow-md border-2 border-emerald-500 overflow-hidden flex flex-col justify-between p-5 space-y-4 animate-fade-in text-slate-800"
        id={`edit-card-${item.id}`}
      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1 border border-emerald-200">
                              <Edit3 className="h-3 w-3" /> Édition de cours
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">Titre du cours *</label>
                              <input
        type="text"
        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
        value={editCourseTitle}
        onChange={(e) => setEditCourseTitle(e.target.value)}
      />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">Thématique</label>
                                <select
        className="w-full px-1.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
        value={editCourseModule}
        onChange={(e) => setEditCourseModule(e.target.value)}
      >
                                  <option value="web">💻 Dev Web</option>
                                  <option value="marketing">📊 Marketing</option>
                                  <option value="securite">🔒 Sécurité</option>
                                  <option value="data">📈 Data</option>
                                  <option value="Réseaux">🌍  Réseaux Informatiques</option>
                                  <option value="Cloud">☁️ Cloud Computing</option>
                                  <option value="systeme">🖧  Administration Système</option>
                                  
                                </select>
                              </div>
                              <div>
                                <label className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">Durée (heures)</label>
                                <input
        type="number"
        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
        value={editCourseDuration}
        onChange={(e) => setEditCourseDuration(e.target.value)}
      />
                              </div>
                            </div>

                            <div>
                              <label className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">Description concise</label>
                              <input
        type="text"
        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
        value={editCourseDesc}
        onChange={(e) => setEditCourseDesc(e.target.value)}
      />
                            </div>

                            <div>
                              <label className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">Enseignant / Auteur *</label>
                              <input
        type="text"
        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold text-emerald-800"
        value={editCourseAuthor}
        onChange={(e) => setEditCourseAuthor(e.target.value)}
      />
                            </div>

                            <div>
                              <label className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">Contenu détaillé & HTML</label>
                              <textarea
        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] h-24 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
        value={editCourseContent}
        onChange={(e) => setEditCourseContent(e.target.value)}
      />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                          <button
        type="button"
        onClick={() => handleSaveCourse(item.id, {
          title: editCourseTitle,
          module: editCourseModule,
          description: editCourseDesc,
          content: editCourseContent,
          duration: Number(editCourseDuration),
          author: editCourseAuthor
        })}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer text-xs shadow-sm"
        id={`btn-save-card-${item.id}`}
      >
                            <Save className="h-3.5 w-3.5" /> Sauvegarder
                          </button>
                          <button
        type="button"
        onClick={() => setEditingCourseId(null)}
        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-bold cursor-pointer text-xs"
      >
                            Annuler
                          </button>
                        </div>
                      </div>;
    }
    return <div
      key={item.id}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-200"
    >
                      {
      /* Header Badge & Image Type info */
    }
                      <div className="p-5 border-b border-indigo-50/50 flex-grow">
                        <div className="flex justify-between items-start gap-2 mb-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.type === "course" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : item.type === "exercise" ? "bg-amber-50 text-amber-900 border border-amber-200" : "bg-blue-50 text-blue-900 border border-blue-200"}`}>
                            {item.type === "course" ? "📚 Cours" : item.type === "exercise" ? "✍️ Exercice" : "🎥 Vidéo"}
                          </span>

                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold capitalize">
                            {item.module === "web" ? "💻 Dev Web" : item.module === "marketing" ? "📊 Marketing" : item.module === "securite" ? "🔒 Sécu" : "📈 Data"}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 leading-tight text-base mb-2">{item.title}</h3>
                        <p className="text-slate-500 text-xs line-clamp-3 mb-4">{item.description || item.statement}</p>
                        
                        {
      /* Instructor Author or detail tags */
    }
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span className="font-semibold text-slate-500">{item.author}</span>
                          <span>•</span>
                          <span>
                            {item.duration ? `${item.duration}h` : item.time ? `${item.time} minutes` : ""}
                          </span>
                        </div>
                      </div>

                      {
      /* Read More button & Completed status bar */
    }
                      <div className="bg-slate-50/80 px-5 py-3.5 border-t border-slate-100 flex items-center justify-between gap-1.5">
                        
                        <div className="flex items-center gap-1.5">
                          <button
      onClick={() => {
        if (item.type === "course") {
          setSelectedCourse(item);
        } else if (item.type === "exercise") {
          setSelectedExercise(item);
          setExerciseAnswer("");
          setExerciseResult(null);
        } else {
          setSelectedCourse({
            ...item,
            content: `
                                    <div className="aspect-w-16 aspect-h-9 mb-4">
                                      <iframe src="${item.url}" class="w-full h-80 rounded-lg shadow-sm mb-4" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                    </div>
                                    <h3>À regarder avant : ${item.prerequisites || "Aucun prérequis"}</h3>
                                    <p class="text-slate-600 mt-2">${item.description}</p>
                                  `
          });
        }
      }}
      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 transition-all cursor-pointer whitespace-nowrap"
    >
                            Étudier <ChevronRight className="h-3 w-3" />
                          </button>

                          {item.type === "course" && <button
      onClick={() => {
        setEditingCourseId(item.id);
        setEditCourseTitle(item.title);
        setEditCourseModule(item.module);
        setEditCourseDesc(item.description || "");
        setEditCourseContent(item.content || "");
        setEditCourseDuration(item.duration?.toString() || "");
        setEditCourseAuthor(item.author || "");
      }}
      className="text-[10px] font-bold bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center gap-0.5 transition-all cursor-pointer shadow-xs whitespace-nowrap"
      title="Modifier ce cours"
      id={`btn-open-edit-${item.id}`}
    >
                              <Edit3 className="h-2.5 w-2.5" /> Modifier
                            </button>}
                        </div>

                        <button
      onClick={() => {
        if (item.type === "course") {
          toggleCourseCompletion(item.id);
        } else if (item.type === "video") {
          toggleVideoCompletion(item.id);
        } else {
          setSelectedExercise(item);
          setExerciseAnswer("");
          setExerciseResult(null);
        }
      }}
      className={`text-xs gap-1 flex items-center font-semibold px-2.5 py-1 rounded-full border transition-colors ${isCompleted ? "bg-emerald-100 text-emerald-900 border-emerald-300" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"}`}
    >
                          <Check className={`h-3 w-3 ${isCompleted ? "opacity-100" : "opacity-30"}`} />
                          {isCompleted ? "Validé" : "Fait ?"}
                        </button>

                      </div>
                    </div>;
  })}
            </div>

            {
    /* ADD NEW COURSE MODAL */
  }
            {showAddCourseModal && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in animate-once">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
                  <div className="p-6 border-b border-slate-100 sticky top-0 bg-white flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider block mb-1">
                        Université CFA • Bibliothèque
                      </span>
                      <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-emerald-600" /> Ajouter un nouveau cours théorique
                      </h2>
                    </div>
                    <button
    type="button"
    onClick={() => setShowAddCourseModal(false)}
    className="p-1 text-slate-400 hover:text-slate-900 rounded-lg bg-slate-100 cursor-pointer"
  >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>

                  <form onSubmit={handlePublishCourse} className="p-6 space-y-4 text-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Titre du cours *</label>
                        <input
    type="text"
    required
    value={newCourseTitle}
    onChange={(e) => setNewCourseTitle(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Thématique / Module *</label>
                          <select
    value={newCourseModule}
    onChange={(e) => setNewCourseModule(e.target.value)}
    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-700"
  >
                            <option value="web">💻 Développement Web</option>
                            <option value="marketing">📊 Marketing Digital</option>
                            <option value="securite">🔒 Cybersécurité</option>
                            <option value="data">📈 Data Science</option>
                            <option value="Réseaux">🌍  Réseaux Informatiques</option>
                            <option value="Cloud">☁️ Cloud Computing</option>
                            <option value="systeme">🖧  Administration Système</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Durée (en heures) *</label>
                          <input
    type="number"
    required
    min="0.5"
    step="0.5"
    value={newCourseDuration}
    onChange={(e) => setNewCourseDuration(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Auteur / Enseignant *</label>
                      <input
    type="text"
    required
    value={newCourseAuthor}
    onChange={(e) => setNewCourseAuthor(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-emerald-800"
  />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Description courte *</label>
                      <input
    type="text"
    required
    value={newCourseDesc}
    onChange={(e) => setNewCourseDesc(e.target.value)}
    placeholder="Description rapide qui sera visible sur les fiches de cours..."
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Contenu détaillé (support de cours) *</label>
                      <textarea
    required
    rows={6}
    value={newCourseContent}
    onChange={(e) => setNewCourseContent(e.target.value)}
    placeholder="<h3>Introduction</h3> <p>Dans cette section apprenez à manipuler...</p>"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                      <button
    type="button"
    onClick={() => setShowAddCourseModal(false)}
    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
  >
                        Annuler
                      </button>
                      <button
    type="submit"
    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow transition-colors flex items-center gap-1.5 cursor-pointer"
  >
                        <Save className="h-3.5 w-3.5" /> Publier le cours
                      </button>
                    </div>
                  </form>
                </div>
              </div>}

            {
    /* EXPANDED STUDY COURSE DIALOG MODAL */
  }
            {selectedCourse && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
                  <div className="p-6 border-b border-slate-100 sticky top-0 bg-white flex justify-between items-start gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 z-10 px-2 py-0.5 rounded uppercase tracking-wider block mb-1">
                        Université CFA • Cours Académique
                      </span>
                      <h2 className="text-xl font-bold font-display text-slate-900">{selectedCourse.title}</h2>
                    </div>
                    <button
    onClick={() => setSelectedCourse(null)}
    className="p-1 text-slate-400 hover:text-slate-900 rounded-lg bg-slate-100"
  >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-6">
                    {
    /* Content body with HTML parse support safely */
  }
                    <div
    className="prose prose-emerald max-w-none text-sm text-slate-700 space-y-3"
    dangerouslySetInnerHTML={{ __html: selectedCourse.content }}
  />

                    {
    /* Meta info block */
  }
                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-400">
                      <div>
                        Rédigé par <span className="font-semibold text-slate-600">{selectedCourse.author}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
    onClick={() => {
      toggleCourseCompletion(selectedCourse.id);
      setSelectedCourse(null);
    }}
    className={`px-4 py-2 rounded-lg font-bold gap-1.5 flex items-center transition-all ${selectedCourse.completedBy?.includes(username) ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
  >
                          <Check className="h-4 w-4" /> Mark list as {selectedCourse.completedBy?.includes(username) ? "uncompleted" : "completed"}
                        </button>
                        <button
    onClick={() => askPopularQuestion(`Peux-tu m'expliquer le cours "${selectedCourse.title}" ?`)}
    className="px-3 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold rounded-lg flex items-center gap-1"
  >
                          <Bot className="h-4 w-4 text-emerald-600" /> 
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

            {
    /* EXPANDED INTERACTIVE EXERCISE MODAL solver */
  }
            {selectedExercise && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-indigo-50 sticky top-0 bg-white flex justify-between items-start">
                    <div>
                      <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                        🧩 Challenge Pédagogique • {selectedExercise.difficulty}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1">{selectedExercise.title}</h2>
                    </div>
                    <button
    onClick={() => setSelectedExercise(null)}
    className="p-1 text-slate-400 hover:text-slate-900 bg-slate-100 rounded-lg"
  >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    
                    {
    /* Problem Statement Box */
  }
                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-300">
                      <p className="text-sm text-slate-800 font-medium whitespace-pre-wrap">{selectedExercise.statement}</p>
                    </div>

                    {
    /* Hint Drawer */
  }
                    <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg text-xs text-amber-900">
                      <p className="font-bold flex items-center gap-1">
                        <HelpCircle className="h-3.5 w-3.5 text-amber-700" /> Indice de résolution :
                      </p>
                      <p className="mt-1">{selectedExercise.hint || "Analysez attentivement la signature attendue !"}</p>
                    </div>

                    {
    /* Solver Playground Form */
  }
                    <form onSubmit={testCurrentExerciseSolution} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 block mb-1 uppercase tracking-wide">
                          Rédigez votre code ci-dessous
                        </label>
                        <textarea
    rows={4}
    value={exerciseAnswer}
    onChange={(e) => setExerciseAnswer(e.target.value)}
    placeholder="const calculerRemise = ..."
    className="w-full font-mono text-xs p-3 bg-slate-950 text-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
  />
                      </div>

                      {
    /* Display solver output results */
  }
                      {exerciseResult && <div className={`p-4 rounded-xl text-xs font-semibold ${exerciseResult.success ? "bg-emerald-50 text-emerald-900 border border-emerald-300" : "bg-rose-50 text-rose-900 border border-rose-200"}`}>
                          <p>{exerciseResult.msg}</p>
                        </div>}

                      <div className="flex justify-between items-center pt-2">
                        <button
    type="button"
    onClick={() => {
      setExerciseAnswer(selectedExercise.solution);
      triggerNotification("Cheat-sheet : Solution affichée !");
    }}
    className="text-xs text-slate-400 hover:text-slate-600 underline font-medium"
  >
                          Afficher la solution de référence
                        </button>

                        <div className="flex gap-2">
                          <button
    type="submit"
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 font-bold rounded-lg text-xs"
  >
                            Tester mon algorithme
                          </button>
                          <button
    type="button"
    onClick={() => askPopularQuestion(`Aide-moi à résoudre l'exercice : "${selectedExercise.statement}"`)}
    className="bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 px-3 py-2 font-bold rounded-lg text-xs flex items-center gap-1"
  >
                            <Bot className="h-4.5 w-4.5 text-emerald-600" /> IA Tutor
                          </button>
                        </div>
                      </div>

                    </form>

                  </div>
                </div>
              </div>}

          </div>}

        {
    /* ========================================================== */
  }
        {
    /* TABS 3: TABLEAU DE BORD - DETAILED PROFILE TRACKERS */
  }
        {
    /* ========================================================== */
  }
        {activeTab === "dashboard" && <div id="view-dashboard" className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            
            {
    /* Header Welcome Card */
  }
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
              {!isEditingProfile ? <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="bg-emerald-600 text-white rounded-full p-4 shrink-0 shadow-sm">
                      <UserCheck className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
                          Espace Apprenti : {profileName === "etudiant" ? "kevine" : profileName}
                        </h1>
                        <span className="bg-emerald-50 text-emerald-850 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-150">
                          Rôle : Étudiant
                        </span>
                      </div>
                      <p className="text-slate-700 text-xs font-semibold mt-1">{profileSpecialty}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">✉️ <span className="font-mono">{profileEmail}</span></span>
                        <span className="flex items-center gap-1">📞 <span className="font-mono">{profilePhone}</span></span>
                      </div>
                    </div>
                  </div>

                  {
    /* Actions */
  }
                  <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end w-full md:w-auto">
                    <button
    onClick={() => setIsEditingProfile(true)}
    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
  >
                      <Edit3 className="h-3.5 w-3.5" /> Modifier mes infos
                    </button>
                    <button
    onClick={() => addTrainingHours(7)}
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
  >
                      + Enregistrer mes heures de stage
                    </button>
                  </div>
                </div> : <form
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const name = form.elements.namedItem("profile_name").value;
      const email = form.elements.namedItem("profile_email").value;
      const phone = form.elements.namedItem("profile_phone").value;
      const specialty = form.elements.namedItem("profile_specialty").value;
      handleSaveProfile(name, email, phone, specialty);
    }}
    className="space-y-4"
  >
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                    <Edit3 className="h-5 w-5 text-emerald-600" />
                    <h2 className="text-base font-bold text-slate-800">Modifier mon profil apprenti</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                        Nom Prénom *
                      </label>
                      <input
    name="profile_name"
    type="text"
    defaultValue={profileName}
    required
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
  />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                        Parcours / Spécialité *
                      </label>
                      <input
    name="profile_specialty"
    type="text"
    defaultValue={profileSpecialty}
    required
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
  />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                        Adresse Email *
                      </label>
                      <input
    name="profile_email"
    type="email"
    defaultValue={profileEmail}
    required
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
  />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                        Numéro de téléphone
                      </label>
                      <input
    name="profile_phone"
    type="text"
    defaultValue={profilePhone}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
  />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
    type="button"
    onClick={() => setIsEditingProfile(false)}
    className="px-3.5 py-1.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
  >
                      Annuler
                    </button>
                    <button
    type="submit"
    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-600/10"
  >
                      <Save className="h-3.5 w-3.5" /> Sauvegarder
                    </button>
                  </div>
                </form>}
            </div>

            {
    /* Metrics grid statistics */
  }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {
    /* Stat card 1 */
  }
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="bg-emerald-50 text-emerald-800 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Heures en entreprise</h3>
                <p className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  {stats?.hoursDone || 0} / {stats?.hoursTotal || 350}h
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div
    className="bg-emerald-500 h-2 rounded-full transition-all"
    style={{ width: `${Math.min(100, (stats?.hoursDone || 0) / (stats?.hoursTotal || 350) * 100)}%` }}
  />
                </div>
              </div>

              {
    /* Stat card 2 */
  }
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="bg-emerald-50 text-emerald-800 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Modules d'études validés</h3>
                <p className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  {stats?.validatedModules || 0} / {stats?.maxModules || 12}
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div
    className="bg-emerald-500 h-2 rounded-full transition-all"
    style={{ width: `${Math.min(100, (stats?.validatedModules || 0) / (stats?.maxModules || 12) * 100)}%` }}
  />
                </div>
                <button
    onClick={validateCompetenceModule}
    className="mt-2 text-[10px] text-emerald-700 font-bold hover:underline block text-left"
  >
                  Déclarer un module validé
                </button>
              </div>

              {
    /* Stat card 3 */
  }
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
                <div className="bg-emerald-50 text-emerald-800 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Entreprise Partenaire Rattachée</h3>
                <p className="text-base font-black text-slate-900 mt-1">{stats?.companyName}</p>
                <p className="text-xs text-slate-500">Tuteur Professionnel : {stats?.tutorName || "M. Martin Dubois"}</p>
                <p className="text-[10px] font-mono mt-3 text-slate-400">Statut Convention : Active depuis le 01/01/2026</p>
              </div>

            </div>

            {
    /* Grid 2 Columns Info Scheduling and recent feed */
  }
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {
    /* Upcoming class details */
  }
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900">Prochaines Séances CFA</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-100 rounded-xl border-l-4 border-emerald-600">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Demain 14H00</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-0.5">{stats?.nextCourse}</h4>
                    <span className="text-xs text-slate-500 block mt-2">{stats?.courseLocation}</span>
                  </div>
                  
                  <div className="p-4 bg-slate-550/5 text-slate-600 rounded-xl text-xs space-y-2">
                    <p className="font-bold text-slate-800">Besoin d'aide administrative ?</p>
                    <p>Déposez vos conventions d'études au secrétariat général ou ouvrez l'assistant éducatif étudiant d'Université CFA.</p>
                  </div>
                </div>
              </div>

              {
    /* Activities and Notifications feed */
  }
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-1 lg:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-emerald-600 animate-swing" />
                      <h3 className="font-bold text-slate-900">Activités et Notifications</h3>
                    </div>
                    {stats?.activities && stats.activities.length > 0 && <button
    onClick={clearDashboardActivities}
    className="text-xs text-slate-450 hover:text-slate-600 flex items-center gap-1 font-semibold"
  >
                        <Trash2 className="h-3.5 w-3.5" /> Tout effacer
                      </button>}
                  </div>

                  <div className="space-y-3">
                    {!stats?.activities || stats.activities.length === 0 ? <p className="text-slate-400 text-xs py-6 text-center border border-dashed rounded-xl">Aucune nouvelle activité à signaler récemment.</p> : stats.activities.map((act) => <div key={act.id} className="flex gap-3 text-xs justify-between items-start py-2 border-b border-slate-100 last:border-b-0">
                          <div className="flex gap-2">
                            <span className="p-1 bg-emerald-50 text-emerald-800 rounded mt-0.5">✔</span>
                            <span className="text-slate-700 font-medium">{act.text}</span>
                          </div>
                          <span className="text-[10px] text-slate-405 shrink-0 whitespace-nowrap">{act.date}</span>
                        </div>)}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Évaluation intermédiaire prévue fin juin 2026</span>
                  <button
    onClick={() => setActiveTab("cours")}
    className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
  >
                    Aller s'exercer <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {
    /* Student Documents list with fast print capability */
  }
            {userRole === "etudiant" && <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                  <FileCheck className="h-5 w-5 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Documents administratifs et Reçus fiscaux</h3>
                    <p className="text-[11px] text-slate-500">Accédez, visualisez et imprimez vos documents officiels certifiés.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {
    /* Attestations card */
  }
                  <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 tracking-wider">Mes Attestations d'Assiduité</span>
                    
                    {attestations.filter((a) => a.studentName === "kevine" || a.studentName === profileName).length === 0 ? <p className="text-xs text-slate-400 italic">Aucune attestation disponible pour le moment.</p> : <div className="space-y-3">
                        {attestations.filter((a) => a.studentName === "kevine" || a.studentName === profileName).map((att) => <div key={att.id} className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-slate-800">{att.courseTitle}</p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{att.reference}</p>
                            </div>
                            <div className="flex gap-1.5 animate-pulse-once">
                              <button
    onClick={() => setSelectedAttestation(att)}
    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1.5 rounded-md text-[11px] cursor-pointer"
  >
                                👁️ Vu
                              </button>
                              <button
    onClick={() => handlePrintAttestation(att)}
    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-250 border font-bold px-2.5 py-1.5 rounded-md text-[11px] cursor-pointer flex items-center gap-1"
  >
                                <Printer className="h-3 w-3" /> Imprimer
                              </button>
                            </div>
                          </div>)}
                      </div>}
                  </div>

                  {
    /* Receipts card */
  }
                  <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 tracking-wider">Mes Reçus Fiscaux OPCO</span>
                    
                    {receipts.filter((r) => r.studentName === "Jean-Marc LENOIR" || r.studentName === profileName).length === 0 ? <p className="text-xs text-slate-400 italic">Aucun reçu fiscal disponible pour le moment.</p> : <div className="space-y-3">
                        {receipts.filter((r) => r.studentName === "Jean-Marc LENOIR" || r.studentName === profileName).map((rec) => <div key={rec.id} className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-slate-850">Reçu {rec.id}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{rec.opco} • <strong className="text-emerald-700">{(rec.amount * 5e3).toLocaleString("fr-FR")} MGA ({rec.amount.toLocaleString("fr-FR")} €)</strong></p>
                            </div>
                            <div className="flex gap-1.5">
                              <button
    onClick={() => setSelectedReceipt(rec)}
    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1.5 rounded-md text-[11px] cursor-pointer"
  >
                                👁️ Vu
                              </button>
                              <button
    onClick={() => handlePrintReceipt(rec)}
    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-250 border font-bold px-2.5 py-1.5 rounded-md text-[11px] cursor-pointer flex items-center gap-1"
  >
                                <Printer className="h-3 w-3" /> Imprimer
                              </button>
                            </div>
                          </div>)}
                      </div>}
                  </div>
                </div>
              </div>}

          </div>}

        {
    /* ========================================================== */
  }
        {
    /* TABS 4: DISCUSSIONS - REAL MESSAGING PANEL */
  }
        {
    /* ========================================================== */
  }
        {activeTab === "discussion" && <div id="view-discussion" className="max-w-7xl mx-auto px-4 py-8 animate-fade-in1">
            
            <div className="mb-8 border-b border-indigo-50/50 pb-4 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                  <MessageSquare className="h-8 w-8 text-emerald-600" /> Mon Espace Messagerie
                </h1>
                <p className="text-slate-450 text-xs mt-1">Discutez en direct avec vos encadrants pédagogiques et formateurs.</p>
              </div>

              <button
    onClick={() => {
      setNewConvOpen(true);
    }}
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1"
  >
                <Plus className="h-4 w-4" /> Nouvelle conversation
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white min-h-[550px] rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              
              {
    /* Left Column Conversations List */
  }
              <div className="col-span-1 border-r border-slate-200">
                <div className="p-4 bg-slate-100/50 border-b border-slate-200">
                  <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Vos discussions d'alternance</h3>
                </div>

                <div className="divide-y divide-slate-100 overflow-y-auto max-h-[500px]">
                  {conversations.length === 0 ? <p className="text-xs text-slate-400 p-4 text-center">Aucune discussion ouverte.</p> : conversations.map((conv) => {
    const isActive = activeChatChannel === conv.id;
    return <div
      key={conv.id}
      onClick={() => setActiveChatChannel(conv.id)}
      className={`p-4 cursor-pointer hover:bg-slate-100/60 transition-colors ${isActive ? "bg-emerald-50 border-l-4 border-emerald-600" : ""}`}
    >
                          <div className="flex justify-between items-start gap-1">
                            <span className="font-bold text-slate-900 text-xs">{conv.partnerName}</span>
                            <span className="text-[9px] text-slate-400 shrink-0">
                              {new Date(conv.timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-[10px] text-emerald-800 font-semibold truncate mt-0.5">{conv.subject}</p>
                          <p className="text-[11px] text-slate-500 truncate mt-1">{conv.lastMessage}</p>
                        </div>;
  })}
                </div>
              </div>

              {
    /* Right Column Messages thread */
  }
              <div className="col-span-1 lg:col-span-3 flex flex-col justify-between">
                
                {activeChatChannel ? <>
                    {
    /* Header */
  }
                    <div className="p-4 border-b border-indigo-50/50 bg-slate-100/40 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-black text-slate-900">{activeChatChannel}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded ml-2 font-bold">
                          En ligne
                        </span>
                      </div>
                      <button
    onClick={() => setActiveChatChannel(null)}
    className="text-xs text-slate-400 hover:text-red-650"
  >
                        Masquer
                      </button>
                    </div>

                    {
    /* Chat Messages */
  }
                    <div id="msg-container" className="p-6 overflow-y-auto space-y-4 flex-grow max-h-[380px] bg-slate-100/10">
                      {messages.filter((m) => m.from === activeChatChannel || m.to === activeChatChannel || m.fromName === activeChatChannel).map((m) => {
    const isMe = m.fromRole === userRole;
    return <div
      key={m.id}
      className={`flex flex-col max-w-[70%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
    >
                              <span className="text-[10px] text-slate-450 mb-1 font-semibold">
                                {m.fromName}
                              </span>
                              <div className={`p-3 rounded-2xl text-xs ${isMe ? "bg-emerald-600 text-white rounded-br-none" : "bg-white text-slate-800 rounded-bl-none border border-slate-200"}`}>
                                <p className="whitespace-pre-wrap">{m.content}</p>
                              </div>
                              <span className="text-[9px] text-slate-400 mt-1">
                                {new Date(m.timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>;
  })}
                    </div>

                    {
    /* Input message action block */
  }
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2 bg-slate-100/20">
                      <input
    type="text"
    value={newMessageText}
    onChange={(e) => setNewMessageText(e.target.value)}
    placeholder="Répondez à votre formateur ou correspondant..."
    className="flex-grow px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
  />
                      <button
    type="submit"
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-xs shrink-0 flex items-center gap-1 cursor-pointer"
  >
                        <Send className="h-4 w-4" /> Répondre
                      </button>
                    </form>
                  </> : <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                    <MessageSquare className="h-12 w-12 text-slate-300 mb-4" />
                    <h3 className="font-bold text-slate-800">Sélectionnez une conversation d'étude</h3>
                    <p className="text-slate-400 text-xs mt-1">Cliquez sur un contact à gauche ou initiez une nouvelle discussion.</p>
                  </div>}

              </div>
            </div>

            {
    /* NEW DISCUSSION MODAL OVERLAY */
  }
            {newConvOpen && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full">
                  <div className="p-6 border-b border-indigo-50 flex justify-between items-center bg-slate-100/30">
                    <h3 className="font-bold text-slate-900 font-display flex items-center gap-2">
                      <Plus className="h-5 w-5 text-emerald-600" /> Initier une discussion académique
                    </h3>
                    <button
    onClick={() => setNewConvOpen(false)}
    className="p-1 text-slate-400 hover:text-slate-800"
  >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>

                  <form onSubmit={handleStartConversation} className="p-6 space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-650 uppercase block mb-1">Destinataire *</label>
                      <select
    required
    value={newConvTo}
    onChange={(e) => setNewConvTo(e.target.value)}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  >
                        <option value="">Sélectionner un formateur référent</option>
                        <option value="formateur_principal">👨‍🏫 M. Bernard (Directeur Pédagogique)</option>
                        <option value="formateur_web">💻 Mr Deraina (Formateur Web & React)</option>
                        <option value="formateur_marketing">📊 M. Kevine (Formateur Marketing & SEO)</option>
                        <option value="formateur_secu">🔒 M.  Martin (Formateur Sécurité)</option>
                        <option value="formateur_data">📈 Mme Marie (Formateur Data)</option>
                        <option value="formateur_Logiciel">🖥️ Mr Jack (Formateur Logiciel)</option>
                        <option value="formateur_réseaux">🌍 Mlle Julie (Formateur Réseaux)</option>
                        <option value="formateur_cloud">☁️ Mlle Tahiana (Formateur cloud)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-650 uppercase block mb-1">Thème de discussion *</label>
                      <input
    type="text"
    required
    value={newConvSubject}
    onChange={(e) => setNewConvSubject(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-650 uppercase block mb-1">Premier message *</label>
                      <textarea
    rows={4}
    required
    value={newConvFirstMsg}
    onChange={(e) => setNewConvFirstMsg(e.target.value)}
    placeholder="Bonjour, je souhaitais soumettre ma question au sujet de..."
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg text-slate-800"
  />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
    type="button"
    onClick={() => setNewConvOpen(false)}
    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold"
  >
                        Annuler
                      </button>
                      <button
    type="submit"
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
  >
                        Démarrer le dialogue
                      </button>
                    </div>
                  </form>
                </div>
              </div>}

          </div>}

        {activeTab === "attestations" && <div id="view-attestations" className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            {
    /* Guard */
  }
            {userRole !== "admin" ? <div className="bg-white p-8 rounded-2xl border border-red-200 mt-6 shadow-md max-w-lg mx-auto text-center">
                <AlertCircle className="h-16 w-16 text-red-650 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-900 font-display">Accès Interdit / Restreint/attention</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Cet espace est strictement réservé au corps d'encadrement administratif de l'Université CFA. Votre profil Apprenti / Étudiant ne vous autorise pas à éditer des attestations d'assiduité.
                </p>
                <button
    onClick={() => setActiveTab("accueil")}
    className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
  >
                  Retourner à l'accueil
                </button>
              </div> : <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                      <FileCheck className="h-8 w-8 text-emerald-600" /> Gestion des Attestations Universitaires
                    </h1>
                    <p className="text-slate-500 text-xs mt-1">Générez et validez les fiches de compétences et d'assiduité d'apprentissage de vos apprentis.</p>
                  </div>
                </div>

                {
    /* KPI Metrics */
  }
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="bg-emerald-50 text-emerald-800 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Apprentis Enregistrés</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">3 Apprentis</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="bg-emerald-50 text-emerald-800 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Générées & Actives</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {attestations.filter((a) => a.status === "genere").length} Attestations
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="bg-slate-100 text-slate-700 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Eligibles en Attente</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">
                      {attestations.filter((a) => a.status === "eligible").length} dossiers
                    </span>
                  </div>
                </div>

                {
    /* Students board grid */
  }
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden mb-8">
                  <div className="p-5 border-b border-slate-150 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">Registre des Attestations de Formation</h3>
                      <p className="text-[11px] text-slate-400">Gérez, éditez et imprimez .</p>
                    </div>
                    <div>
                      <button
    onClick={() => {
      setAttEditingId(null);
      setAttFormStudentName("");
      setAttFormCourseTitle("");
      setAttFormHoursDone("350");
      setAttFormHoursRequired("350");
      setAttFormValidatedModules("12");
      setAttFormStatus("genere");
      setAttFormReference("");
      setAttFormDateGenerated("");
      setAttShowForm(true);
    }}
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
    id="btn-add-attestation"
  >
                        <Plus className="h-4 w-4" /> Ajouter
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 text-slate-500 font-bold uppercase border-b border-slate-150">
                          <th className="p-4">Apprenti / Spécialisation</th>
                          <th className="p-4">Heures Réalisées</th>
                          <th className="p-4">Examens Validés</th>
                          <th className="p-4">Statut d'éligibilité</th>
                          <th className="p-4 text-right">Actions administratives</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {attestations.map((att) => <tr key={att.id} className="hover:bg-slate-50/40 transition-colors">
                            <td className="p-4">
                              <p className="font-bold text-slate-900 text-sm">{att.studentName}</p>
                              <p className="text-slate-500 text-[10px]">{att.courseTitle}</p>
                              {att.reference && <p className="text-emerald-700 font-mono text-[9px] mt-0.5">{att.reference}</p>}
                            </td>
                            <td className="p-4 font-mono font-semibold">
                              {att.hoursDone}h / {att.hoursRequired}h
                            </td>
                            <td className="p-4 font-mono">
                              {att.validatedModules} parcours validés
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${att.status === "genere" ? "bg-emerald-100 text-emerald-800" : att.status === "eligible" ? "bg-blue-100 text-blue-850" : "bg-red-100 text-red-800"}`}>
                                {att.status === "genere" ? "Générée & Signée" : att.status === "eligible" ? "Dossier Éligible" : "Heures Insuffisantes"}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2 whitespace-nowrap">
                              <button
    onClick={() => {
      setAttEditingId(att.id);
      setAttFormStudentName(att.studentName);
      setAttFormCourseTitle(att.courseTitle);
      setAttFormHoursDone(att.hoursDone.toString());
      setAttFormHoursRequired(att.hoursRequired.toString());
      setAttFormValidatedModules(att.validatedModules.toString());
      setAttFormStatus(att.status);
      setAttFormReference(att.reference || "");
      setAttFormDateGenerated(att.dateGenerated || "");
      setAttShowForm(true);
    }}
    className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1.5 border border-blue-200 rounded-lg font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
    title="Modifier cette attestation"
    id={`btn-edit-att-${att.id}`}
  >
                                <Edit3 className="h-3.5 w-3.5" /> Modifier
                              </button>

                              <button
    onClick={() => handleDeleteAttestation(att.id)}
    className="bg-red-50 hover:bg-red-100 text-red-700 px-2.5 py-1.5 border border-red-200 rounded-lg font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
    title="Supprimer cette attestation"
    id={`btn-delete-att-${att.id}`}
  >
                                <Trash2 className="h-3.5 w-3.5" /> Supprimer
                              </button>

                              <button
    onClick={() => handlePrintAttestation(att)}
    className="bg-amber-50 hover:bg-amber-100 text-amber-800 px-2.5 py-1.5 border border-amber-200 rounded-lg font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
    title="Imprimer cette attestation"
    id={`btn-print-att-${att.id}`}
  >
                                <Printer className="h-3.5 w-3.5" /> Imprimer
                              </button>

                              {att.status === "genere" ? <button
    onClick={() => setSelectedAttestation(att)}
    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 border border-emerald-250 rounded-lg font-bold text-[11px] cursor-pointer inline-flex items-center gap-1"
  >
                                  👁️ Afficher
                                </button> : att.status === "eligible" ? <button
    onClick={() => handleGenerateCertificate(att.id)}
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] shadow-sm cursor-pointer animate-pulse inline-flex items-center gap-1"
  >
                                  ⚙️ Générer
                                </button> : <button
    disabled
    className="bg-slate-100 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] cursor-not-allowed inline-flex items-center gap-1"
  >
                                  En attente
                                </button>}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>

                {
    /* Certificate overlay view modal */
  }
                {selectedAttestation && <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl w-full border border-slate-250 relative animate-fade-in text-slate-800">
                      
                      {
    /* Close */
  }
                      <button
    onClick={() => setSelectedAttestation(null)}
    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-full cursor-pointer"
  >
                        ✕
                      </button>

                      <div className="border-4 border-double border-emerald-850 p-6 sm:p-8 text-center bg-slate-50 select-none">
                        <GraduationCap className="h-12 w-12 text-emerald-700 mx-auto mb-3" />
                        
                        <h2 className="font-display font-black text-2xl text-emerald-955 tracking-tight uppercase">
                          Université CFA 
                        </h2>
                        <p className="text-[9px] font-mono tracking-widest text-slate-500 uppercase mt-1">
                          ÉTABLISSEMENT D'ENSEIGNEMENT SUPÉRIEUR ET ALTERNANCE AGRÉÉ
                        </p>

                        <div className="w-1/3 h-0.5 bg-emerald-855 mx-auto my-4" />

                        <h3 className="font-serif italic text-lg sm:text-xl font-bold text-slate-800 my-4">
                          ATTESTATION ADMINISTRATIVE D'ASSIDUITÉ ET DE RÉUSSITE
                        </h3>

                        <p className="text-slate-650 text-xs leading-relaxed max-w-lg mx-auto">
                          Par la présente, la direction de l'Université CFA certifie sous le sceau de l'école que l'apprenti(e) :
                        </p>

                        <p className="font-display font-black text-xl text-slate-900 my-3 tracking-tight">
                          {selectedAttestation.studentName}
                        </p>

                        <p className="text-slate-650 text-xs leading-relaxed max-w-lg mx-auto">
                          A suivi et validé avec assiduité et succès son enseignement théorique et académique rattaché aux modules de :
                        </p>

                        <p className="font-bold text-emerald-800 text-sm my-2">
                          {selectedAttestation.courseTitle}
                        </p>

                        <p className="text-slate-650 text-xs leading-relaxed max-w-lg mx-auto">
                          L'élève a validé un total agrégé de <strong className="text-slate-900">{selectedAttestation.hoursDone} heures</strong> d'ateliers professionnels, ainsi que l'ensemble des livrables requis dans notre référentiel 2026.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200/60 text-[10px]">
                          <div className="text-left">
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Référence d'enregistrement</p>
                            <p className="font-mono font-bold text-slate-700">{selectedAttestation.reference}</p>
                            <p className="text-slate-450 mt-1">Généré le: {selectedAttestation.dateGenerated}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Le Directeur Pédagogique</p>
                            <p className="font-serif italic font-semibold text-slate-800 mt-1">M.Kevine</p>
                            <p className="text-emerald-700 font-mono text-[9px] font-bold uppercase mt-2">✔ SIGNÉ ÉLECTRONIQUEMENT</p>
                          </div>
                        </div>
                      </div>

                      {
    /* Modal Footer Controls */
  }
                      <div className="mt-5 flex justify-end gap-2 text-xs">
                        <button
    onClick={() => handlePrintAttestation(selectedAttestation)}
    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg border cursor-pointer flex items-center gap-1.5"
  >
                          <Printer className="h-4 w-4 text-slate-500" /> Imprimer l'Attestation
                        </button>
                        <button
    onClick={() => {
      triggerNotification("Téléchargement du fichier de certification démarré !");
      setSelectedAttestation(null);
    }}
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg cursor-pointer"
  >
                          📥 Télécharger l'attestation (.PDF)
                        </button>
                      </div>

                    </div>
                  </div>}

                {
    /* ATTESTATION DIALOG FORM (ADD & EDIT) */
  }
                {attShowForm && <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full border border-slate-200 relative animate-fade-in text-slate-800">
                      <button
    onClick={() => {
      setAttShowForm(false);
      setAttEditingId(null);
    }}
    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-full cursor-pointer text-xs"
  >
                        ✕
                      </button>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                          <FileCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                            {attEditingId ? "✏️ Modifier l'Attestation" : "➕ Ajouter une Attestation"}
                          </h3>
                          <p className="text-[10px] text-slate-500">Renseignez les données administratives de l'apprenti.</p>
                        </div>
                      </div>

                      <form onSubmit={handleSaveAttestationForm} className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Nom complet de l'élève *</label>
                          <input
    type="text"
    required
    value={attFormStudentName}
    onChange={(e) => setAttFormStudentName(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg text-slate-800"
  />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Intitulé du parcours / Spécialisation *</label>
                          <input
    type="text"
    required
    value={attFormCourseTitle}
    onChange={(e) => setAttFormCourseTitle(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg text-slate-800"
  />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Heures Validées *</label>
                            <input
    type="number"
    required
    value={attFormHoursDone}
    onChange={(e) => setAttFormHoursDone(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg font-semibold text-slate-800"
  />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1 font-mono">Heures Requises *</label>
                            <input
    type="number"
    required
    value={attFormHoursRequired}
    onChange={(e) => setAttFormHoursRequired(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg font-semibold text-slate-800"
  />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1 font-mono">Modules validés *</label>
                            <input
    type="number"
    required
    value={attFormValidatedModules}
    onChange={(e) => setAttFormValidatedModules(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg text-slate-800"
  />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Statut d'éligibilité *</label>
                            <select
    value={attFormStatus}
    onChange={(e) => setAttFormStatus(e.target.value)}
    className="w-full px-2 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg font-semibold text-slate-800"
  >
                              <option value="genere">Générée & Signée</option>
                              <option value="eligible">Dossier Éligible</option>
                              <option value="non_eligible">Heures Insuffisantes</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1 font-mono">Référence unique</label>
                            <input
    type="text"
    value={attFormReference}
    onChange={(e) => setAttFormReference(e.target.value)}
    placeholder="Générée automatiquement"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg font-mono text-emerald-800"
  />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Date d'édition</label>
                            <input
    type="text"
    value={attFormDateGenerated}
    onChange={(e) => setAttFormDateGenerated(e.target.value)}
    placeholder="Aujourd'hui par défaut"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg text-slate-800"
  />
                          </div>
                        </div>

                        <div className="flex gap-2.5 pt-4">
                          <button
    type="submit"
    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer animate-fade-in"
  >
                            <Save className="h-4 w-4" /> Sauvegarder
                          </button>
                          <button
    type="button"
    onClick={() => {
      setAttShowForm(false);
      setAttEditingId(null);
    }}
    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer"
  >
                            Annuler
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>}
              </div>}
          </div>}

        {activeTab === "reçus" && <div id="view-reçus" className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            {
    /* Guard */
  }
            {userRole !== "admin" ? <div className="bg-white p-8 rounded-2xl border border-red-200 mt-6 shadow-md max-w-lg mx-auto text-center">
                <AlertCircle className="h-16 w-16 text-red-650 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-900 font-display">Accès Interdit / Restreint/attention</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Cet espace est strictement réservé au département financier et administratif de l'Université CFA. Vos autorisations ne vous permettent pas de gérer les reçus de financement scolaires.
                </p>
                <button
    onClick={() => setActiveTab("accueil")}
    className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
  >
                  Retourner à l'accueil
                </button>
              </div> : <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                      <Receipt className="h-8 w-8 text-emerald-600" /> Suivi Financier & Reçus OPCO
                    </h1>
                    <p className="text-slate-500 text-xs mt-1">Enregistrez et listez les reçus de paiement libératoires émis par les organismes de financement d’alternance (OPCO).</p>
                  </div>
                </div>

                {
    /* KPI Metrics */
  }
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="bg-emerald-50 text-emerald-800 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                      <Receipt className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Recouvré</span>
                    <span className="text-2xl font-black text-emerald-800 mt-1 block">
                      {(receipts.filter((r) => r.status === "paye").reduce((sum, item) => sum + item.amount, 0) * 5e3).toLocaleString("fr-FR")} MGA
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                      ({receipts.filter((r) => r.status === "paye").reduce((sum, item) => sum + item.amount, 0).toLocaleString("fr-FR")} €)
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="bg-amber-50 text-amber-850 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">En attente OPCO</span>
                    <span className="text-2xl font-black text-amber-700 mt-1 block">
                      {(receipts.filter((r) => r.status === "en_attente").reduce((sum, item) => sum + item.amount, 0) * 5e3).toLocaleString("fr-FR")} MGA
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                      ({receipts.filter((r) => r.status === "en_attente").reduce((sum, item) => sum + item.amount, 0).toLocaleString("fr-FR")} €)
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm font-sans">
                    <div className="bg-emerald-50 text-emerald-805 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Reçus Validés</span>
                    <span className="text-2xl font-black text-slate-900 mt-1 block">{receipts.length} émis</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  
                  {
    /* Ledger Board Table */
  }
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden lg:col-span-2">
                    <div className="p-5 border-b border-slate-150 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">Registre général des reçus de fonds</h3>
                        <p className="text-[11px] text-slate-400">Suivi des règlements et subventions OPCO.</p>
                      </div>
                      <div>
                        <button
    onClick={() => {
      setRecEditingId(null);
      setRecFormStudentName("");
      setRecFormOpco("");
      setRecFormAmount("");
      setRecFormMethod("Virement Bancaire SEPA");
      setRecFormStatus("paye");
      setRecFormDate("");
      setRecShowForm(true);
    }}
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
    id="btn-add-receipt"
  >
                          <Plus className="h-4 w-4" /> Ajouter
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50/30 text-slate-500 font-bold uppercase border-b border-slate-150 text-[10px]">
                            <th className="p-4">Référence / Date</th>
                            <th className="p-4">Apprenti & Organisme</th>
                            <th className="p-4">Montant Reçu</th>
                            <th className="p-4">Statut</th>
                            <th className="p-4 text-right">Actions administratives</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {receipts.map((r) => <tr key={r.id} className="hover:bg-slate-50/30 transition-colors">
                              <td className="p-4">
                                <p className="font-bold text-slate-900 font-mono">{r.id}</p>
                                <p className="text-slate-450 text-[10px]">{r.date}</p>
                              </td>
                              <td className="p-4">
                                <p className="font-bold text-slate-800">{r.studentName}</p>
                                <p className="text-slate-500 text-[10px] italic">{r.opco} • {r.method}</p>
                              </td>
                              <td className="p-4 font-mono text-slate-900">
                                <p className="font-bold text-emerald-800">{(r.amount * 5e3).toLocaleString("fr-FR")} MGA</p>
                                <p className="text-[10px] text-slate-400 font-bold">({r.amount.toLocaleString("fr-FR")} €)</p>
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${r.status === "paye" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                                  {r.status === "paye" ? "Traité & Payé" : "En cours"}
                                </span>
                              </td>
                              <td className="p-4 text-right whitespace-nowrap space-x-1.5">
                                <button
    onClick={() => {
      setRecEditingId(r.id);
      setRecFormStudentName(r.studentName);
      setRecFormOpco(r.opco);
      setRecFormAmount(r.amount.toString());
      setRecFormMethod(r.method);
      setRecFormStatus(r.status);
      setRecFormDate(r.date);
      setRecShowForm(true);
    }}
    className="bg-blue-50 hover:bg-blue-105 border border-blue-200 text-blue-700 px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
    title="Modifier ce reçu"
    id={`btn-edit-rec-${r.id}`}
  >
                                  <Edit3 className="h-3 w-3" /> Modifier
                                </button>

                                <button
    onClick={() => handleDeleteReceipt(r.id)}
    className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-750 px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
    title="Supprimer ce reçu"
    id={`btn-delete-rec-${r.id}`}
  >
                                  <Trash2 className="h-3 w-3" /> Supprimer
                                </button>

                                <button
    onClick={() => handlePrintReceipt(r)}
    className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
    title="Imprimer ce reçu"
    id={`btn-print-rec-${r.id}`}
  >
                                  <Printer className="h-3 w-3" /> Imprimer
                                </button>

                                <button
    onClick={() => setSelectedReceipt(r)}
    className="bg-slate-100 hover:bg-slate-200 border text-slate-700 px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
  >
                                  👁️ Détails
                                </button>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {
    /* Add & Edit Custom Receipt Box form sidebar */
  }
                  <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-2xl relative h-fit">
                    <h3 className="font-bold text-slate-950 mb-3 text-sm flex items-center gap-1.5 border-b pb-2">
                      {recEditingId ? <Edit3 className="h-4 w-4 text-blue-650" /> : <Plus className="h-4 w-4 text-emerald-600" />}
                      {recEditingId ? "✏️ Modifier le reçu" : "➕ Émettre un reçu"}
                    </h3>

                    <form onSubmit={handleSaveReceiptForm} className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Nom de l'Apprenti *</label>
                        <input
    type="text"
    required
    value={recFormStudentName}
    onChange={(e) => setRecFormStudentName(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg text-slate-850 focus:outline-none focus:ring-1 focus:ring-emerald-500"
  />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1 font-mono">OPCO ou Organisme *</label>
                        <input
    type="text"
    required
    value={recFormOpco}
    onChange={(e) => setRecFormOpco(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg text-slate-850 focus:outline-none focus:ring-1 focus:ring-emerald-500"
  />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1 font-mono">Montant (€) - Devise *</label>
                          <input
    type="number"
    required
    value={recFormAmount}
    onChange={(e) => setRecFormAmount(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg text-slate-850 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
  />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Mode *</label>
                          <select
    value={recFormMethod}
    onChange={(e) => setRecFormMethod(e.target.value)}
    className="w-full px-2 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-emerald-500"
  >
                            <option value="Virement Bancaire SEPA">Virement SEPA</option>
                            <option value="Prélèvement OPCO">Prélèvement OPCO</option>
                            <option value="Chèque certifié">Chèque</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Date d'édition</label>
                          <input
    type="text"
    value={recFormDate}
    onChange={(e) => setRecFormDate(e.target.value)}
    placeholder="Aujourd'hui par défaut"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg text-slate-850 focus:outline-none focus:ring-1 focus:ring-emerald-500"
  />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Statut *</label>
                          <select
    value={recFormStatus}
    onChange={(e) => setRecFormStatus(e.target.value)}
    className="w-full px-2 py-2 bg-slate-50 border border-slate-205 text-xs rounded-lg font-medium text-slate-850 focus:outline-none focus:ring-1 focus:ring-emerald-500"
  >
                            <option value="paye">Traité & Payé</option>
                            <option value="en_attente">En cours d'OPCO</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3">
                        <button
    type="submit"
    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1"
  >
                          <Save className="h-3.5 w-3.5" /> Sauvegarder
                        </button>
                        {recEditingId && <button
    type="button"
    onClick={() => {
      setRecEditingId(null);
      setRecFormStudentName("");
      setRecFormOpco("");
      setRecFormAmount("");
      setRecFormMethod("Virement Bancaire SEPA");
      setRecFormStatus("paye");
      setRecFormDate("");
    }}
    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-3 rounded-lg text-xs transition-all cursor-pointer"
  >
                            Annuler
                          </button>}
                      </div>
                    </form>
                  </div>

                </div>

                {
    /* Receipt Details visual representation Modal */
  }
                {selectedReceipt && <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full border border-slate-205 relative animate-fade-in text-slate-800">
                      
                      {
    /* Close */
  }
                      <button
    onClick={() => setSelectedReceipt(null)}
    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-1.5 rounded-full cursor-pointer"
  >
                        ✕
                      </button>

                      <div id="receipt-visual-sheet" className="p-6 bg-slate-50 border border-slate-200 rounded-xl select-none relative font-mono text-xs">
                        {
    /* CFA watermark badge header */
  }
                        <div className="flex justify-between items-start border-b border-dashed border-slate-350 pb-4 mb-4">
                          <div>
                            <span className="font-display font-black text-slate-900 tracking-tight text-sm block">UNIVERSITÉ CFA</span>
                            <span className="text-[9px] text-slate-400">SIRET: 894 112 003 4402 -Madagascar,France</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-slate-705 block text-[11px] uppercase">REÇU FISCAL</span>
                            <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-bold block mt-1">{selectedReceipt.id}</span>
                          </div>
                        </div>

                        {
    /* Invoice elements body fields */
  }
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Date d'émission :</span>
                            <span className="text-slate-900 font-bold">{selectedReceipt.date}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-slate-500">Pour l'apprenti :</span>
                            <span className="text-slate-900 font-bold">{selectedReceipt.studentName}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-500">Débiteur (Organisme) :</span>
                            <span className="text-slate-900 font-bold">{selectedReceipt.opco}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-500">Moyen de règlement :</span>
                            <span className="text-slate-900 font-bold">{selectedReceipt.method}</span>
                          </div>

                          <div className="border-t border-dashed border-slate-250 pt-3 flex justify-between items-center text-sm">
                            <span className="font-bold text-slate-600">Total Encaissé :</span>
                            <div className="text-right">
                              <p className="font-black text-emerald-800 text-base">{(selectedReceipt.amount * 5e3).toLocaleString("fr-FR")} MGA</p>
                              <p className="text-[11px] text-slate-400 font-bold">({selectedReceipt.amount.toLocaleString("fr-FR")} €)</p>
                            </div>
                          </div>
                        </div>

                        {
    /* Warning legal note */
  }
                        <div className="bg-white p-3 border border-slate-200 rounded-lg text-[10px] text-slate-450 leading-normal mt-5">
                          Université CFA  certifie avoir perçu les fonds susmentionnés au titre du financement de la scolarité de l'apprenti, conformément à la convention d'études 2026. Ce reçu a valeur de décharge libératoire pour l'exercice fiscal concerné.
                        </div>
                      </div>

                      {
    /* Modal Footer Controls */
  }
                      <div className="mt-5 flex justify-end gap-2 text-xs">
                        <button
    onClick={() => triggerNotification("Reçu envoyé à l'entreprise par email.")}
    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg cursor-pointer"
  >
                          ✉️ Envoyer à l'OPCO
                        </button>
                        <button
    onClick={() => handlePrintReceipt(selectedReceipt)}
    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg border cursor-pointer flex items-center gap-1.5"
  >
                          <Printer className="h-4 w-4 text-slate-500" /> Imprimer le reçu
                        </button>
                        <button
    onClick={() => setSelectedReceipt(null)}
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg cursor-pointer"
  >
                          Fermer la fiche
                        </button>
                      </div>

                    </div>
                  </div>}
              </div>}
          </div>}

        {
    /* ========================================================== */
  }
        {
    /* TABS 6: ESPACE FORMATEUR - TEACHING TOOLS & CONTROL PANEL */
  }
        {
    /* ========================================================== */
  }
        {activeTab === "formateur" && <div id="view-formateur" className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            {userRole !== "admin" ? <div className="bg-white p-8 rounded-2xl border border-red-200 mt-6 shadow-md max-w-lg mx-auto text-center">
                <AlertCircle className="h-16 w-16 text-red-650 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-900 font-display">Accès Interdit / Restreint</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Cet espace est strictement réservé au corps d'encadrement de l'Université CFA. Votre profil Apprenti / Étudiant ne vous autorise pas à éditer ou publier des supports pédagogiques.
                </p>
                <button
    onClick={() => setActiveTab("accueil")}
    className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
  >
                  Retourner à l'accueil
                </button>
              </div> : <>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8">
                  {!isEditingProfile ? <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-600 text-white rounded-lg p-3 shrink-0 shadow-sm">
                          <UserCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl font-extrabold text-slate-900 font-display">Console Pédagogique Enseignant</h1>
                            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-150">
                              Rôle : Administrateur / Formateur
                            </span>
                          </div>
                          <p className="text-xs text-slate-800 font-semibold mt-1">Connecté en tant que : {profileName === "Directeur Bernard" ? "Directeur Bernard" : profileName}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{profileSpecialty || "Directeur des Études • Bâtiment A"}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[11px] text-slate-500">
                            <span>✉️ <span className="font-mono">{profileEmail || "directeur.bernard@universitecfa.fr"}</span></span>
                            <span>📞 <span className="font-mono">{profilePhone}</span></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 self-stretch md:self-auto justify-end">
                        <button
    onClick={() => setIsEditingProfile(true)}
    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
  >
                          <Edit3 className="h-3.5 w-3.5" /> Modifier mes infos
                        </button>
                      </div>
                    </div> : <form
    onSubmit={(e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const name = form.elements.namedItem("profile_name").value;
      const email = form.elements.namedItem("profile_email").value;
      const phone = form.elements.namedItem("profile_phone").value;
      const specialty = form.elements.namedItem("profile_specialty").value;
      handleSaveProfile(name, email, phone, specialty);
    }}
    className="space-y-4"
  >
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                        <Edit3 className="h-5 w-5 text-emerald-600" />
                        <h2 className="text-base font-bold text-slate-800">Modifier mon profil formateur</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                            Nom Prénom *
                          </label>
                          <input
    name="profile_name"
    type="text"
    defaultValue={profileName}
    required
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
  />
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                            Titre académique / Rôle *
                          </label>
                          <input
    name="profile_specialty"
    type="text"
    defaultValue={profileSpecialty || "Directeur des Études • Bâtiment A"}
    required
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
  />
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                            Adresse Email *
                          </label>
                          <input
    name="profile_email"
    type="email"
    defaultValue={profileEmail || "directeur.bernard@universitecfa.fr"}
    required
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
  />
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                            Numéro de téléphone
                          </label>
                          <input
    name="profile_phone"
    type="text"
    defaultValue={profilePhone}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
  />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
    type="button"
    onClick={() => setIsEditingProfile(false)}
    className="px-3.5 py-1.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
  >
                          Annuler
                        </button>
                        <button
    type="submit"
    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-600/10"
  >
                          <Save className="h-3.5 w-3.5" /> Sauvegarder
                        </button>
                      </div>
                    </form>}
                </div>

            {
    /* Inner trainer tab headers */
  }
            <div className="flex border-b border-indigo-50 mb-8 gap-4 overflow-x-auto text-[11px] font-semibold pb-1.5 scrollbar-none">
              <button
    onClick={() => setTrainerTab("cours")}
    className={`pb-3 whitespace-nowrap ${trainerTab === "cours" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "text-slate-500 hover:text-slate-850"}`}
  >
                📚 Publier un Cours
              </button>
              <button
    onClick={() => setTrainerTab("exercices")}
    className={`pb-3 whitespace-nowrap ${trainerTab === "exercices" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "text-slate-500 hover:text-slate-850"}`}
  >
                🧩 Ajouter un Exercice
              </button>
              <button
    onClick={() => setTrainerTab("videos")}
    className={`pb-3 whitespace-nowrap ${trainerTab === "videos" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "text-slate-500 hover:text-slate-850"}`}
  >
                🎥 Publier une Vidéo
              </button>
              <button
    onClick={() => setTrainerTab("gestion")}
    className={`pb-3 whitespace-nowrap ${trainerTab === "gestion" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "text-slate-500 hover:text-slate-850"}`}
  >
                ⚙️ Gestion Bibliothèque ({courses.length + exercises.length + videos.length})
              </button>
              <button
    onClick={() => setTrainerTab("etudiants")}
    className={`pb-3 whitespace-nowrap ${trainerTab === "etudiants" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold" : "text-slate-500 hover:text-slate-850"}`}
  >
                👥 Inscription des Étudiants ({registeredUsers.filter((u) => u.role === "etudiant").length})
              </button>
              <button
    onClick={() => setTrainerTab("inscription")}
    className={`pb-3 whitespace-nowrap ${trainerTab === "inscription" ? "text-emerald-700 border-b-2 border-emerald-600 font-bold font-black" : "text-slate-500 hover:text-slate-850"}`}
  >
  
  
                📅 Fiche de Présence
              </button>
            </div>

            {
    /* Sub-tab 1: Cours */
  }
            {trainerTab === "cours" && <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                <h3 className="font-extrabold text-base text-slate-900 mb-6">Ajouter un nouveau cours théorique</h3>
                
                <form onSubmit={handlePublishCourse} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Titre du cours *</label>
                      <input
    type="text"
    required
    value={newCourseTitle}
    onChange={(e) => setNewCourseTitle(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Module Thématique *</label>
                      <select
    required
    value={newCourseModule}
    onChange={(e) => setNewCourseModule(e.target.value)}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  >
                        <option value="web">💻 Développement Web</option>
                        <option value="marketing">📊 Marketing Digital & SEO</option>
                        <option value="securite">🔒 Cybersécurité</option>
                        <option value="data">📈 Data Science</option>
                        <option value="Logiciel">🖥️  Développement Logiciel</option>
                        <option value="Réseaux">🌍 Réseaux Informatiques</option>
                        <option value="Cloud">☁️  Cloud Computing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Durée estimée de lecture (heures) *</label>
                      <input
    type="number"
    required
    step="0.5"
    value={newCourseDuration}
    onChange={(e) => setNewCourseDuration(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Enseignant / Auteur *</label>
                      <input
    type="text"
    required
    value={newCourseAuthor}
    onChange={(e) => setNewCourseAuthor(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Description courte d'accroche (1 phrase) *</label>
                      <input
    type="text"
    required
    value={newCourseDesc}
    onChange={(e) => setNewCourseDesc(e.target.value)}
    placeholder="Description rapide qui sera visible sur les fiches de cours..."
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Corps de contenu didactique (HTML supporté) *</label>
                    <textarea
    rows={8}
    required
    value={newCourseContent}
    onChange={(e) => setNewCourseContent(e.target.value)}
    placeholder="<h3>Introduction</h3> <p>Dans cette section apprenez à manipuler...</p>"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg font-mono"
  />
                  </div>

                  <button
    type="submit"
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow-md transition-colors cursor-pointer"
  >
                    Publier officiellement le cours
                  </button>
                </form>
              </div>}

            {
    /* Sub-tab 2: Exercices */
  }
            {trainerTab === "exercices" && <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                <h3 className="font-extrabold text-base text-slate-900 mb-6">Ajouter un défi d'algorithmique ou QCM</h3>

                <form onSubmit={handlePublishExercise} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Titre de l'exercice *</label>
                      <input
    type="text"
    required
    value={newExTitle}
    onChange={(e) => setNewExTitle(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Module thématique associé *</label>
                      <select
    required
    value={newExModule}
    onChange={(e) => setNewExModule(e.target.value)}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  >
                        <option value="web">💻 Développement Web</option>
                        <option value="marketing">📊 Marketing Digital & SEO</option>
                        <option value="securite">🔒 Cybersécurité</option>
                        <option value="data">📈 Data Science</option>
                        <option value="Logiciel">🖥️  Développement Logiciel</option>
                        <option value="Réseaux">🌍 Réseaux Informatiques</option>
                        <option value="Cloud">☁️  Cloud Computing</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Difficulté *</label>
                      <select
    required
    value={newExDifficulty}
    onChange={(e) => setNewExDifficulty(e.target.value)}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg font-semibold"
  >
                        <option value="debutant">⭐ Débutant</option>
                        <option value="intermediaire">⭐⭐ Intermédiaire</option>
                        <option value="avance">⭐⭐⭐ Avancé</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Énoncé du problème didactique *</label>
                      <textarea
    rows={3}
    required
    value={newExStatement}
    onChange={(e) => setNewExStatement(e.target.value)}
    placeholder="Rédigez l'instruction claire et les paramètres attendus de la fonction..."
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Indice de déblocage (Optionnel)</label>
                      <textarea
    rows={3}
    value={newExHint}
    onChange={(e) => setNewExHint(e.target.value)}
    placeholder="Un conseil pour débloquer l'étudiant s'il stagne..."
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Temps estimé (minutes) *</label>
                      <input
    type="number"
    required
    value={newExTime}
    onChange={(e) => setNewExTime(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Code / Solution de référence attendue *</label>
                      <input
    type="text"
    required
    value={newExSolution}
    onChange={(e) => setNewExSolution(e.target.value)}
    placeholder="La chaîne exacte ou signature attendue de la solution valide"
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg font-mono text-emerald-700"
  />
                    </div>
                  </div>

                  <button
    type="submit"
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs cursor-pointer shadow-md"
  >
                    Publier l'exercice d'évaluation
                  </button>
                </form>
              </div>}

            {
    /* Sub-tab 3: Vidéos */
  }
            {trainerTab === "videos" && <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                <h3 className="font-extrabold text-base text-slate-900 mb-6">Publier un tutoriel vidéo</h3>

                <form onSubmit={handlePublishVideo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Titre de la vidéo *</label>
                      <input
    type="text"
    required
    value={newVidTitle}
    onChange={(e) => setNewVidTitle(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Module *</label>
                      <select
    required
    value={newVidModule}
    onChange={(e) => setNewVidModule(e.target.value)}
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  >
                        <option value="web">💻 Développement Web</option>
                        <option value="marketing">📊 Marketing Digital & SEO</option>
                        <option value="securite">🔒 Cybersécurité</option>
                        <option value="data">📈 Data Science</option>
                        <option value="Logiciel">🖥️  Développement Logiciel</option>
                        <option value="Réseaux">🌍 Réseaux Informatiques</option>
                        <option value="Cloud">☁️  Cloud Computing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">URL YouTube de visionnage ou Code Intégration *</label>
                      <input
    type="url"
    required
    value={newVidUrl}
    onChange={(e) => setNewVidUrl(e.target.value)}
    placeholder="https://www.youtube.com/watch?v=..."
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg font-mono text-blue-700"
  />
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Durée (minutes) *</label>
                      <input
    type="number"
    required
    value={newVidDuration}
    onChange={(e) => setNewVidDuration(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Description concise de la vidéo</label>
                      <input
    type="text"
    value={newVidDesc}
    onChange={(e) => setNewVidDesc(e.target.value)}
    placeholder="Objectif de la séance et notions abordées..."
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Prérequis conseillés</label>
                      <input
    type="text"
    value={newVidPrereq}
    onChange={(e) => setNewVidPrereq(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg"
  />
                    </div>
                  </div>

                  <button
    type="submit"
    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow-md transition-colors cursor-pointer"
  >
                    Publier la vidéo tutorée
                  </button>
                </form>
              </div>}

            {
    /* Sub-tab 4: Gestion de la Bibliothèque / Suppression */
  }
            {trainerTab === "gestion" && <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8 animate-fade-in">
                
                {
    /* Cours de formation */
  }
                <div>
                  <h4 className="font-bold text-sm text-slate-800 mb-3 border-b pb-1">📚 Cours Théoriques Publiés</h4>
                  <div className="space-y-3">
                    {courses.map((c) => {
    const isEditing = editingCourseId === c.id;
    return <div key={c.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 text-xs shadow-sm">
                          {isEditing ? <div className="flex-grow space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Titre du cours *</label>
                                  <input
      type="text"
      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
      value={editCourseTitle}
      onChange={(e) => setEditCourseTitle(e.target.value)}
    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Module *</label>
                                    <select
      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
      value={editCourseModule}
      onChange={(e) => setEditCourseModule(e.target.value)}
    >
                                      <option value="web">💻 Dev Web</option>
                                      <option value="marketing">📊 Marketing</option>
                                      <option value="securite">🔒 Sécurité</option>
                                      <option value="data">📈 Data</option>
                                      <option value="Logiciel">🖥️  Développement Logiciel</option>
                                      <option value="Réseaux">🌍 Réseaux Informatiques</option>
                                      <option value="Cloud">☁️  Cloud Computing</option>
                                      
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Durée (heures) *</label>
                                    <input
      type="number"
      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
      value={editCourseDuration}
      onChange={(e) => setEditCourseDuration(e.target.value)}
    />
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Description concise *</label>
                                  <input
      type="text"
      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
      value={editCourseDesc}
      onChange={(e) => setEditCourseDesc(e.target.value)}
    />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Enseignant / Auteur *</label>
                                  <input
      type="text"
      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold text-emerald-800"
      value={editCourseAuthor}
      onChange={(e) => setEditCourseAuthor(e.target.value)}
    />
                                </div>
                              </div>
                              <div>
                                <label className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Contenu textuel & HTML *</label>
                                <textarea
      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs h-28 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
      value={editCourseContent}
      onChange={(e) => setEditCourseContent(e.target.value)}
    />
                              </div>
                            </div> : <div className="flex-grow">
                              <p className="font-extrabold text-slate-900 text-sm leading-tight mb-1">{c.title}</p>
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold capitalize">
                                  Module: {c.module} • {c.duration}h
                                </span>
                                {c.author && <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1 border border-emerald-100">
                                    🎓 Enseignant : {c.author}
                                  </span>}
                              </div>
                              <p className="text-[11px] text-slate-500 mt-1 lines-clamp-2">{c.description}</p>
                            </div>}

                          <div className="flex flex-wrap gap-2 shrink-0 items-center justify-end border-t md:border-t-0 pt-2 md:pt-0">
                            {isEditing ? <>
                                <button
      type="button"
      onClick={() => handleSaveCourse(c.id, {
        title: editCourseTitle,
        module: editCourseModule,
        description: editCourseDesc,
        content: editCourseContent,
        duration: editCourseDuration,
        author: editCourseAuthor
      })}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer shadow-sm text-[11px]"
      title="Sauvegarder les modifications"
    >
                                  <Save className="h-3.5 w-3.5" /> Sauvegarder
                                </button>
                                <button
      type="button"
      onClick={() => setEditingCourseId(null)}
      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-lg font-bold cursor-pointer text-[11px]"
    >
                                  Annuler
                                </button>
                              </> : <>
                                <button
      type="button"
      onClick={() => {
        setEditingCourseId(c.id);
        setEditCourseTitle(c.title);
        setEditCourseModule(c.module);
        setEditCourseDesc(c.description || "");
        setEditCourseContent(c.content || "");
        setEditCourseDuration(c.duration.toString());
        setEditCourseAuthor(c.author || "");
      }}
      className="bg-blue-50 hover:bg-blue-100 text-blue-750 px-3 py-1.5 rounded-lg font-bold border border-blue-200 flex items-center gap-1 cursor-pointer text-[11px]"
      title="Modifier ce cours"
    >
                                  <Edit3 className="h-3.5 w-3.5" /> Modifier
                                </button>
                                <button
      type="button"
      onClick={() => handleDeleteCourse(c.id)}
      className="bg-red-50 hover:bg-red-100 text-red-750 px-3 py-1.5 rounded-lg font-bold border border-red-200 cursor-pointer text-[11px]"
    >
                                  Supprimer
                                </button>
                              </>}
                          </div>
                        </div>;
  })}
                  </div>
                </div>

                {
    /* Exercices de formation */
  }
                <div>
                  <h4 className="font-bold text-sm text-slate-800 mb-3 border-b pb-1">🧩 Exercices Pratiques Publiés</h4>
                  <div className="space-y-2">
                    {exercises.map((e) => <div key={e.id} className="p-3 bg-slate-100 rounded-lg flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-900">{e.title}</p>
                          <span className="text-[10px] text-slate-400 capitalize">Difficulté: {e.difficulty} • {e.time}min</span>
                        </div>
                        <button
    onClick={() => handleDeleteExercise(e.id)}
    className="bg-red-50 hover:bg-red-100 text-red-750 px-3 py-1.5 rounded-lg font-bold border border-red-200 cursor-pointer"
  >
                          Supprimer
                        </button>
                      </div>)}
                  </div>
                </div>

                {
    /* Vidéos de formation */
  }
                <div>
                  <h4 className="font-bold text-sm text-slate-800 mb-3 border-b pb-1">🎥 Vidéos et Replays Publiés</h4>
                  <div className="space-y-2">
                    {videos.map((v) => <div key={v.id} className="p-3 bg-slate-100 rounded-lg flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-900">{v.title}</p>
                          <span className="text-[10px] text-slate-400">Durée: {v.duration}min</span>
                        </div>
                        <button
    onClick={() => handleDeleteVideo(v.id)}
    className="bg-red-50 hover:bg-red-100 text-red-750 px-3 py-1.5 rounded-lg font-bold border border-red-200 cursor-pointer"
  >
                          Supprimer
                        </button>
                      </div>)}
                  </div>
                </div>

              </div>}

            {
    /* Sub-tab 5: Inscription & Liste des Étudiants */
  }
            {trainerTab === "etudiants" && <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {
    /* Left column: Add/Enroll student FORM */
  }
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm self-start">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                        <UserCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 leading-tight">Inscrire un nouvel Étudiant</h3>
                        <p className="text-[11px] text-slate-500">Créez un compte d'accès pour un nouvel apprenti.</p>
                      </div>
                    </div>

                    {enrollStudentError && <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-100 text-xs mb-4">
                        ⚠️ {enrollStudentError}
                      </div>}

                    <form onSubmit={handleEnrollStudent} className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Nom complet & Prénom *</label>
                        <input
    type="text"
    required
    value={enrollStudentName}
    onChange={(e) => setEnrollStudentName(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Adresse Email principale (Optionnel)</label>
                        <input
    type="email"
    value={enrollStudentEmail}
    onChange={(e) => setEnrollStudentEmail(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                        <span className="text-[9px] text-slate-400 mt-1 block">Par défaut, l'email sera généré à partir de son nom.</span>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1 font-sans">Mot de passe temporaire *</label>
                        <input
    type="text"
    required
    value={enrollStudentPassword}
    onChange={(e) => setEnrollStudentPassword(e.target.value)}
    placeholder=""
    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
                      </div>

                      <button
    type="submit"
    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1"
  >
                        👥 Valider l'inscription de l'élève
                      </button>
                    </form>
                  </div>

                  {
    /* Right column: Display ONLY registered students */
  }
                  <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 leading-tight">Base des Étudiants Enregistrés</h3>
                        <p className="text-[11px] text-slate-500">Liste exhaustive et authentifiée des élèves inscrits.</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-150 font-mono">
                        {registeredUsers.filter((u) => u.role === "etudiant").length} ÉLÈVES ACTIVE(S)
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto pr-1">
                      {registeredUsers.filter((u) => u.role === "etudiant").length === 0 ? <div className="text-center py-8 text-slate-400">
                          Aucun étudiant trouvé dans le registre de formation.
                        </div> : registeredUsers.filter((u) => u.role === "etudiant").map((student, idx) => {
    const initials = student.username ? student.username.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) : "ET";
    const initialsColor = ["bg-emerald-500", "bg-blue-500", "bg-indigo-500", "bg-pink-500", "bg-amber-500", "bg-purple-500"][idx % 6];
    return <div key={student.username} className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3 first:pt-0 last:pb-0">
                              <div className="flex items-center gap-3">
                                <div className={`h-9 w-9 text-xs font-bold ${initialsColor} text-white rounded-full flex items-center justify-center shadow-sm`}>
                                  {initials}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-bold text-slate-900 text-sm leading-tight truncate">{student.username}</h4>
                                  <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">{student.email || `${student.username.toLowerCase().replace(/\s+/g, ".")}@universitecfa.fr`}</p>
                                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 items-center mt-1 text-[10px] text-slate-500">
                                    <span>Inscrit : {student.dateEnrolled || "01/01/2026"}</span>
                                    <span>•</span>
                                    <span>Mot de passe : <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[10px] text-slate-700 font-semibold">{student.password}</span></span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-end shrink-0">
                                <button
      onClick={() => handleDeleteStudent(student.username)}
      className="px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all border bg-red-50 hover:bg-red-100 text-red-750 border-red-200 cursor-pointer"
      title="Supprimer cet étudiant de la base"
    >
                                  ❌ Supprimer
                                </button>
                              </div>
                            </div>;
  })}
                    </div>
                  </div>
                </div>
              </div>}

            {
    /* Sub-tab 6: Fiche d'Inscription (Prestige Academic Registry View) */
  }
            {trainerTab === "inscription" && <div className="space-y-6 animate-fade-in">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-6 gap-4">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-tight">📋 Fiches et Registre des Inscriptions</h3>
                      <p className="text-[11px] text-slate-500">Éditez, consultez et exportez les fiches d'inscription certifiées des élèves du CFA.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 whitespace-nowrap self-center">Choisir un apprenti :</span>
                      <select
    value={selectedEnrollmentStudent}
    onChange={(e) => setSelectedEnrollmentStudent(e.target.value)}
    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
  >
                        <option value="">-- Sélectionner l'étudiant --</option>
                        {registeredUsers.filter((u) => u.role === "etudiant").map((s) => <option key={s.username} value={s.username}>{s.username}</option>)}
                      </select>
                    </div>
                  </div>

                  {(() => {
    const activeStudentName = selectedEnrollmentStudent || (registeredUsers.filter((u) => u.role === "etudiant")[0]?.username || "");
    const currentStudentDetails = registeredUsers.find((u) => u.username === activeStudentName && u.role === "etudiant");
    if (!currentStudentDetails) {
      return <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                          ⚠️ Aucun compte étudiant n'est actuellement sélectionné ou enregistré dans la base de données.
                        </div>;
    }
    const registrationCode = `REG-2026-${1e3 + activeStudentName.charCodeAt(0) + activeStudentName.length}`;
    return <div className="space-y-6">
                        {
      /* Printable sheet mockup block */
    }
                        <div className="bg-[#FAF9F5] p-8 md:p-12 rounded-2xl border border-amber-100 shadow-md max-w-3xl mx-auto text-slate-800 relative overflow-hidden font-sans border-t-8 border-t-emerald-600">
                          {
      /* Decorative overlay watermark */
    }
                          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none">
                            <GraduationCap className="h-96 w-96 transform -rotate-12" />
                          </div>

                          {
      /* Top Official Header */
    }
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-slate-300 relative">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-emerald-600 text-white font-black text-xs px-2 py-0.5 rounded shadow-sm">CFA</span>
                                <span className="font-display font-black text-lg tracking-tight text-slate-900">UNIVERSITÉ CFA 2026</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mt-1">ORGANISME RÉGIONAL DE FORMATION ACADÉMIQUE</span>
                            </div>
                            <div className="text-left sm:text-right text-[10px] text-slate-500 font-mono">
                              <p className="font-bold text-slate-850">Identifiant : {registrationCode}</p>
                              <p>Date d'édition : {(/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")} à {(/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</p>
                              <p>Émetteur : Direction CFA</p>
                            </div>
                          </div>

                          <div className="text-center my-6">
                            <h2 className="text-xl font-black uppercase text-slate-900 tracking-tight font-display border-b-2 border-slate-900 pb-2 inline-block px-6">
                              FICHE D'INSCRIPTION INDIVIDUELLE
                            </h2>
                            <p className="text-xs text-slate-500 mt-1.5 font-bold">ANNÉE SCOLAIRE & PROFESSIONNELLE DE RÉFÉRENCE 2026</p>
                          </div>

                          {
      /* Body Information Roster */
    }
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-normal mb-8">
                            <div className="space-y-3 bg-white p-5 rounded-xl shadow-xs border border-slate-200">
                              <p className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider border-b border-emerald-100 pb-1.5 flex items-center gap-1">
                                🧑‍🎓 COORDONNÉES ET IDENTIFIANTS APPRENTI
                              </p>
                              <p><strong className="text-slate-950 block">Nom complet de l'étudiant :</strong> <span className="text-[13px] font-bold text-slate-900 font-mono">{currentStudentDetails.username}</span></p>
                              <p><strong className="text-slate-950 block">Email de correspondance académique :</strong> <span className="font-mono text-[11px] text-slate-600 font-medium select-all">{currentStudentDetails.email || `${currentStudentDetails.username.toLowerCase().replace(/\s+/g, ".")}@universitecfa.fr`}</span></p>
                              <p><strong className="text-slate-950 block">Mot de passe temporaire d'accès :</strong> <span className="bg-slate-100 border border-slate-200 font-mono text-xs font-bold px-2 py-0.5 rounded text-slate-700 select-all">{currentStudentDetails.password}</span></p>
                            </div>

                            <div className="space-y-3 bg-white p-5 rounded-xl shadow-xs border border-slate-200">
                              <p className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider border-b border-emerald-100 pb-1.5 flex items-center gap-1">
                                🛡️ PARCOURS D'APPRENTISSAGE ET CFA
                              </p>
                              <p><strong className="text-slate-950 block">Établissement rattaché :</strong> Université CFA Nancy-Metz</p>
                              <p><strong className="text-slate-950 block">Filière / Spécialisation :</strong> Ingénierie logicielle & Web Alternance</p>
                              <p><strong className="text-slate-950 block">Date officielle de prise d'effet :</strong> {currentStudentDetails.dateEnrolled || "11/06/2026"}</p>
                              <p><strong className="text-slate-950 block">Statut du contrat :</strong> <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-150 rounded px-2 py-0.5 text-[10.5px]">● ACTIF ET INSCRIT</span></p>
                            </div>
                          </div>

                          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-[11px] text-slate-755 mb-8 space-y-1.5">
                            <p className="font-extrabold text-emerald-900 uppercase text-[9.5px] tracking-wider mb-1 flex items-center gap-1">
                              📌 CHARTE D'ENGAGEMENT ET ÉMARGEMENT :
                            </p>
                            <p>1. L'apprenti certifie sur l'honneur l'exactitude des informations d'identité consignées sur la présente fiche.</p>
                            <p>2. Il est tenu de s'authentifier chaque jour de cours théoriques et pratiques afin de pouvoir émarger la <strong>Fiche de présence</strong>.</p>
                            <p>3. Ce dossier fait foi devant les tuteurs de formation, l'organisme de financement (OPCO) et l'entreprise d'accueil partenaire.</p>
                          </div>

                          {
      /* Signature line panels */
    }
                          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-dashed border-slate-300 font-mono text-[10px] text-slate-600">
                            <div>
                              <p className="font-extrabold underline uppercase text-slate-800 mb-1">Signature de l'Élève :</p>
                              <p className="italic text-[9px] text-slate-400 mb-2">(Mention manuscrite "Lu et approuvé")</p>
                              <div className="h-20 border rounded-xl bg-slate-50 border-slate-200 mt-2 flex items-center justify-center">
                                <span className="opacity-10 text-[9px] italic flex items-center gap-1">Emplacement de signature physique</span>
                              </div>
                            </div>
                            <div className="text-right flex flex-col justify-between">
                              <div>
                                <p className="font-extrabold underline uppercase text-slate-800 mb-1">Pour l'administration :</p>
                                <p className="font-semibold text-slate-700">Directeur de Formation M. Bernard</p>
                              </div>
                              <div className="h-20 border rounded-xl bg-slate-50 border-slate-200 mt-2 relative flex items-center justify-center overflow-hidden">
                                <span className="opacity-10 text-[9px] italic flex items-center gap-1">Emplacement Sceau</span>
                                <div className="absolute right-3 bottom-1.5 border border-emerald-500/30 text-emerald-600/30 text-[8px] leading-tight font-black p-1 rounded-sm uppercase tracking-wider transform rotate-12 select-none pointer-events-none text-center">
                                  UNIVERSITÉ CFA<br />
                                  VISA AUTO 2026
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {
      /* Print Actions */
    }
                        <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-slate-100">
                          <button
      onClick={() => window.print()}
      className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors cursor-pointer shadow-md shadow-slate-900/10 flex items-center gap-1.5"
    >
                            <Printer className="h-4 w-4" /> Imprimer via le navigateur
                          </button>
                          
                          <button
      onClick={() => {
        const docText = `UNIVERSITÉ CFA 2026
=========================
FICHE DE RENSEIGNEMENTS ACADÉMIOUES (Export Officiel)

Code de l'Inscription: ${registrationCode}
Nom de l'étudiant: ${currentStudentDetails.username}
E-mail de secours: ${currentStudentDetails.email || `${currentStudentDetails.username.toLowerCase().replace(/\s+/g, ".")}@universitecfa.fr`}
Date d'enrôlement officiel: ${currentStudentDetails.dateEnrolled || "11/06/2026"}
Statut dossier: Inscrit validé CFA

Toutes signatures requises pour émargement légal.`;
        const element = document.createElement("a");
        const file = new Blob([docText], { type: "text/plain;charset=utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = `fiche-inscription-${currentStudentDetails.username.toLowerCase().replace(/\s+/g, "-")}.txt`;
        document.body.appendChild(element);
        element.click();
        triggerNotification("Fiche d'Inscription exportée au format texte avec succès !");
      }}
      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors cursor-pointer shadow-md shadow-emerald-600/10 flex items-center gap-1.5"
    >
                            📥 Télécharger le reçu d'inscription (.txt)
                          </button>
                        </div>
                      </div>;
  })()}
                </div>
              </div>}

            {
    /* Sub-tab 7: Fiche de Présence (Interactive Attendance Register with Signature Emargement Sheet) */
  }
            {trainerTab === "presence" && <div className="space-y-6 animate-fade-in text-slate-850">
                {(() => {
    const students = registeredUsers.filter((u) => u.role === "etudiant");
    const getStudentAttendanceStatus = (un) => {
      const r = attendanceRecords.find(
        (item) => item.studentUsername === un && item.date === attendanceDate && item.session === attendanceSession
      );
      return r?.status || "unmarked";
    };
    const getStudentAttendanceNotes = (un) => {
      const r = attendanceRecords.find(
        (item) => item.studentUsername === un && item.date === attendanceDate && item.session === attendanceSession
      );
      return r?.notes || "";
    };
    const totalStudentsCount = students.length;
    const presents = students.filter((s) => getStudentAttendanceStatus(s.username) === "present").length;
    const absents = students.filter((s) => getStudentAttendanceStatus(s.username) === "absent").length;
    const lates = students.filter((s) => getStudentAttendanceStatus(s.username) === "late").length;
    const unmarked = totalStudentsCount - (presents + absents + lates);
    const rate = totalStudentsCount > 0 ? Math.round((presents + lates * 0.5) / totalStudentsCount * 100) : 0;
    return <div className="space-y-6">
                      {
      /* Configuration panel */
    }
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 border-b pb-2">
                          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900 leading-tight">Registre d'Émargement Pédagogique (Fiche de Présence)</h3>
                            <p className="text-[11px] text-slate-500">Sélectionnez la journée de formation et la session pour vérifier les signatures de présence des élèves.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                          <div className="md:col-span-3">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Date de Formation *</label>
                            <input
      type="date"
      required
      value={attendanceDate}
      onChange={(e) => setAttendanceDate(e.target.value)}
      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
    />
                          </div>

                          <div className="md:col-span-5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nom / Description de la Session *</label>
                            <input
      type="text"
      required
      value={attendanceSession}
      onChange={(e) => setAttendanceSession(e.target.value)}
      placeholder=""
      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
    />
                          </div>

                          <div className="md:col-span-4 flex gap-2">
                            <button
      type="button"
      onClick={handleMarkAllPresent}
      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg text-[11px] transition-all cursor-pointer shadow-sm text-center flex items-center justify-center gap-1"
    >
                              ✅ Tout marquer Présent
                            </button>
                            <button
      type="button"
      onClick={() => {
        setAttendanceDate("2026-06-11");
        setAttendanceSession("Cours Collectif - Matin");
        triggerNotification("Session d'émargement réinitialisée.");
      }}
      className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
      title="Réinitialiser les filtres"
    >
                              Réinitialiser
                            </button>
                          </div>
                        </div>

                        {
      /* Presets buttons row */
    }
                        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-1 text-[11px] text-slate-600">
                          <span className="font-bold">Modèles rapides de session :</span>
                          <button onClick={() => setAttendanceSession("Cours Collectif - Matin")} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-mono">Session Matin</button>
                          <button onClick={() => setAttendanceSession("Atelier Pratique - Après-midi")} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-mono">Atelier Après-midi</button>
                          <button onClick={() => setAttendanceSession("Équipes Projeta - TP")} className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-mono">TP Technique</button>
                        </div>
                      </div>

                      {
      /* Stat summary bar */
    }
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Effectif total</span>
                          <span className="text-xl font-extrabold text-slate-850 font-mono block mt-0.5">{totalStudentsCount}</span>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Présents</span>
                          <span className="text-xl font-extrabold text-emerald-800 font-mono block mt-0.5">{presents}</span>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-center">
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Retards</span>
                          <span className="text-xl font-extrabold text-amber-800 font-mono block mt-0.5">{lates}</span>
                        </div>
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
                          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">Absents</span>
                          <span className="text-xl font-extrabold text-red-800 font-mono block mt-0.5">{absents}</span>
                        </div>
                        <div className="bg-slate-900 text-white p-4 rounded-xl col-span-2 sm:col-span-1 text-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Taux d'Émargement</span>
                          <span className="text-xl font-black text-emerald-400 font-mono block mt-0.5">{rate}%</span>
                        </div>
                      </div>

                      {
      /* Interactive marking register grid */
    }
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">SESSION COURANTE :</span>
                            <span className="text-xs bg-emerald-100 text-emerald-900 border border-emerald-150 px-2 py-0.5 font-bold rounded font-mono">{attendanceDate}</span>
                            <span className="text-xs font-black text-slate-800 italic">• "{attendanceSession}"</span>
                          </div>
                          {unmarked > 0 && <span className="text-[10px] bg-amber-50 text-amber-850 border border-amber-200 px-2.5 py-1 rounded font-bold">
                              ⚠️ {unmarked} élève(s) restant à pointer
                            </span>}
                        </div>

                        <div className="divide-y divide-slate-150">
                          {students.length === 0 ? <div className="p-8 text-center text-slate-400 text-xs">
                              Aucun élève enregistré n'est disponible pour pointer les présences. Veuillez d'abord inscrire des étudiants.
                            </div> : students.map((student, idx) => {
      const currentStatus = getStudentAttendanceStatus(student.username);
      const currentNotes = getStudentAttendanceNotes(student.username);
      const initials = student.username ? student.username.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) : "ET";
      const initialsColor = ["bg-emerald-500", "bg-blue-500", "bg-indigo-500", "bg-pink-500", "bg-amber-500", "bg-purple-500"][idx % 6];
      return <div key={student.username} className="px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                                  {
        /* Left context */
      }
                                  <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-initial">
                                    <div className={`h-9 w-9 text-xs font-black ${initialsColor} text-white rounded-full flex items-center justify-center shadow-inner shrink-0`}>
                                      {initials}
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">{student.username}</h4>
                                      <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">{student.email || `${student.username.toLowerCase()}@universitecfa.fr`}</p>
                                    </div>
                                  </div>

                                  {
        /* Center: interactive pointers */
      }
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <button
        type="button"
        onClick={() => handleSaveAttendance(student.username, "present", currentNotes)}
        className={`px-3 py-1.5 rounded-xl text-[10.5px] font-extrabold tracking-tight transition-all cursor-pointer flex items-center gap-1 border ${currentStatus === "present" ? "bg-emerald-600 text-white border-emerald-650 shadow-md shadow-emerald-600/10" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`}
      >
                                      🟢 Présent
                                    </button>
                                    <button
        type="button"
        onClick={() => handleSaveAttendance(student.username, "late", currentNotes)}
        className={`px-3 py-1.5 rounded-xl text-[10.5px] font-extrabold tracking-tight transition-all cursor-pointer flex items-center gap-1 border ${currentStatus === "late" ? "bg-amber-500 text-white border-amber-550 shadow-md shadow-amber-500/10" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`}
      >
                                      🟡 Retard
                                    </button>
                                    <button
        type="button"
        onClick={() => handleSaveAttendance(student.username, "absent", currentNotes)}
        className={`px-3 py-1.5 rounded-xl text-[10.5px] font-extrabold tracking-tight transition-all cursor-pointer flex items-center gap-1 border ${currentStatus === "absent" ? "bg-red-650 text-white border-red-700 shadow-md shadow-red-600/10" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`}
      >
                                      🔴 Absent
                                    </button>
                                  </div>

                                  {
        /* Right side: custom input of handwritten notes + actions */
      }
                                  <div className="flex items-center gap-2 lg:max-w-xs w-full lg:w-48 shrink-0">
                                    <input
        type="text"
        placeholder=""
        defaultValue={currentNotes}
        onBlur={(e) => {
          const notesVal = e.target.value;
          if (notesVal !== currentNotes && currentStatus !== "unmarked") {
            handleSaveAttendance(student.username, currentStatus, notesVal);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const notesVal = e.target.value;
            handleSaveAttendance(student.username, currentStatus !== "unmarked" ? currentStatus : "present", notesVal);
          }
        }}
        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-[11px] rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />
                                  </div>
                                </div>;
    })}
                        </div>
                      </div>

                      {
      /* Official Print Layout Sheet of émargement */
    }
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="flex border-b pb-4 mb-4 justify-between items-center">
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900">🖨️ Générer la Feuille d'Émargement Officielle (Format CFA)</h4>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Pour certification physique OPCO / Entreprise</p>
                          </div>
                          
                          <button
      onClick={() => window.print()}
      className="bg-slate-900 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded-xl text-[11px] transition-all cursor-pointer shadow-md flex items-center gap-1"
    >
                            <Printer className="h-3.5 w-3.5" /> Lancer l'impression PDF
                          </button>
                        </div>

                        {
      /* Roster print preview block */
    }
                        <div id="emargement-preview-block" className="outline-none bg-[#FAF9F5] p-6 rounded-xl border border-dashed border-slate-200 text-slate-800 text-[11px] max-w-2xl mx-auto space-y-4">
                          <div className="flex justify-between items-start border-b pb-2">
                            <div>
                              <span className="font-black">UNIVERSITÉ CFA </span><br />
                              <span className="text-[9px] text-slate-400">Section Apprentissage Web 2026</span>
                            </div>
                            <div className="text-right text-[9px] font-mono">
                              <p>Journée : {attendanceDate}</p>
                              <p>Session : {attendanceSession}</p>
                            </div>
                          </div>

                          <div className="text-center">
                            <h3 className="text-xs font-black uppercase tracking-tight text-slate-900">FEUILLE D'ÉMARGEMENT ET DE PRÉSENCE JOURNALIÈRE</h3>
                            <p className="text-[10px] text-slate-500">Document légal réglementaire (Taux acté : {rate}%)</p>
                          </div>

                          <table className="w-full text-left divide-y divide-slate-300 border">
                            <thead>
                              <tr className="bg-slate-100 font-bold text-slate-700">
                                <th className="p-2 border">Nom & Prénom Élève</th>
                                <th className="p-2 border">Statut pointé</th>
                                <th className="p-2 border">Notes motivées</th>
                                <th className="p-2 border w-24">Émargement</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 font-mono">
                              {students.map((s) => {
      const st = getStudentAttendanceStatus(s.username);
      const nt = getStudentAttendanceNotes(s.username);
      return <tr key={s.username}>
                                    <td className="p-2 border font-bold text-slate-800">{s.username}</td>
                                    <td className="p-2 border uppercase text-[10px]">
                                      {st === "present" ? "✅ Présent" : st === "absent" ? "❌ Absent" : st === "late" ? "⚠️ Retard" : "Non pointé"}
                                    </td>
                                    <td className="p-2 border text-slate-500 text-[10px]">{nt || "R.A.S."}</td>
                                    <td className="p-2 border h-8 bg-white/20" />
                                  </tr>;
    })}
                            </tbody>
                          </table>

                          <div className="flex justify-between font-bold pt-4 text-[9px] uppercase font-sans">
                            <p>Visa du Formateur : _________________</p>
                            <p>Cachet Administratif CFA : _________________</p>
                          </div>
                        </div>
                      </div>
                    </div>;
  })()}
              </div>}
              </>}

          </div>}

      </main>

      {
    /* FOOTER */
  }
      <Footer setActiveTab={setActiveTab} />

    </div>;
}
