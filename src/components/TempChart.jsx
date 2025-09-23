/**
 * TempChart
 * - Recharts vonaldiagram a napi maximum hőmérsékletekről.
 * - ResponsiveContainer: a szülő elem méretéhez igazodik.
 * - Fehér témájú tengely/rács az ajánlott Figma mintára.
 */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function formatData(days) {
  return days.map((d) => ({
    name: new Intl.DateTimeFormat("hu-HU", { weekday: "short" }).format(
      new Date(d.date + "T12:00:00")
    ),
    tMax: Math.round(d.tMax),
  }));
}

export default function TempChart({ days }) {
  if (!days?.length) return null;
  const data = formatData(days);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 8, right: 12, bottom: 8, left: 12 }}
      >
        <CartesianGrid stroke="rgba(255,255,255,0.25)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "#fff" }}
          axisLine={{ stroke: "rgba(255,255,255,0.6)" }}
          tickLine={{ stroke: "rgba(255,255,255,0.6)" }}
        />
        <YAxis
          unit="°"
          tick={{ fill: "#fff" }}
          axisLine={{ stroke: "rgba(255,255,255,0.6)" }}
          tickLine={{ stroke: "rgba(255,255,255,0.6)" }}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.5)",
            color: "#fff",
          }}
        />
        <Line
          type="monotone"
          dataKey="tMax"
          stroke="#fff"
          strokeWidth={2}
          dot={{ r: 2, stroke: "#fff", fill: "#fff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
