// @vitest-environment jsdom
import AppIconGeneratorHero from "@/components/Tools/AppIconGenerator/Hero/AppIconGeneratorHero";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../testUtils/renderWithProviders";

describe("/tools/app-icon-generator integration", () => {
  const createObjectURL = vi.fn(() => "blob:preview");
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("generate is enabled by default (iPhone selected on load)", () => {
    renderWithProviders(<AppIconGeneratorHero />);
    expect(screen.getByTestId("generate-button")).toBeEnabled();
  });

  it("disables generate when all platforms are deselected", async () => {
    renderWithProviders(<AppIconGeneratorHero />);

    fireEvent.click(screen.getByTestId("platform-option-iphone"));

    await waitFor(() => {
      expect(screen.getByTestId("generate-button")).toBeDisabled();
    });
  });
});
