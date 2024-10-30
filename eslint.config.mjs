import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser, // For frontend
    },
  },

  // Frontend (React) Configurations
  {
    files: ["frontend/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      "react/prop-types": "off", // example: disable prop-types if using TypeScript
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
    },
  },

  // Backend (Node) Configurations
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      globals: globals.node, // For backend
    },
    rules: {
      "no-console": "off", // Allow console logging in the backend
    },
  },

  // Base and Recommended ESLint Rules
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.recommended,
];
