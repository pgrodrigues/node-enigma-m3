// @ts-check

import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import tsEslint from "typescript-eslint";

/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 * @type {import("eslint").Linter.Config[]}
 */
const config = defineConfig([
  globalIgnores(["coverage/**", "dist/**", "docs/**"]),
  eslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    extends: [tsEslint.configs.strictTypeChecked, tsEslint.configs.stylisticTypeChecked],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parser: tsEslint.parser,
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
    extends: [jestPlugin.configs["flat/recommended"]],
    languageOptions: { globals: { ...globals.node, ...jestPlugin.environments.globals.globals } }
  },
  prettierPluginRecommended
]);

export default config;
