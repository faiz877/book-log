import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A237E", // Deep blue
    },
    secondary: {
      main: "#00796B", // Teal
    },
    background: {
      default: "#F5F5F5", // Light gray
    },
  },
  // You can add more theme customizations here
});

export default theme;
