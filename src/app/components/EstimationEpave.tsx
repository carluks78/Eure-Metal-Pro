import { useState } from "react";

const marques = ["Renault", "Peugeot", "Citroën", "Fiat", "Ford", "Volkswagen", "Mercedes", "BMW", "Audi", "Opel"];

const categories = [
  { id: "citadine", label: "🚗 Citadine", poids: 1000, icon: "🚗" },
  { id: "berline", label: "🚙 Berline", poids: 1500, icon: "🚙" },
  { id: "suv", label: "🛻 SUV", poids: 1800, icon: "🛻" },
  { id: "utilitaire", label: "🚐 Utilitaire", poids: 2200, icon: "🚐" },
  { id: "fourgon", label: "🚌 Fourgon", poids: 3000, icon: "🚌" },
];

const selectStyle = {
  background: "#1c1c1c",
  border: "1.5px solid #3d3d3d",
  color: "white",
  borderRadius: "12px",
  padding: "14px 16px",
  fontSize: "1.05rem",
  width: "100%",
  outline: "none",
  appearance: "none" as const,
};

const labelStyle = {
  color: "#9ca3af",
  fontSize: "0.78rem",
  marginBottom: "6px",
  display: "block",
  fontWeight: 600 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

export function EstimationEpave() {
  const [marque, setMarque] = useState("");
  const [categorie, setCategorie] = useState("");
  const [prixKg, setPrixKg] = useState("0.18");
  const [result, setResult] = useState<{ poids: number; valeur: number; cat: typeof categories[0] } | null>(null);

  const estimate = () => {
    const cat = categories.find((c) => c.id === categorie);
    const price = parseFloat(prixKg);
    if (!cat || isNaN(price) || price <= 0 || !marque) return;
    setResult({ poids: cat.poids, valeur: cat.poids * price, cat });
  };

  const reset = () => {
    setMarque(""); setCategorie(""); setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div
        className="rounded-2xl p-6 mb-6 shadow-xl"
        style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}
      >
        <div className="flex items-center gap-3">
          <div className="text-4xl">🚗</div>
          <div>
            <h2 className="font-black uppercase" style={{ color: "white", fontSize: "1.3rem" }}>
              Estimateur d'Épave
            </h2>
            <p style={{ color: "#86efac", fontSize: "0.85rem" }}>
              Catalogue intégré — 10 marques, 5 catégories
            </p>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl p-6 shadow-xl"
        style={{ background: "#1a1a1a", border: "1px solid #2d2d2d" }}
      >
        {/* Marque */}
        <div className="mb-5">
          <label style={labelStyle}>🏭 Marque du véhicule</label>
          <div style={{ position: "relative" }}>
            <select
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              style={selectStyle}
            >
              <option value="">Sélectionnez une marque</option>
              {marques.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}>▼</div>
          </div>
        </div>

        {/* Catégorie */}
        <div className="mb-5">
          <label style={labelStyle}>🚘 Catégorie du véhicule</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategorie(cat.id)}
                className="py-3 px-3 rounded-xl transition-all active:scale-95 text-left"
                style={{
                  background: categorie === cat.id ? "#14532d" : "#1c1c1c",
                  border: `1.5px solid ${categorie === cat.id ? "#16a34a" : "#3d3d3d"}`,
                  color: categorie === cat.id ? "#4ade80" : "#9ca3af",
                }}
              >
                <div style={{ fontSize: "1.3rem" }}>{cat.icon}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, marginTop: "4px" }}>{cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}</div>
                <div style={{ fontSize: "0.65rem", color: categorie === cat.id ? "#86efac" : "#6b7280" }}>{cat.poids} kg</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prix */}
        <div className="mb-5">
          <label style={labelStyle}>💰 Prix ferraille actuel (€/kg)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Ex : 0.18"
            value={prixKg}
            onChange={(e) => setPrixKg(e.target.value)}
            style={selectStyle}
            onFocus={(e) => (e.target.style.borderColor = "#16a34a")}
            onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={estimate}
            className="flex-1 py-4 rounded-2xl font-black uppercase transition-all active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "white", fontSize: "1rem", letterSpacing: "0.05em" }}
          >
            Estimer
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
          <div
            className="mt-6 rounded-2xl p-6 shadow-xl"
            style={{ background: "linear-gradient(135deg, #1c1c1c, #252525)", border: "2px solid #16a34a" }}
          >
            {/* Vehicle illustration */}
            <div
              className="flex items-center justify-center rounded-2xl mb-5 py-6"
              style={{ background: "#14532d22", border: "1px dashed #16a34a44" }}
            >
              <span style={{ fontSize: "5rem" }}>{result.cat.icon}</span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div>
                <div style={{ color: "#9ca3af", fontSize: "0.7rem" }}>VÉHICULE ESTIMÉ</div>
                <div style={{ color: "white", fontSize: "1.1rem" }} className="font-black uppercase">
                  {marque} · {result.cat.id.charAt(0).toUpperCase() + result.cat.id.slice(1)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div
                className="rounded-xl p-4"
                style={{ background: "#16a34a18", border: "1px solid #16a34a33" }}
              >
                <div style={{ color: "#9ca3af", fontSize: "0.7rem", fontWeight: 700 }}>POIDS ESTIMÉ</div>
                <div style={{ color: "#4ade80", fontSize: "1.6rem" }} className="font-black">
                  {result.poids.toLocaleString("fr-FR")} <span style={{ fontSize: "0.85rem" }}>kg</span>
                </div>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ background: "#16a34a18", border: "1px solid #16a34a33" }}
              >
                <div style={{ color: "#9ca3af", fontSize: "0.7rem", fontWeight: 700 }}>VALEUR ESTIMÉE</div>
                <div style={{ color: "#4ade80", fontSize: "1.6rem" }} className="font-black">
                  {result.valeur.toFixed(0)} <span style={{ fontSize: "0.85rem" }}>€</span>
                </div>
              </div>
            </div>

            <div
              className="mt-3 rounded-xl p-3 text-center"
              style={{ background: "#1a1a1a" }}
            >
              <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                {marque} {result.cat.id} · {result.poids} kg × {parseFloat(prixKg).toFixed(2)} €/kg = <strong style={{ color: "#4ade80" }}>{result.valeur.toFixed(2)} €</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Reference table */}
      <div
        className="rounded-2xl p-5 mt-4 shadow-xl"
        style={{ background: "#1a1a1a", border: "1px solid #2d2d2d" }}
      >
        <div style={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 700, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          📊 Tableau de référence des poids
        </div>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #2d2d2d" }}>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "1.2rem" }}>{cat.icon}</span>
                <span style={{ color: "#d1d5db", fontSize: "0.9rem", fontWeight: 600 }}>{cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}</span>
              </div>
              <span style={{ color: "#4ade80", fontWeight: 700 }}>{cat.poids.toLocaleString("fr-FR")} kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
