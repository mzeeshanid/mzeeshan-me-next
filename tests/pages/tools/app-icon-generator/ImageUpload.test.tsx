// @vitest-environment jsdom
import AppIconImageUpload from "@/components/Tools/AppIconGenerator/Hero/AppIconImageUpload";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../testUtils/renderWithProviders";

const createFile = (type = "image/png") =>
  new File(["icon"], "icon.png", { type });

describe("AppIconImageUpload", () => {
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

  it("handles click-to-upload with a valid image", async () => {
    const onImageAccepted = vi.fn();
    const onValidationMessage = vi.fn();

    renderWithProviders(
      <AppIconImageUpload
        image={null}
        error={null}
        warning={null}
        onImageAccepted={onImageAccepted}
        onImageRemoved={vi.fn()}
        onValidationMessage={onValidationMessage}
        resolveImageDimensions={vi.fn().mockResolvedValue({ width: 1024, height: 1024 })}
      />,
    );

    fireEvent.change(screen.getByTestId("image-upload-input"), {
      target: { files: [createFile()] },
    });

    await waitFor(() => {
      expect(onImageAccepted).toHaveBeenCalledTimes(1);
    });

    expect(onValidationMessage).toHaveBeenLastCalledWith(null);
  });

  it("handles drag-and-drop upload", async () => {
    const onImageAccepted = vi.fn();

    renderWithProviders(
      <AppIconImageUpload
        image={null}
        error={null}
        warning={null}
        onImageAccepted={onImageAccepted}
        onImageRemoved={vi.fn()}
        onValidationMessage={vi.fn()}
        resolveImageDimensions={vi.fn().mockResolvedValue({ width: 512, height: 512 })}
      />,
    );

    fireEvent.drop(screen.getByTestId("image-upload-dropzone"), {
      dataTransfer: { files: [createFile("image/webp")] },
    });

    await waitFor(() => {
      expect(onImageAccepted).toHaveBeenCalledTimes(1);
    });
  });

  it("rejects unsupported file types", async () => {
    const onValidationMessage = vi.fn();

    renderWithProviders(
      <AppIconImageUpload
        image={null}
        error={null}
        warning={null}
        onImageAccepted={vi.fn()}
        onImageRemoved={vi.fn()}
        onValidationMessage={onValidationMessage}
      />,
    );

    fireEvent.change(screen.getByTestId("image-upload-input"), {
      target: { files: [createFile("application/pdf")] },
    });

    await waitFor(() => {
      expect(onValidationMessage).toHaveBeenCalledWith(
        "Unsupported file format. Use PNG, JPG, or WEBP.",
      );
    });
  });

  it("shows the preview state and removes image", () => {
    const onImageRemoved = vi.fn();

    renderWithProviders(
      <AppIconImageUpload
        image={{
          file: createFile(),
          previewUrl: "blob:preview",
          width: 1024,
          height: 1024,
        }}
        error={null}
        warning={null}
        onImageAccepted={vi.fn()}
        onImageRemoved={onImageRemoved}
        onValidationMessage={vi.fn()}
      />,
    );

    expect(screen.getByText(/icon.png/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /remove and upload different image/i }));
    expect(onImageRemoved).toHaveBeenCalledTimes(1);
  });
});
