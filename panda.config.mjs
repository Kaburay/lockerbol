// panda.config.mjs
import { defineConfig } from "@pandacss/dev";
import { lightTheme, darkTheme } from "./styled-system/tokens/colors";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  jsxFramework: "react",

  // The output directory for your css system
  outdir: "styled-system",

   theme: {
    extend: {},
    semanticTokens: {
      colors: {
        background: {
          value: {
            base: lightTheme.background,
            _dark: darkTheme.background,
          },
        },
        backgroundSecondary: {
          value: {
            base: lightTheme.backgroundSecondary,
            _dark: darkTheme.backgroundSecondary,
          },
        },
        textPrimary: {
          value: {
            base: lightTheme.textPrimary,
            _dark: darkTheme.textPrimary,
          },
        },
        textSecondary: {
          value: {
            base: lightTheme.textSecondary,
            _dark: darkTheme.textSecondary,
          },
        },
        textMuted: {
          value: {
            base: lightTheme.textMuted,
            _dark: darkTheme.textMuted,
          },
        },
        webicon: {
          value: {
            base: lightTheme.webicon,
            _dark: darkTheme.webicon,
          },
        },
        wiconbg: {
          value: {
            base: lightTheme.wiconbg,
            _dark: darkTheme.wiconbg,
          },
        },
        primary: {
          value: {
            base: lightTheme.primary,
            _dark: darkTheme.primary,
          },
        },
        onPrimary: {
          value: {
            base: lightTheme.onPrimary,
            _dark: darkTheme.onPrimary,
          },
        },
        surface: {
          value: {
            base: lightTheme.surface,
            _dark: darkTheme.surface,
          },
        },
        divider: {
          value: {
            base: lightTheme.divider,
            _dark: darkTheme.divider,
          },
        },
        gray: {
          value: {
            base: lightTheme.gray,
            _dark: darkTheme.gray,
          },
        },
      },
    },
  },
});
