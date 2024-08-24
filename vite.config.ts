import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import * as path from "path";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
// import requireTransform from "vite-plugin-require-transform";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
    },
  },
  plugins: [reactRefresh(), viteCommonjs()],
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    include: [path.resolve(__dirname, "tailwind.config.js")],
    // include: ["tailwind.config.mjs"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      exclude: [
        "node_modules/lodash-es/**",
        "node_modules/@types/lodash-es/**",
      ],
    },
  },
});
