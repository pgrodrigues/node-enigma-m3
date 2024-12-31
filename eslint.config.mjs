import eslint from "@eslint/js";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import tsEslint from "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["coverage", "dist", "docs", "node_modules"]
  },
  {
    rules: {
      ...eslint.configs.recommended.rules,
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
    languageOptions: {
      globals: { ...globals.node, ...jestPlugin.environments.globals.globals }
    },
    plugins: { jest: jestPlugin },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    }
  },
  prettierPluginRecommended
];
