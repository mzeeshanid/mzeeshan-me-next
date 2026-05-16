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

afterEach(cleanup);

// ---------------------------------------------------------------------------
// Render-count helper — increments on every render of the consumer component
// ---------------------------------------------------------------------------
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
// ColorPaletteProvider — single render guarantee
// ---------------------------------------------------------------------------
describe("ColorPaletteProvider", () => {
  it("renders the consumer exactly once — no re-render after mount", async () => {
    renderCount = 0;

    await act(async () => {
      render(
        <ColorPaletteProvider initialPalette="blue">
          <PaletteConsumer />
        </ColorPaletteProvider>
      );
    });

    // act() flushes all pending state updates and effects.
    // If any useEffect called setState, renderCount would be > 1.
    expect(renderCount).toBe(1);
    expect(screen.getByTestId("palette").textContent).toBe("blue");
  });

  it("initialises with DEFAULT_PALETTE when no initialPalette is provided", async () => {
    renderCount = 0;

    await act(async () => {
      render(
        <ColorPaletteProvider>
          <PaletteConsumer />
        </ColorPaletteProvider>
      );
    });

    expect(renderCount).toBe(1);
    expect(screen.getByTestId("palette").textContent).toBe(DEFAULT_PALETTE);
  });

  it("exposes the correct palette value to consumers", () => {
    render(
      <ColorPaletteProvider initialPalette="purple">
        <PaletteConsumer />
      </ColorPaletteProvider>
    );
    expect(screen.getByTestId("palette").textContent).toBe("purple");
  });
});
