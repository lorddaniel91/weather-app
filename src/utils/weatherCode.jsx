// WMO kód → magyar címke + ikon (lucide-react)
import {
  Sun,
  Cloud,
  CloudFog,
  CloudRain,
  Snowflake,
  CloudLightning,
} from "lucide-react";

const GROUPS = [
  { codes: [0], label: "Tiszta idő", Icon: Sun },
  { codes: [1, 2, 3], label: "Változóan felhős", Icon: Cloud },
  { codes: [45, 48], label: "Köd", Icon: CloudFog },
  {
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
    label: "Eső",
    Icon: CloudRain,
  },
  { codes: [71, 73, 75, 77, 85, 86], label: "Havazás", Icon: Snowflake },
  { codes: [95, 96, 99], label: "Zivatar", Icon: CloudLightning },
];

function pick(code) {
  const n = Number(code);
  return (
    GROUPS.find((g) => g.codes.includes(n)) || {
      label: "Ismeretlen",
      Icon: Cloud,
    }
  );
}

export const codeToLabel = (code) => pick(code).label;
export function codeToIcon(code, props) {
  const { Icon } = pick(code);
  return <Icon {...props} />;
}
