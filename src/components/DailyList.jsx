/**
 * DailyList
 * - 3 oszlop: nap | csapadék esély (%) | min°C / max°C
 */
function dayName(dateISO) {
  const d = new Date(dateISO + "T12:00:00");
  return new Intl.DateTimeFormat("hu-HU", { weekday: "long" }).format(d);
}

export default function DailyList({ days }) {
  if (!days?.length) return null;

  return (
    <ul className="days">
      {days.map((d) => (
        <li key={d.date} className="day">
          <div className="day-name">
            {new Intl.DateTimeFormat("hu-HU", { weekday: "long" }).format(
              new Date(d.date + "T12:00:00")
            )}
          </div>

          <div className="day-pop">{d.pop != null ? `${d.pop}%` : "-"}</div>

          <div className="day-temps">
            {Math.round(d.tMin)}°C / {Math.round(d.tMax)}°C
          </div>
        </li>
      ))}
    </ul>
  );
}
