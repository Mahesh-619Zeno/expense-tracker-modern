import React from "react";
import { Grid } from "@mui/material";
import { Details, Main } from './components';

const App = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      
      <Grid xs={12} sm={4}>
        <Details title="Income" />
      </Grid>

      <Grid xs={12} sm={3}>
        <Main />
      </Grid>

      <Grid xs={12} sm={4}>
        <Details title="Expense" />
      </Grid>

    </Grid>
  );
};

export default App;