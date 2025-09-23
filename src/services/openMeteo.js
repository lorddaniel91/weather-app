// Városkeresés a geocoding API-val
export async function searchCities(query) {
  if (!query?.trim()) return []; // üres keresésre ne kérjünk semmit
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query
  )}&count=5&language=hu&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding hiba");
  const data = await res.json();

  // térjünk vissza a szükséges adatokkal
  return (data.results || []).map((r) => ({
    id: `${r.id}-${r.latitude}-${r.longitude}`,
    name: r.name,
    country: r.country,
    admin1: r.admin1,
    lat: r.latitude,
    lon: r.longitude,
  }));
}
// Időjárás lekérdezése a forecast API-val
export async function getForecast(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&forecast_days=7&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Időjárás lekérési hiba");
  const data = await res.json();

  const current = {
    temp: data?.current?.temperature_2m ?? null,
    code: data?.current?.weather_code ?? null,
  };

  const d = data?.daily || {};
  const days = (d.time || []).map((date, i) => ({
    date,
    code: d.weather_code?.[i] ?? null,
    tMax: d.temperature_2m_max?.[i] ?? null,
    tMin: d.temperature_2m_min?.[i] ?? null,
    pop: d.precipitation_probability_max?.[i] ?? null,
  }));

  return { current, days };
}
