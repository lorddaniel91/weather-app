/**
 * - Város betöltése localStorage-ból (induláskor).
 * - Ha nincs város: megnyitjuk a CityModal-t.
 * - Város kijelölésekor elmentjük (localStorage), majd lekérjük az időjárást.
 * - Bal oldal: aktuális állapot. Jobb oldal: 7 nap + grafikon.
 */
import { useEffect, useState } from "react";
import CityModal from "./components/CityModal";
import DailyList from "./components/DailyList";
import TempChart from "./components/TempChart";
import { getForecast } from "./services/openMeteo";
import { codeToLabel, codeToIcon } from "./utils/weatherCode";
import "./App.css";

export default function App() {
  const [city, setCity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [forecast, setForecast] = useState({ current: null, days: [] });

  // induláskor: város betöltése
  useEffect(() => {
    const saved = localStorage.getItem("city");
    if (saved) setCity(JSON.parse(saved));
  }, []);

  // ha város van, kérjük le az előrejelzést
  useEffect(() => {
    async function load() {
      if (!city) return;
      setLoading(true);
      setErr("");
      try {
        const f = await getForecast(city.lat, city.lon);
        setForecast(f);
      } catch {
        setErr("Nem sikerült lekérni az időjárást.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city]);

  function handleSelectCity(c) {
    setCity(c);
    localStorage.setItem("city", JSON.stringify(c));
    setShowModal(false);
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>Időjárás</h1>
        <div className="actions">
          <button className="linklike" onClick={() => setShowModal(true)}>
            {city ? `${city.name} módosítása` : "Város kiválasztása"}
          </button>
        </div>
      </header>

      <div className="layout">
        {/* Bal oszlop: aktuális állapot */}
        <div>
          {city ? (
            <section className="section">
              <h2 className="section-title">
                {city.name}
                {city.admin1 ? `, ${city.admin1}` : ""} — {city.country}
              </h2>

              {loading && <p>Betöltés…</p>}
              {err && <p className="error">{err}</p>}

              {!loading && !err && forecast?.current && (
                <>
                  <div className="curr-temp">
                    {Math.round(forecast.current.temp)}°C
                  </div>
                  <div className="curr-desc">
                    <span className="icon">
                      {codeToIcon(forecast.current.code, { size: 20 })}
                    </span>
                    {codeToLabel(forecast.current.code)}
                  </div>
                </>
              )}
            </section>
          ) : (
            <section className="section">Nincs még város kiválasztva.</section>
          )}
        </div>

        {/* Jobb oszlop: 7 nap + grafikon */}
        <div>
          {!loading && !err && forecast?.days?.length > 0 && (
            <>
              <section className="section">
                <h3 className="section-title">7 napos előrejelzés</h3>
                <DailyList days={forecast.days} />
              </section>

              <div className="chart-card">
                <div className="chart-inner">
                  <TempChart days={forecast.days} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <CityModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleSelectCity}
      />
      <footer className="footer">Jelentkező neve : Rácz Dániel</footer>
    </div>
  );
}
