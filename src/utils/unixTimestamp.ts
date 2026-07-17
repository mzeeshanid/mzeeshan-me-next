export type UnixTimestampUnit = "s" | "ms" | "us" | "ns";

export const UNIT_LABELS: Record<UnixTimestampUnit, string> = {
  s: "Seconds",
  ms: "Milliseconds",
  us: "Microseconds",
  ns: "Nanoseconds",
};

export const toMs = (value: number, unit: UnixTimestampUnit): number => {
  switch (unit) {
    case "s":
      return value * 1000;
    case "ms":
      return value;
    case "us":
      return value / 1000;
    case "ns":
      return value / 1_000_000;
  }
};

export const fromMs = (ms: number, unit: UnixTimestampUnit): number => {
  switch (unit) {
    case "s":
      return Math.floor(ms / 1000);
    case "ms":
      return ms;
    case "us":
      return ms * 1000;
    case "ns":
      return ms * 1_000_000;
  }
};

/**
 * Infers the timestamp unit from digit length: 10 digits = seconds,
 * 13 = milliseconds, 16 = microseconds, 19 = nanoseconds (the same
 * convention every timestamp cluster on the web assumes).
 */
export const detectUnit = (input: string): UnixTimestampUnit | null => {
  const digits = input.trim().replace(/^-/, "");
  if (!digits || !/^\d+$/.test(digits)) return null;
  const len = digits.length;
  if (len <= 10) return "s";
  if (len <= 13) return "ms";
  if (len <= 16) return "us";
  return "ns";
};

export const relativeTime = (ms: number): string => {
  const diffSec = Math.floor((Date.now() - ms) / 1000);
  const abs = Math.abs(diffSec);
  const future = diffSec < 0;
  if (abs < 5) return "just now";
  if (abs < 60) return `${abs}s ${future ? "from now" : "ago"}`;
  if (abs < 3600) return `${Math.floor(abs / 60)}m ${future ? "from now" : "ago"}`;
  if (abs < 86400) return `${Math.floor(abs / 3600)}h ${future ? "from now" : "ago"}`;
  return `${Math.floor(abs / 86400)}d ${future ? "from now" : "ago"}`;
};

export type DurationBreakdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  future: boolean;
};

export const durationBetween = (msA: number, msB: number): DurationBreakdown => {
  const diffMs = msB - msA;
  const future = diffMs < 0;
  const totalSec = Math.floor(Math.abs(diffMs) / 1000);
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    future,
  };
};
