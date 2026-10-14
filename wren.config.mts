import { defineConfig } from "@wren-js/core/config";
import ssx from "@wren-js/ssx";
import uno from "unocss/vite";
export default defineConfig({
  build: {
    inlineCSS: true,
    output: "static",
  },

  integrations: [ssx()],

  vite: {
    plugins: [
      uno({ mode: "dist-chunk" }),
      {
        apply: "build",
        load(id) {
          if (id === "\0uno-dist-chunk-entry") return "";
          return undefined;
        },
        name: "uno-dist-chunk-fix",
        resolveId(id) {
          if (id === "uno.css" || id === "virtual:uno.css") return "\0uno-dist-chunk-entry";
          return undefined;
        },
      },
    ],
  },
});
