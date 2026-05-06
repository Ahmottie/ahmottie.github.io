import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    nitro(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tailwindcss() as any,
  ],
});