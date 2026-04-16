// @vitest-environment jsdom
import AppIconGeneratorPlatformOptions from "@/components/Tools/AppIconGenerator/Hero/AppIconGeneratorPlatformOptions";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../testUtils/renderWithProviders";

const baseSelection = {
  iphone: false,
  ipad: false,
  watchos: false,
  macos: false,
  android: false,
};

describe("AppIconGeneratorPlatformOptions", () => {
  it("toggles platform checkboxes", async () => {
    const user = userEvent.setup();
    const onPlatformChange = vi.fn();

    renderWithProviders(
      <AppIconGeneratorPlatformOptions
        selection={baseSelection}
        onPlatformChange={onPlatformChange}
      />,
    );

    await user.click(screen.getByTestId("platform-option-iphone"));
    expect(onPlatformChange).toHaveBeenCalledWith("iphone", true);
  });

  it("shows iOS platform options", () => {
    renderWithProviders(
      <AppIconGeneratorPlatformOptions
        selection={{ ...baseSelection, ipad: true }}
        onPlatformChange={vi.fn()}
      />,
    );

    expect(screen.getByTestId("platform-option-ipad")).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  it("preserves controlled checked state", () => {
    renderWithProviders(
      <AppIconGeneratorPlatformOptions
        selection={{ ...baseSelection, ipad: true }}
        onPlatformChange={vi.fn()}
      />,
    );

    expect(screen.getByTestId("platform-option-ipad")).toHaveAttribute(
      "data-state",
      "checked",
    );
  });
});
