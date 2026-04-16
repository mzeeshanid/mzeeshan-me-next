// @vitest-environment jsdom
import AppIconGeneratorGenerateButton from "@/components/Tools/AppIconGenerator/Hero/AppIconGeneratorGenerateButton";
import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../testUtils/renderWithProviders";

describe("AppIconGeneratorGenerateButton", () => {
  it("is disabled when asked", () => {
    renderWithProviders(
      <AppIconGeneratorGenerateButton disabled loading={false} onClick={vi.fn()} />,
    );

    expect(screen.getByTestId("generate-button")).toBeDisabled();
  });

  it("is enabled when validations pass", () => {
    renderWithProviders(
      <AppIconGeneratorGenerateButton disabled={false} loading={false} onClick={vi.fn()} />,
    );

    expect(screen.getByTestId("generate-button")).toBeEnabled();
  });

  it("invokes the click handler", () => {
    const onClick = vi.fn();

    renderWithProviders(
      <AppIconGeneratorGenerateButton disabled={false} loading={false} onClick={onClick} />,
    );

    fireEvent.click(screen.getByTestId("generate-button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
