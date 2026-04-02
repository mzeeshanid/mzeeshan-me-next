// @vitest-environment jsdom
import AppIconGeneratorHero from "@/components/Tools/AppIconGenerator/Hero/AppIconGeneratorHero";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../testUtils/renderWithProviders";

const createFile = () => new File(["icon"], "icon.png", { type: "image/png" });

describe("/tools/app-icon-generator integration", () => {
  const createObjectURL = vi.fn(() => "blob:preview");
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("URL", {
      createObjectURL,
      revokeObjectURL,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("keeps generate disabled until an image and platform are provided", () => {
    renderWithProviders(<AppIconGeneratorHero />);
    expect(screen.getByTestId("generate-button")).toBeDisabled();
  });

  it("submits the selected options and resets the uploaded image after success", async () => {
    const onGenerateArchive = vi
      .fn()
      .mockResolvedValue({ filename: "app-icons.zip" });

    renderWithProviders(
      <AppIconGeneratorHero
        resolveImageDimensions={vi.fn().mockResolvedValue({ width: 1024, height: 1024 })}
        onGenerateArchive={onGenerateArchive}
      />,
    );

    fireEvent.change(screen.getByTestId("image-upload-input"), {
      target: { files: [createFile()] },
    });

    await waitFor(() => {
      expect(screen.getByText(/icon.png/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("platform-option-iphone"));

    await waitFor(() => {
      expect(screen.getByTestId("generate-button")).toBeEnabled();
    });

    fireEvent.click(screen.getByTestId("generate-button"));

    await waitFor(() => {
      expect(onGenerateArchive).toHaveBeenCalledWith(
        expect.objectContaining({
          androidFileName: "ic_launcher",
          imageFile: expect.any(File),
          selection: expect.objectContaining({ iphone: true }),
        }),
      );
    });

    await waitFor(() => {
      expect(screen.queryByText(/icon.png/i)).not.toBeInTheDocument();
    });
  });
});
