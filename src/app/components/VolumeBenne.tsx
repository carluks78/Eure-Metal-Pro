import { useState } from "react";

function ResultCard({ volume }: { volume: number }) {
  let recommendation = "";
  let color = "#16a34a";

  if (volume <= 8) {
    recommendation = "Benne 10 m³ recommandée";
  } else if (volume <= 15) {
    recommendation = "Benne 15 m³ recommandée";
    color = "#16a34a";
  } else if (volume <= 30) {
    recommendation = "Benne 30 m³ recommandée";
    color = "#ca8a04";
  } else if (volume <= 60) {
    recommendation = "2 bennes 30 m³ nécessaires";
    color = "#ea580c";
  } else {
    recommendation = "Plusieurs rotations nécessaires";
    color = "#dc2626";
  }

  return (
    <div
      className="rounded-2xl p-6 mt-6 shadow-xl"
      style={{ background: "linear-gradient(135deg, #1c1c1c, #252525)", border: `2px solid ${color}` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color}22` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20M4 20V10l8-7 8 7v10"/>
            <rect x="9" y="14" width="6" height="6"/>
          </svg>
        </div>
        <div>
          <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>VOLUME CALCULÉ</div>
          <div style={{ color: "white", fontSize: "2rem" }} className="font-black">
            {volume.toFixed(2)} <span style={{ fontSize: "1rem", color: "#9ca3af" }}>m³</span>
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-4 flex items-center gap-3"
        style={{ background: `${color}18` }}
      >
        <div style={{ fontSize: "1.8rem" }}>📦</div>
        <div>
          <div style={{ color: "#9ca3af", fontSize: "0.7rem" }}>RECOMMANDATION</div>
          <div style={{ color, fontSize: "1.05rem" }} className="font-black uppercase">
            ➡️ {recommendation}
          </div>
        </div>
      </div>

      {/* Visual bar */}
      <div className="mt-4">
        <div className="flex justify-between mb-1" style={{ fontSize: "0.7rem", color: "#6b7280" }}>
          <span>0 m³</span>
          <span>60+ m³</span>
        </div>
        <div className="h-3 rounded-full" style={{ background: "#2d2d2d" }}>
          <div
            className="h-3 rounded-full transition-all duration-700"
            style={{
              width: `${Math.min((volume / 60) * 100, 100)}%`,
              background: `linear-gradient(90deg, #16a34a, ${color})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function VolumeBenne() {
  const [longueur, setLongueur] = useState("");
  const [largeur, setLargeur] = useState("");
  const [hauteur, setHauteur] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const l = parseFloat(longueur);
    const w = parseFloat(largeur);
    const h = parseFloat(hauteur);
    if (!isNaN(l) && !isNaN(w) && !isNaN(h) && l > 0 && w > 0 && h > 0) {
      setResult(l * w * h);
    }
  };

  const reset = () => {
    setLongueur("");
    setLargeur("");
    setHauteur("");
    setResult(null);
  };

  const inputStyle = {
    background: "#1c1c1c",
    border: "1.5px solid #3d3d3d",
    color: "white",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "1.1rem",
    width: "100%",
    outline: "none",
  };

  const labelStyle = {
    color: "#9ca3af",
    fontSize: "0.8rem",
    marginBottom: "6px",
    display: "block",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div
        className="rounded-2xl p-6 mb-6 shadow-xl"
        style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}
      >
        <div className="flex items-center gap-3">
          <div className="text-4xl">📦</div>
          <div>
            <h2 className="font-black uppercase" style={{ color: "white", fontSize: "1.3rem" }}>
              Calculateur de Volume Benne
            </h2>
            <p style={{ color: "#86efac", fontSize: "0.85rem" }}>
              Entrez les dimensions pour calculer le volume
            </p>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl p-6 shadow-xl"
        style={{ background: "#1a1a1a", border: "1px solid #2d2d2d" }}
      >
        <div className="space-y-5">
          <div>
            <label style={labelStyle}>📏 Longueur (m)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="Ex : 5.0"
              value={longueur}
              onChange={(e) => setLongueur(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
            />
          </div>
          <div>
            <label style={labelStyle}>📐 Largeur (m)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="Ex : 2.5"
              value={largeur}
              onChange={(e) => setLargeur(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
            />
          </div>
          <div>
            <label style={labelStyle}>📊 Hauteur moyenne (m)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="Ex : 1.5"
              value={hauteur}
              onChange={(e) => setHauteur(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculate}
            className="flex-1 py-4 rounded-2xl font-black uppercase transition-all active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "white", fontSize: "1rem", letterSpacing: "0.05em" }}
          >
            Calculer
          </button>
          <button
            onClick={reset}
            className="py-4 px-5 rounded-2xl font-bold uppercase transition-all active:scale-95"
            style={{ background: "#2d2d2d", color: "#9ca3af", fontSize: "0.85rem" }}
          >
            🔄 Réinit.
          </button>
        </div>

        {result !== null && <ResultCard volume={result} />}
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {[
          { range: "0–8 m³", benne: "10 m³", color: "#16a34a" },
          { range: "8–15 m³", benne: "15 m³", color: "#16a34a" },
          { range: "15–30 m³", benne: "30 m³", color: "#ca8a04" },
          { range: "30–60 m³", benne: "2×30 m³", color: "#ea580c" },
        ].map((item) => (
          <div
            key={item.range}
            className="rounded-xl p-3"
            style={{ background: "#1c1c1c", border: `1px solid ${item.color}33` }}
          >
            <div style={{ color: item.color, fontSize: "0.7rem", fontWeight: 700 }}>{item.range}</div>
            <div style={{ color: "white", fontSize: "0.85rem", fontWeight: 700 }}>➡️ {item.benne}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
