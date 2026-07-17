import { UnixTimestampSectionHeader } from "./unixTimestampFeaturesData";

export type UnixTimestampDiscordFormat = {
  code: "t" | "T" | "d" | "D" | "f" | "F" | "R";
  label: string;
};

export type UnixTimestampDiscordData = {
  header: UnixTimestampSectionHeader;
  formats: UnixTimestampDiscordFormat[];
};

export const unixTimestampDiscordData: UnixTimestampDiscordData = {
  header: {
    badge: "Discord Format",
    title: "Discord Timestamp Generator",
    desc: "Discord messages support dynamic timestamps that render in each viewer's own timezone and locale. Pick a date below, then paste any of the codes into a Discord message.",
  },
  formats: [
    { code: "t", label: "Short Time" },
    { code: "T", label: "Long Time" },
    { code: "d", label: "Short Date" },
    { code: "D", label: "Long Date" },
    { code: "f", label: "Short Date/Time" },
    { code: "F", label: "Long Date/Time" },
    { code: "R", label: "Relative" },
  ],
};
