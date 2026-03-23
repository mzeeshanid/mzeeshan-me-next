import { describe, expect, it } from "vitest";
import {
  calculateMissingAspectRatioDimension,
  formatSmart,
  gcd,
  simplifyRatio,
} from "@/utils/aspectRatio";
import { aspectRatioValidationSchema } from "@/validations/aspectRatioValidationSchema";

describe("/tools/aspect-ratio-calculator logic", () => {
  it("reduces dimensions to the simplest ratio", () => {
    expect(gcd(1920, 1080)).toBe(120);
    expect(simplifyRatio(1920, 1080)).toEqual([16, 9]);
    expect(simplifyRatio(1080, 1920)).toEqual([9, 16]);
  });

  it("formats ratio numbers without trailing zeroes", () => {
    expect(formatSmart(1)).toBe("1");
    expect(formatSmart(1.2)).toBe("1.2");
    expect(formatSmart(1.234, 2)).toBe("1.23");
  });

  it("calculates the missing height while preserving the ratio", () => {
    expect(
      calculateMissingAspectRatioDimension({
        originalWidth: 16,
        originalHeight: 9,
        desiredWidth: 320,
        roundValues: true,
        lastEdited: "desiredWidth",
      }),
    ).toEqual({
      desiredWidth: "320",
      desiredHeight: "180",
    });
  });

  it("calculates the missing width with optional decimal precision", () => {
    expect(
      calculateMissingAspectRatioDimension({
        originalWidth: 4,
        originalHeight: 3,
        desiredHeight: 250,
        roundValues: false,
        lastEdited: "desiredHeight",
      }),
    ).toEqual({
      desiredWidth: "333.33",
      desiredHeight: "250",
    });
  });

  it("validates a complete aspect ratio input payload", async () => {
    await expect(
      aspectRatioValidationSchema.validate({
        originalWidth: "1920",
        originalHeight: "1080",
        desiredWidth: "320",
        desiredHeight: "",
      }),
    ).resolves.toEqual({
      originalWidth: "1920",
      originalHeight: "1080",
      desiredWidth: "320",
      desiredHeight: "",
    });
  });

  it("rejects invalid source dimensions", async () => {
    await expect(
      aspectRatioValidationSchema.validate({
        originalWidth: "0",
        originalHeight: "-1",
        desiredWidth: "100",
        desiredHeight: "",
      }),
    ).rejects.toThrow("Enter a valid positive number");
  });

  it("requires one desired dimension", async () => {
    await expect(
      aspectRatioValidationSchema.validate({
        originalWidth: "1920",
        originalHeight: "1080",
        desiredWidth: "",
        desiredHeight: "",
      }),
    ).rejects.toThrow("Enter either desired width or desired height");
  });
});
