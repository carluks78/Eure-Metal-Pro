import { useState } from "react";

interface CalcResult {
  coutCarburant: number;
  valeurMarchandise: number;
  marge: number;
  status: "tres-rentable" | "rentable" | "faible" | "non-rentable";
}

function GaugeBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span style={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}>{label}</span>
        <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 700 }}>{value.toFixed(2)} €</span>
      </div>
      <div className="h-3 rounded-full" style={{ background: "#2d2d2d" }}>
        <div
          className="h-3 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: CalcResult["status"] }) {
  const config = {
    "tres-rentable": { label: "TRÈS RENTABLE", color: "#16a34a", bg: "#14532d", icon: "🟢" },
    "rentable": { label: "RENTABLE", color: "#22c55e", bg: "#166534", icon: "🟢" },
    "faible": { label: "FAIBLEMENT RENTABLE", color: "#ca8a04", bg: "#713f12", icon: "🟡" },
    "non-rentable": { label: "NON RENTABLE", color: "#dc2626", bg: "#7f1d1d", icon: "🔴" },
  };
  const c = config[status];
  return (
    <div
      className="rounded-2xl p-5 flex items-center gap-4 mb-5 shadow-xl"
      style={{ background: c.bg, border: `2px solid ${c.color}` }}
    >
      <div style={{ fontSize: "2.5rem" }}>{c.icon}</div>
      <div>
        <div style={{ color: "#9ca3af", fontSize: "0.7rem", letterSpacing: "0.08em" }}>RÉSULTAT</div>
        <div style={{ color: c.color, fontSize: "1.4rem" }} className="font-black uppercase">
          {c.label}
        </div>
      </div>
    </div>
  );
}

export function RentabiliteDeplacemen() {
  const [distance, setDistance] = useState("");
  const [conso, setConso] = useState("");
  const [prixCarb, setPrixCarb] = useState("1.85");
  const [poids, setPoids] = useState("");
  const [prixRevente, setPrixRevente] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);

  const calculate = () => {
    const d = parseFloat(distance);
    const c = parseFloat(conso);
    const pc = parseFloat(prixCarb);
    const p = parseFloat(poids);
    const pr = parseFloat(prixRevente);

    if ([d, c, pc, p, pr].some((v) => isNaN(v) || v < 0)) return;

    const coutCarburant = (d * c) / 100 * pc;
    const valeurMarchandise = p * pr;
    const marge = valeurMarchandise - coutCarburant;

    let status: CalcResult["status"];
    if (marge > 100) status = "tres-rentable";
    else if (marge >= 50) status = "rentable";
    else if (marge >= 0) status = "faible";
    else status = "non-rentable";

    setResult({ coutCarburant, valeurMarchandise, marge, status });
  };

  const reset = () => {
    setDistance(""); setConso(""); setPrixRevente(""); setPoids("");
    setResult(null);
  };

  const inputStyle = {
    background: "#1c1c1c",
    border: "1.5px solid #3d3d3d",
    color: "white",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "1.05rem",
    width: "100%",
    outline: "none",
  };

  const labelStyle = {
    color: "#9ca3af",
    fontSize: "0.78rem",
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
          <div className="text-4xl">🚛</div>
          <div>
            <h2 className="font-black uppercase" style={{ color: "white", fontSize: "1.3rem" }}>
              Rentabilité Déplacement
            </h2>
            <p style={{ color: "#86efac", fontSize: "0.85rem" }}>
              Analysez si votre déplacement est rentable
            </p>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl p-6 shadow-xl"
        style={{ background: "#1a1a1a", border: "1px solid #2d2d2d" }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>📍 Distance A/R (km)</label>
              <input
                type="number" min="0" step="1" placeholder="Ex : 80"
                value={distance} onChange={(e) => setDistance(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
              />
            </div>
            <div>
              <label style={labelStyle}>⛽ Conso (L/100)</label>
              <input
                type="number" min="0" step="0.5" placeholder="Ex : 25"
                value={conso} onChange={(e) => setConso(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>💰 Prix carburant (€/L)</label>
            <input
              type="number" min="0" step="0.01" placeholder="Ex : 1.85"
              value={prixCarb} onChange={(e) => setPrixCarb(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
              onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>⚖️ Poids récupéré (kg)</label>
              <input
                type="number" min="0" step="10" placeholder="Ex : 500"
                value={poids} onChange={(e) => setPoids(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
              />
            </div>
            <div>
              <label style={labelStyle}>📈 Prix revente (€/kg)</label>
              <input
                type="number" min="0" step="0.01" placeholder="Ex : 0.18"
                value={prixRevente} onChange={(e) => setPrixRevente(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
                onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculate}
            className="flex-1 py-4 rounded-2xl font-black uppercase transition-all active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "white", fontSize: "1rem", letterSpacing: "0.05em" }}
          >
            Analyser
          </button>
          <button
            onClick={reset}
            className="py-4 px-5 rounded-2xl font-bold uppercase transition-all active:scale-95"
            style={{ background: "#2d2d2d", color: "#9ca3af", fontSize: "0.85rem" }}
          >
            🔄 Réinit.
          </button>
        </div>

        {result && (
          <div className="mt-6">
            <StatusBadge status={result.status} />

            <div
              className="rounded-2xl p-5"
              style={{ background: "#1c1c1c", border: "1px solid #2d2d2d" }}
            >
              <GaugeBar
                value={result.coutCarburant}
                max={Math.max(result.valeurMarchandise, result.coutCarburant) * 1.2 || 100}
                color="#dc2626"
                label="🔥 Coût carburant"
              />
              <GaugeBar
                value={result.valeurMarchandise}
                max={Math.max(result.valeurMarchandise, result.coutCarburant) * 1.2 || 100}
                color="#16a34a"
                label="💰 Chiffre d'affaires potentiel"
              />

              <div
                className="rounded-xl p-4 mt-4 flex items-center justify-between"
                style={{ background: result.marge >= 0 ? "#14532d" : "#7f1d1d", border: `1px solid ${result.marge >= 0 ? "#16a34a" : "#dc2626"}` }}
              >
                <span style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 700 }}>BÉNÉFICE ESTIMÉ</span>
                <span
                  style={{ color: result.marge >= 0 ? "#4ade80" : "#f87171", fontSize: "1.5rem" }}
                  className="font-black"
                >
                  {result.marge >= 0 ? "+" : ""}{result.marge.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
