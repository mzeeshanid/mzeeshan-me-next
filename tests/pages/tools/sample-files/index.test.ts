import { describe, expect, it } from "vitest";
import { sampleFilesRequestValidationSchema } from "@/validations/sampleFilesRequestValidationSchema";

describe("/tools/sample-files logic", () => {
  it("accepts valid extension requests", async () => {
    await expect(
      sampleFilesRequestValidationSchema.validate({
        extension: "mp4",
        email: "user@example.com",
      }),
    ).resolves.toEqual({
      extension: "mp4",
      email: "user@example.com",
    });
  });

  it("allows missing email addresses", async () => {
    await expect(
      sampleFilesRequestValidationSchema.validate({
        extension: "flac",
        email: "",
      }),
    ).resolves.toEqual({
      extension: "flac",
      email: "",
    });
  });

  it("rejects very short extensions", async () => {
    await expect(
      sampleFilesRequestValidationSchema.validate({
        extension: "a",
        email: "",
      }),
    ).rejects.toThrow("Extension must be at least 2 characters");
  });

  it("rejects invalid characters in the extension", async () => {
    await expect(
      sampleFilesRequestValidationSchema.validate({
        extension: "mp-4",
        email: "",
      }),
    ).rejects.toThrow("Extension can only contain letters and numbers");
  });

  it("rejects invalid email addresses", async () => {
    await expect(
      sampleFilesRequestValidationSchema.validate({
        extension: "pdf",
        email: "not-an-email",
      }),
    ).rejects.toThrow("Please enter a valid email address");
  });
});
