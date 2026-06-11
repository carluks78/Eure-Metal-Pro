import { useState, useEffect } from "react";

const STORAGE_KEY = "eure-metal-pro-tarifs";

const defaultTarifs: Record<string, number> = {
  "Cuivre": 6.20,
  "Laiton": 2.80,
  "Aluminium": 1.10,
  "Inox": 0.85,
  "Ferraille": 0.18,
  "Plomb": 1.40,
  "Batteries": 0.35,
  "Câbles cuivre": 3.50,
};

const metalIcons: Record<string, string> = {
  "Cuivre": "🟤",
  "Laiton": "🟡",
  "Aluminium": "⬜",
  "Inox": "⚪",
  "Ferraille": "⬛",
  "Plomb": "🔵",
  "Batteries": "🔋",
  "Câbles cuivre": "🔌",
};

const metalColors: Record<string, string> = {
  "Cuivre": "#b45309",
  "Laiton": "#ca8a04",
  "Aluminium": "#94a3b8",
  "Inox": "#e2e8f0",
  "Ferraille": "#6b7280",
  "Plomb": "#6366f1",
  "Batteries": "#22c55e",
  "Câbles cuivre": "#f59e0b",
};

export function ValeurMetaux() {
  const [tarifs, setTarifs] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultTarifs;
    } catch {
      return defaultTarifs;
    }
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState("Cuivre");
  const [poids, setPoids] = useState("");
  const [result, setResult] = useState<{ metal: string; poids: number; prix: number; total: number } | null>(null);
  const [tempTarifs, setTempTarifs] = useState<Record<string, number>>(tarifs);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarifs));
  }, [tarifs]);

  const saveTarifs = () => {
    setTarifs({ ...tempTarifs });
    setEditMode(false);
  };

  const calculate = () => {
    const p = parseFloat(poids);
    if (isNaN(p) || p <= 0) return;
    const prix = tarifs[selectedMetal];
    setResult({ metal: selectedMetal, poids: p, prix, total: p * prix });
  };

  const inputStyle = {
    background: "#1c1c1c",
    border: "1.5px solid #3d3d3d",
    color: "white",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "1rem",
    width: "100%",
    outline: "none",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div
        className="rounded-2xl p-6 mb-6 shadow-xl"
        style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}
      >
        <div className="flex items-center gap-3">
          <div className="text-4xl">♻️</div>
          <div>
            <h2 className="font-black uppercase" style={{ color: "white", fontSize: "1.3rem" }}>
              Calcul Valeur Métaux
            </h2>
            <p style={{ color: "#86efac", fontSize: "0.85rem" }}>
              Tarifs sauvegardés · 8 types de métaux
            </p>
          </div>
        </div>
      </div>

      {/* Tarifs section */}
      <div
        className="rounded-2xl p-5 mb-5 shadow-xl"
        style={{ background: "#1a1a1a", border: "1px solid #2d2d2d" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div style={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ⚙️ Paramètres Tarifs (€/kg)
          </div>
          <button
            onClick={() => {
              if (!editMode) setTempTarifs({ ...tarifs });
              setEditMode(!editMode);
            }}
            className="px-3 py-2 rounded-xl font-bold transition-all active:scale-95"
            style={{
              background: editMode ? "#16a34a22" : "#2d2d2d",
              border: `1px solid ${editMode ? "#16a34a" : "#3d3d3d"}`,
              color: editMode ? "#4ade80" : "#9ca3af",
              fontSize: "0.78rem",
            }}
          >
            {editMode ? "✏️ Modification..." : "✏️ Modifier"}
          </button>
        </div>

        {editMode ? (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {Object.entries(tempTarifs).map(([metal, prix]) => (
                <div key={metal}>
                  <label style={{ color: "#9ca3af", fontSize: "0.7rem", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    {metalIcons[metal]} {metal}
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={prix}
                      onChange={(e) => setTempTarifs({ ...tempTarifs, [metal]: parseFloat(e.target.value) || 0 })}
                      style={{ ...inputStyle, padding: "10px 12px", fontSize: "0.9rem" }}
                      onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                      onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
                    />
                    <span style={{ color: "#6b7280", fontSize: "0.8rem" }}>€</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={saveTarifs}
              className="w-full py-3 rounded-xl font-black uppercase transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "white", fontSize: "0.9rem" }}
            >
              💾 Sauvegarder les tarifs
            </button>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(tarifs).map(([metal, prix]) => (
              <div
                key={metal}
                className="flex items-center justify-between py-2 px-3 rounded-xl"
                style={{ background: "#1c1c1c", border: `1px solid ${metalColors[metal]}22` }}
              >
                <span style={{ color: "#d1d5db", fontSize: "0.82rem" }}>{metalIcons[metal]} {metal}</span>
                <span style={{ color: metalColors[metal] || "#4ade80", fontWeight: 700, fontSize: "0.88rem" }}>
                  {prix.toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calculator */}
      <div
        className="rounded-2xl p-6 shadow-xl"
        style={{ background: "#1a1a1a", border: "1px solid #2d2d2d" }}
      >
        <div style={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
          🔢 Calculer la valeur
        </div>

        {/* Metal selector */}
        <div className="mb-4">
          <label style={{ color: "#9ca3af", fontSize: "0.78rem", marginBottom: "8px", display: "block", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
            Sélection du métal
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(tarifs).map((metal) => (
              <button
                key={metal}
                onClick={() => setSelectedMetal(metal)}
                className="py-3 px-3 rounded-xl transition-all active:scale-95 text-left"
                style={{
                  background: selectedMetal === metal ? "#14532d" : "#1c1c1c",
                  border: `1.5px solid ${selectedMetal === metal ? "#16a34a" : "#3d3d3d"}`,
                  color: selectedMetal === metal ? "#4ade80" : "#9ca3af",
                }}
              >
                <div style={{ fontSize: "1.2rem" }}>{metalIcons[metal]}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, marginTop: "2px" }}>{metal}</div>
                <div style={{ fontSize: "0.65rem", color: selectedMetal === metal ? "#86efac" : "#6b7280" }}>
                  {tarifs[metal].toFixed(2)} €/kg
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Poids */}
        <div className="mb-5">
          <label style={{ color: "#9ca3af", fontSize: "0.78rem", marginBottom: "6px", display: "block", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
            ⚖️ Poids (kg)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Ex : 150"
            value={poids}
            onChange={(e) => setPoids(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
            onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 py-4 rounded-2xl font-black uppercase transition-all active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "white", fontSize: "1rem", letterSpacing: "0.05em" }}
          >
            Calculer
          </button>
          <button
            onClick={() => { setPoids(""); setResult(null); }}
            className="py-4 px-5 rounded-2xl font-bold uppercase transition-all active:scale-95"
            style={{ background: "#2d2d2d", color: "#9ca3af", fontSize: "0.85rem" }}
          >
            🔄 Réinit.
          </button>
        </div>

        {result && (
          <div
            className="mt-6 rounded-2xl p-6 shadow-xl"
            style={{ background: "linear-gradient(135deg, #1c1c1c, #252525)", border: "2px solid #16a34a" }}
          >
            <div className="text-center mb-5">
              <div style={{ fontSize: "3rem" }}>{metalIcons[result.metal]}</div>
              <div style={{ color: "#4ade80", fontSize: "1.1rem" }} className="font-black uppercase">{result.metal}</div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center rounded-xl p-3" style={{ background: "#16a34a18", border: "1px solid #16a34a33" }}>
                <div style={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700 }}>PRIX/KG</div>
                <div style={{ color: "#4ade80", fontSize: "1.1rem" }} className="font-black">{result.prix.toFixed(2)}€</div>
              </div>
              <div className="text-center rounded-xl p-3" style={{ background: "#16a34a18", border: "1px solid #16a34a33" }}>
                <div style={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700 }}>POIDS</div>
                <div style={{ color: "#4ade80", fontSize: "1.1rem" }} className="font-black">{result.poids} kg</div>
              </div>
              <div className="text-center rounded-xl p-3" style={{ background: "#14532d", border: "1px solid #16a34a" }}>
                <div style={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700 }}>TOTAL</div>
                <div style={{ color: "#4ade80", fontSize: "1.1rem" }} className="font-black">{result.total.toFixed(2)}€</div>
              </div>
            </div>

            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "#14532d", border: "1px solid #16a34a" }}
            >
              <div style={{ color: "#86efac", fontSize: "0.85rem", marginBottom: "4px" }}>
                {result.poids} kg × {result.prix.toFixed(2)} €/kg
              </div>
              <div style={{ color: "#4ade80", fontSize: "2.2rem" }} className="font-black">
                = {result.total.toFixed(2)} €
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
