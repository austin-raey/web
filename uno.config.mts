import { defineConfig, presetIcons, presetWind4, transformerCompileClass } from "unocss";

export default defineConfig({
  outputToCssLayers: false,
  presets: [
    presetIcons({
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "top",
      },
    }),
    presetWind4({
      preflights: {
        reset: false,
      },
      variablePrefix: "",
    }),
  ],
  theme: {
    breakpoint: {
      dsk: "768px",
    },
    colors: {
      black: "oklch(0% 0 0)",
      white: "oklch(100% 0 0)",
    },
  },
  transformers: [
    transformerCompileClass({
      classPrefix: "",
    }),
  ],
});
