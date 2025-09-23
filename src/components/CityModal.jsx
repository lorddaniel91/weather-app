import { useState } from "react";
import { searchCities } from "../services/openMeteo";

export default function CityModal({ isOpen, onClose, onSelect }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  if (!isOpen) return null;

  async function handleSearch(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const list = await searchCities(q);
      setResults(list);
      if (list.length === 0) setErr("Nincs találat.");
    } catch {
      setErr("Hiba történt a keresésnél.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Város keresése</h3>
        <form onSubmit={handleSearch} className="row">
          <input
            placeholder="Pl.: Budapest"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Keresés..." : "Keresés"}
          </button>
          <button type="button" className="ghost" onClick={onClose}>
            Mégse
          </button>
        </form>

        {err && <p className="error">{err}</p>}

        <ul className="results">
          {results.map((c) => (
            <li key={c.id}>
              <button className="result-item" onClick={() => onSelect(c)}>
                <strong>{c.name}</strong>
                <span>
                  {c.admin1 ? `${c.admin1}, ` : ""}
                  {c.country} — ({c.lat.toFixed(2)}, {c.lon.toFixed(2)})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
