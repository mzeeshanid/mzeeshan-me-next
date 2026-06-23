// @vitest-environment jsdom
import React from "react";
import { render, screen, act, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  ColorPaletteProvider,
  DEFAULT_PALETTE,
  parsePaletteCookie,
  PALETTE_COOKIE,
  useColorPalette,
} from "@/contexts/useColorPalette";

afterEach(() => {
  cleanup();
  // Reset DOM attribute between tests
  delete document.documentElement.dataset.colorPalette;
});

let renderCount = 0;

function PaletteConsumer() {
  renderCount++;
  const { palette } = useColorPalette();
  return <div data-testid="palette">{palette}</div>;
}

// ---------------------------------------------------------------------------
// parsePaletteCookie
// ---------------------------------------------------------------------------
describe("parsePaletteCookie", () => {
  it("returns the palette from a simple cookie header", () => {
    expect(parsePaletteCookie(`${PALETTE_COOKIE}=blue`)).toBe("blue");
  });

  it("parses correctly when the palette cookie is not the first one", () => {
    expect(
      parsePaletteCookie(`some-other=value; ${PALETTE_COOKIE}=purple; x=1`)
    ).toBe("purple");
  });

  it("falls back to DEFAULT_PALETTE for an unknown palette value", () => {
    expect(parsePaletteCookie(`${PALETTE_COOKIE}=rainbow`)).toBe(
      DEFAULT_PALETTE
    );
  });

  it("falls back to DEFAULT_PALETTE when the cookie is absent", () => {
    expect(parsePaletteCookie("some-other=value")).toBe(DEFAULT_PALETTE);
  });

  it("falls back to DEFAULT_PALETTE for an empty header", () => {
    expect(parsePaletteCookie("")).toBe(DEFAULT_PALETTE);
  });
});

// ---------------------------------------------------------------------------
// ColorPaletteProvider
// ---------------------------------------------------------------------------
describe("ColorPaletteProvider", () => {
  it("starts with DEFAULT_PALETTE when no DOM attribute is present", async () => {
    await act(async () => {
      render(
        <ColorPaletteProvider>
          <PaletteConsumer />
        </ColorPaletteProvider>
      );
    });

    expect(screen.getByTestId("palette").textContent).toBe(DEFAULT_PALETTE);
  });

  it("does not re-render when DOM attribute is absent", async () => {
    renderCount = 0;

    await act(async () => {
      render(
        <ColorPaletteProvider>
          <PaletteConsumer />
        </ColorPaletteProvider>
      );
    });

    expect(renderCount).toBe(1);
  });

  it("reads palette from DOM attribute after mount", async () => {
    document.documentElement.dataset.colorPalette = "blue";

    await act(async () => {
      render(
        <ColorPaletteProvider>
          <PaletteConsumer />
        </ColorPaletteProvider>
      );
    });

    expect(screen.getByTestId("palette").textContent).toBe("blue");
  });

  it("ignores an invalid DOM attribute value", async () => {
    document.documentElement.dataset.colorPalette = "rainbow";

    await act(async () => {
      render(
        <ColorPaletteProvider>
          <PaletteConsumer />
        </ColorPaletteProvider>
      );
    });

    expect(screen.getByTestId("palette").textContent).toBe(DEFAULT_PALETTE);
  });
});
