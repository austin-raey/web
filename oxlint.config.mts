import unocss from "@unocss/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    perf: "warn",
    suspicious: "warn",
  },
  jsPlugins: [
    "eslint-plugin-perfectionist",
    { name: "unocss", specifier: "@unocss/eslint-plugin" },
  ],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["eslint", "oxc", "promise", "typescript", "unicorn", "vitest"],
  rules: {
    ...perfectionist.configs["recommended-natural"].rules,
    ...unocss.configs.flat.rules,
  },
});
