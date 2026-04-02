import { ColorPaletteProvider } from "@/contexts/useColorPalette";
import { Provider } from "../../styles/provider";
import { render, type RenderOptions } from "@testing-library/react";
import React from "react";

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider>
      <ColorPaletteProvider>{children as React.ReactElement}</ColorPaletteProvider>
    </Provider>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });
