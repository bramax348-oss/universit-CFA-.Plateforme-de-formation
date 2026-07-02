import React from "react";

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 divide-y divide-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div>
            <span className="font-display font-black text-white text-base tracking-tight mb-3 block">
              UNIVERSITÉ<span className="text-emerald-500">CFA</span>
            </span>
            <p className="text-xs leading-relaxed max-w-xs">
              La plateforme de formation en alternance moderne de référence en 2026. Théorie solide et compétences de terrain.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wide">Accès Rapides</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab("accueil")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portail d'Accueil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab("cours")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mes cours, vidéos et exercices
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tableau de bord de suivi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab("assistant")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Assistant d'apprentissage IA
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wide">Équipe Pédagogique 2026</h4>
            <p>Directeur Pédagogique : M. Bernard</p>
            <p className="mt-1">Tuteur référent : Mme Sophie Bernard</p>
            <p className="mt-1">Ingénieur concepteur : Jean Olivier Andrianirina</p>
          </div>
        </div>
        <div className="pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>&copy; 2026 Université CFA - ANDRIANIRINA Jean Olivier. Tous droits réservés.</p>
          <p className="font-mono">Port : 3000 • Status : Production ready</p>
        </div>
      </div>
    </footer>
  );
}
