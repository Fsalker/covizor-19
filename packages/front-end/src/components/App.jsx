import React from "react";
import Header from "./Header";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Charts from "./Charts";
import Footer from "./Footer";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  },
  typography: {
    fontFamily: ["Verdana"].join(",")
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Header />
          <br />
          <Charts />
          <br />
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
