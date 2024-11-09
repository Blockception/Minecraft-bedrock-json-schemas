import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      '**/coverage/*',
      '**/lib/*',
      '**/node_modules/*',
      'lib/*'
    ],
  },
  {
    files: ["**/*.ts"],

    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      jest: {},
    },
  },
  {
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-case-declarations": "off",
    },
  }
);