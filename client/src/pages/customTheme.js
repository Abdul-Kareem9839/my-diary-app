// customTheme.js

export function getDesignTokens(mode) {
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#1976d2" },
            background: { default: "#f5f5f5" },
          }
        : {
            primary: { main: "#90caf9" },
            background: { default: "#121212" },
          }),
    },
  };
}

export const inputsCustomizations = {
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
    },
  },
};
