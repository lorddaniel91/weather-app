/**
 * DailyList
 * - 3 oszlop: nap | csapadék esély (%) | min°C / max°C
 */
import { CloudRain } from "lucide-react";

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
          <div className="day-name">{dayName(d.date)}</div>

          <div className="day-pop">
            {d.pop != null ? (
              <span className="rain-prob">
                <CloudRain size={18} className="rain-icon" />
                {d.pop}%
              </span>
            ) : (
              "-"
            )}
          </div>

          <div className="day-temps">
            {Math.round(d.tMin)}°C / {Math.round(d.tMax)}°C
          </div>
        </li>
      ))}
    </ul>
  );
}
