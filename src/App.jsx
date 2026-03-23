import React from "react";
import { Grid } from "@mui/material";
import { Details, Main } from './components/index.jsx';

const App = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={4}>
        <Details title="Income" />
      </Grid>

      <Grid item xs={12} sm={3}>
        <Main />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Details title="Expense" />
      </Grid>
    </Grid>
  );
};

export default App;