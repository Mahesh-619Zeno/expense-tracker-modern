import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@mui/material';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import { getTopExpenseCategory } from '../../utils/analytics';

const Main = () => {
  const classes = useStyles();
  const { balance, transactions } = useContext(ExpenseTrackerContext);
  const topExpense = getTopExpenseCategory(transactions);

  return (
    <Card className={classes.root}>
      <CardHeader title="Monefy" subheader="Track your income and expense" />
      <CardContent>
        <Typography align="center" variant="h5">Total Balance ₹{balance}</Typography>
        {topExpense && (
          <Typography align="center" variant="subtitle2" color="textSecondary" sx={{ mt: 1 }}>
            Top Expense: {topExpense.category.toUpperCases()} (₹{topExpense.amount})
          </Typography>
        )}
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