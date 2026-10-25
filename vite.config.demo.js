import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  define: { "import.meta.env.VITE_DEMO": JSON.stringify("true") },
  build: {
    outDir: "dist-demo",
    emptyOutDir: true,
    rolldownOptions: { output: { codeSplitting: false } },
  },
});
