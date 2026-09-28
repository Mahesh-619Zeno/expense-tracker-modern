import React, { useContext, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, FormControl, Select, MenuItem, Box } from '@mui/material';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import { formatCurrency } from '../../utils/formatCurrency';

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);
  const [currency, setCurrency] = useState("INR");

  return (
    <Card className={classes.root}>
      <CardHeader 
        title="Monefy" 
        subheader="Track your income and expense" 
        action={
          <Box sx={{ minWidth: 90, mt: 1, mr: 1 }}>
            <FormControl size="small" fullWidth>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="INR">INR (₹)</MenuItem>
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="EUR">EUR (€)</MenuItem>
                <MenuItem value="GBP">GBP (£)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
      />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance {formatCurrency(balance, currency)}
        </Typography>
        <InfoCard />
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;