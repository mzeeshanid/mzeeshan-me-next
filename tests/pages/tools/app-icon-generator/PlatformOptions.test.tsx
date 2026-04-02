// @vitest-environment jsdom
import AppIconPlatformOptions from "@/components/Tools/AppIconGenerator/Hero/AppIconPlatformOptions";
import { fireEvent, screen } from "@testing-library/react";
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

describe("AppIconPlatformOptions", () => {
  it("toggles platform checkboxes", () => {
    const onPlatformChange = vi.fn();

    renderWithProviders(
      <AppIconPlatformOptions
        selection={baseSelection}
        androidFileName="ic_launcher"
        onPlatformChange={onPlatformChange}
        onAndroidFileNameChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(onPlatformChange).toHaveBeenCalledWith("iphone", true);
  });

  it("shows android filename validation when android is selected", () => {
    renderWithProviders(
      <AppIconPlatformOptions
        selection={{ ...baseSelection, android: true }}
        androidFileName="Invalid Name"
        onPlatformChange={vi.fn()}
        onAndroidFileNameChange={vi.fn()}
      />,
    );

    expect(
      screen.getByText(/Use lowercase letters, numbers, and underscores/i),
    ).toBeInTheDocument();
  });

  it("preserves controlled state values", () => {
    renderWithProviders(
      <AppIconPlatformOptions
        selection={{ ...baseSelection, ipad: true }}
        androidFileName="custom_icon"
        onPlatformChange={vi.fn()}
        onAndroidFileNameChange={vi.fn()}
      />,
    );

    expect(screen.getByDisplayValue("custom_icon")).toBeInTheDocument();
    expect(screen.getByTestId("platform-option-ipad")).toHaveAttribute(
      "data-state",
      "checked",
    );
  });
});
