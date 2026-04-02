// @vitest-environment jsdom
import AppIconGenerateButton from "@/components/Tools/AppIconGenerator/Hero/AppIconGenerateButton";
import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../testUtils/renderWithProviders";

describe("AppIconGenerateButton", () => {
  it("is disabled when asked", () => {
    renderWithProviders(
      <AppIconGenerateButton disabled loading={false} onClick={vi.fn()} />,
    );

    expect(screen.getByTestId("generate-button")).toBeDisabled();
  });

  it("is enabled when validations pass", () => {
    renderWithProviders(
      <AppIconGenerateButton disabled={false} loading={false} onClick={vi.fn()} />,
    );

    expect(screen.getByTestId("generate-button")).toBeEnabled();
  });

  it("invokes the click handler", () => {
    const onClick = vi.fn();

    renderWithProviders(
      <AppIconGenerateButton disabled={false} loading={false} onClick={onClick} />,
    );

    fireEvent.click(screen.getByTestId("generate-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
