import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  plugins: [
    {
      name: "stub-static-assets",
      transform(_code, id) {
        if (/\.(png|jpe?g|gif|svg|webp|ico|avif)(\?.*)?$/.test(id)) {
          return { code: "export default ''" };
        }
        return null;
      },
    },
  ],
  resolve: {
    alias: [
      { find: /^styled-system\/(.*)/, replacement: path.resolve(__dirname, "styled-system/$1") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "public", replacement: path.resolve(__dirname, "public") },
    ],
  },
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
