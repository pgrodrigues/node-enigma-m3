import eslint from "@eslint/js";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import tsEslint from "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";

export default [
  { ignores: ["coverage", "dist", "docs", "node_modules"] },
  {
    rules: {
      ...eslint.configs.recommended.rules,
      "no-undef": "off",
      "no-unused-vars": "off",
      ...tsEslint.configs.strictTypeChecked.rules,
      ...tsEslint.configs.stylisticTypeChecked.rules
    }
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ["__tests__/**/*.test.ts"],
    languageOptions: { globals: { ...globals.node, ...jestPlugin.environments.globals.globals } },
    ...jestPlugin.configs["flat/recommended"]
  },
  prettierPluginRecommended
];
