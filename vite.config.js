import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
