import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tailwindcss() as any,
  ],
});
