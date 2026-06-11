import logoImg from "figma:asset/og-image.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeaderProps {
  currentTool: string | null;
  onBack: () => void;
}

export function Header({ currentTool, onBack }: HeaderProps) {
  return (
    <header
      style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)", borderBottom: "3px solid #16a34a" }}
      className="sticky top-0 z-50 shadow-xl"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        {currentTool && (
          <button
            onClick={onBack}
            style={{ background: "rgba(22,163,74,0.15)", border: "1px solid #16a34a", color: "#22c55e" }}
            className="flex items-center justify-center w-11 h-11 rounded-xl transition-all active:scale-95 shrink-0"
            aria-label="Retour"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        )}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-lg"
            style={{ background: "white" }}
          >
            <ImageWithFallback src={logoImg} alt="Eure Métal Pro" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <div
              className="font-black uppercase truncate"
              style={{ fontSize: "1.1rem", color: "#22c55e", letterSpacing: "0.05em" }}
            >
              EURE MÉTAL PRO
            </div>
            <div
              className="truncate hidden sm:block"
              style={{ color: "#9ca3af", fontSize: "0.7rem", lineHeight: 1.2 }}
            >
              {currentTool || "Outils professionnels · Recyclage & Récupération métaux"}
            </div>
          </div>
        </div>
        <div
          className="font-bold uppercase shrink-0 hidden sm:block"
          style={{ background: "#16a34a", color: "white", fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.05em" }}
        >
          PRO
        </div>
      </div>
    </header>
  );
}
