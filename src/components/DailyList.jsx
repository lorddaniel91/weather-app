import { codeToLabel, codeToIcon } from "../utils/weatherCode";

function dayName(dateISO) {
  const d = new Date(dateISO + "T12:00:00");
  return new Intl.DateTimeFormat("hu-HU", { weekday: "short" }).format(d);
}

export default function DailyList({ days }) {
  if (!days?.length) return null;

  return (
    <ul className="days">
      {days.map((d) => (
        <li key={d.date} className="day">
          <div className="day-name">{dayName(d.date)}</div>

          <div className="day-desc">
            <span className="icon">{codeToIcon(d.code, { size: 16 })}</span>
            {codeToLabel(d.code)}
          </div>

          <div className="day-pop">{d.pop != null ? `${d.pop}%` : "-"}</div>

          <div className="day-temps">
            <span className="tmax">{Math.round(d.tMax)}°</span>
            <span className="tmin">{Math.round(d.tMin)}°</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
