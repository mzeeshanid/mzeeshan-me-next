// panda.config.ts
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ["@chakra-ui/panda-preset"],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system",
});
