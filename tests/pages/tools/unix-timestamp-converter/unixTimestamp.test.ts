import { describe, expect, it } from "vitest";
import {
  detectUnit,
  durationBetween,
  fromMs,
  relativeTime,
  toMs,
} from "@/utils/unixTimestamp";

describe("/tools/unix-timestamp-converter logic", () => {
  it("detects the unit from digit length", () => {
    expect(detectUnit("1700000000")).toBe("s");
    expect(detectUnit("1700000000000")).toBe("ms");
    expect(detectUnit("1700000000000000")).toBe("us");
    expect(detectUnit("1700000000000000000")).toBe("ns");
    expect(detectUnit("")).toBeNull();
    expect(detectUnit("not-a-number")).toBeNull();
  });

  it("converts between a raw value and epoch milliseconds", () => {
    expect(toMs(1700000000, "s")).toBe(1700000000000);
    expect(toMs(1700000000000, "ms")).toBe(1700000000000);
    expect(fromMs(1700000000000, "s")).toBe(1700000000);
    expect(fromMs(1700000000000, "ms")).toBe(1700000000000);
  });

  it("reports relative time for past and future instants", () => {
    const now = Date.now();
    expect(relativeTime(now - 90 * 1000)).toBe("1m ago");
    expect(relativeTime(now + 90 * 1000)).toBe("1m from now");
  });

  it("breaks a duration down into days/hours/minutes/seconds", () => {
    const a = new Date("2024-01-01T00:00:00Z").getTime();
    const b = new Date("2024-01-02T01:02:03Z").getTime();
    expect(durationBetween(a, b)).toEqual({
      days: 1,
      hours: 1,
      minutes: 2,
      seconds: 3,
      future: false,
    });
    expect(durationBetween(b, a).future).toBe(true);
  });
});
