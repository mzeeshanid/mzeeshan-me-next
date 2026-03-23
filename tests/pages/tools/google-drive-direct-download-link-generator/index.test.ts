import { describe, expect, it } from "vitest";
import {
  buildGoogleDriveDirectLink,
  buildGoogleDriveDirectLinks,
  extractGoogleDriveFileId,
  isValidGoogleDriveShareableLink,
} from "@/utils/driveDirect";
import { shareableLinkValidationSchema } from "@/validations/shareableLinkValidationSchema";
import { shareableLinksValidationSchema } from "@/validations/shareableLinksValidationSchema";

const filePathUrl =
  "https://drive.google.com/file/d/1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO/view?usp=drive_link";
const queryIdUrl =
  "https://drive.google.com/open?id=1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO";
const expectedDirectLink =
  "https://drive.google.com/uc?export=download&id=1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO";

describe("/tools/google-drive-direct-download-link-generator logic", () => {
  it("accepts valid Google Drive shareable links", () => {
    expect(isValidGoogleDriveShareableLink(filePathUrl)).toBe(true);
  });

  it("rejects non-Google Drive links", () => {
    expect(
      isValidGoogleDriveShareableLink(
        "https://example.com/file/d/1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO/view",
      ),
    ).toBe(false);
  });

  it("extracts a file id from a standard file path URL", () => {
    expect(extractGoogleDriveFileId(filePathUrl)).toBe(
      "1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO",
    );
  });

  it("extracts a file id from a query-string based URL", () => {
    expect(extractGoogleDriveFileId(queryIdUrl)).toBe(
      "1saOkqD7E3U3i5UzfJjsoiG4sL0Os66qO",
    );
  });

  it("returns null for malformed shareable URLs", () => {
    expect(extractGoogleDriveFileId("not-a-url")).toBeNull();
    expect(buildGoogleDriveDirectLink("not-a-url")).toBeNull();
  });

  it("builds a direct download link from a valid shareable URL", () => {
    expect(buildGoogleDriveDirectLink(filePathUrl)).toBe(expectedDirectLink);
  });

  it("builds multiple direct links and skips invalid items", () => {
    expect(
      buildGoogleDriveDirectLinks([
        filePathUrl,
        "",
        "not-a-url",
        queryIdUrl,
      ]),
    ).toEqual([expectedDirectLink, expectedDirectLink]);
  });

  it("validates a single shareable link payload", async () => {
    await expect(
      shareableLinkValidationSchema.validate({
        gdriveUrl: filePathUrl,
      }),
    ).resolves.toEqual({
      gdriveUrl: filePathUrl,
    });
  });

  it("rejects an invalid single shareable link payload", async () => {
    await expect(
      shareableLinkValidationSchema.validate({
        gdriveUrl: "https://example.com/not-google-drive",
      }),
    ).rejects.toThrow("Enter a valid google drive shareable link");
  });

  it("validates multiple shareable links", async () => {
    await expect(
      shareableLinksValidationSchema.validate({
        gdriveUrls: [filePathUrl, filePathUrl],
      }),
    ).resolves.toEqual({
      gdriveUrls: [filePathUrl, filePathUrl],
    });
  });

  it("reports the invalid item index in multiple shareable links", async () => {
    await expect(
      shareableLinksValidationSchema.validate({
        gdriveUrls: [filePathUrl, "https://example.com/bad-link", filePathUrl],
      }),
    ).rejects.toThrow("Invalid google drive shareable link at index: 2");
  });

  it("requires at least one shareable link in the multiple-links schema", async () => {
    await expect(
      shareableLinksValidationSchema.validate({
        gdriveUrls: [],
      }),
    ).rejects.toThrow("Enter google drive shareable links");
  });
});
