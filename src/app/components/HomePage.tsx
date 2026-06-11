interface HomePageProps {
  onSelectTool: (tool: string) => void;
}

const tools = [
  {
    id: "volume-benne",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    emoji: "📦",
    title: "Calcul Volume Benne",
    desc: "Calculez le volume et choisissez la bonne benne",
    badge: "Dimensions",
  },
  {
    id: "rentabilite",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z"/>
        <path d="M16 8l4 0 3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    emoji: "🚛",
    title: "Rentabilité Déplacement",
    desc: "Analysez si le déplacement est rentable",
    badge: "Carburant + Marges",
  },
  {
    id: "epave",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5h-3"/>
        <circle cx="7" cy="17" r="2"/>
        <path d="M9 17h6"/>
        <circle cx="17" cy="17" r="2"/>
      </svg>
    ),
    emoji: "🚗",
    title: "Estimation Poids Épave",
    desc: "Estimez le poids et la valeur d'un véhicule",
    badge: "Catalogue intégré",
  },
  {
    id: "metaux",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    emoji: "♻️",
    title: "Calcul Valeur Métaux",
    desc: "Calculez la valeur de vos métaux récupérés",
    badge: "Tarifs personnalisables",
  },
];

export function HomePage({ onSelectTool }: HomePageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Hero banner */}
      <div
        className="rounded-2xl p-6 mb-8 shadow-2xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #1a1a1a 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10">
          <div
            className="inline-block px-3 py-1 rounded-full mb-3 font-bold uppercase"
            style={{ background: "#16a34a", color: "white", fontSize: "0.65rem", letterSpacing: "0.08em" }}
          >
            ✦ Version Pro 2026
          </div>
          <h1
            className="font-black uppercase mb-2"
            style={{ color: "white", fontSize: "clamp(1.4rem, 4vw, 2rem)", lineHeight: 1.1 }}
          >
            Vos outils métier,<br />
            <span style={{ color: "#4ade80" }}>toujours disponibles</span>
          </h1>
          <p style={{ color: "#86efac", fontSize: "0.9rem" }}>
            Fonctionne hors ligne · Données locales · Optimisé chantier
          </p>
        </div>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="group text-left rounded-2xl p-5 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1c1c1c 0%, #252525 100%)",
              border: "1px solid #2d2d2d",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#16a34a";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#2d2d2d";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            {/* glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"
              style={{ background: "radial-gradient(ellipse at top left, rgba(22,163,74,0.08) 0%, transparent 60%)" }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: "linear-gradient(135deg, #14532d, #166534)", color: "#4ade80" }}
                >
                  {tool.icon}
                </div>
                <span
                  className="px-2 py-1 rounded-lg font-bold uppercase"
                  style={{ background: "rgba(22,163,74,0.12)", color: "#4ade80", fontSize: "0.6rem", letterSpacing: "0.05em" }}
                >
                  {tool.badge}
                </span>
              </div>
              <div
                className="font-black mb-1 uppercase"
                style={{ color: "white", fontSize: "1rem", letterSpacing: "0.02em" }}
              >
                {tool.emoji} {tool.title}
              </div>
              <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>{tool.desc}</div>
              <div
                className="flex items-center gap-1 mt-3"
                style={{ color: "#16a34a", fontSize: "0.8rem" }}
              >
                <span className="font-bold">Ouvrir l'outil</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer info */}
      <div
        className="mt-8 rounded-2xl p-4 text-center"
        style={{ background: "#1c1c1c", border: "1px solid #2d2d2d" }}
      >
        <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>
          💾 Toutes vos données sont sauvegardées localement sur cet appareil · Aucune connexion internet requise
        </p>
      </div>
    </div>
  );
}
