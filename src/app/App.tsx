import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { VolumeBenne } from "./components/VolumeBenne";
import { RentabiliteDeplacemen } from "./components/RentabiliteDeplacemen";
import { EstimationEpave } from "./components/EstimationEpave";
import { ValeurMetaux } from "./components/ValeurMetaux";

const toolTitles: Record<string, string> = {
  "volume-benne": "Calcul Volume Benne",
  "rentabilite": "Rentabilité Déplacement",
  "epave": "Estimation Poids Épave",
  "metaux": "Calcul Valeur Métaux",
};

export default function App() {
  const [currentTool, setCurrentTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (currentTool) {
      case "volume-benne": return <VolumeBenne />;
      case "rentabilite": return <RentabiliteDeplacemen />;
      case "epave": return <EstimationEpave />;
      case "metaux": return <ValeurMetaux />;
      default: return null;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#111111" }}
    >
      <Header
        currentTool={currentTool ? toolTitles[currentTool] : null}
        onBack={() => setCurrentTool(null)}
      />
      <main className="pb-10">
        {currentTool ? renderTool() : <HomePage onSelectTool={setCurrentTool} />}
      </main>

      {/* Bottom nav hint on mobile */}
      {!currentTool && (
        <div
          className="fixed bottom-0 left-0 right-0 py-3 text-center sm:hidden"
          style={{ background: "#1a1a1a", borderTop: "1px solid #2d2d2d" }}
        >
          <p style={{ color: "#6b7280", fontSize: "0.7rem" }}>
            📱 Ajoutez à l'écran d'accueil pour un accès rapide
          </p>
        </div>
      )}
    </div>
  );
}
