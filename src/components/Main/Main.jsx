import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Button } from '@mui/material';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';

const Main = () => {
  const classes = useStyles();
  
  const { balance, dispatch } = useContext(ExpenseTrackerContext);

  const handleResetData = () => {
    dispatch({ type: 'CLEAR_ALL_TRANSACTIONS' });
  };

  return (
    <Card className={classes.root}>
      <CardHeader 
        title="Monefy" 
        subheader="Track your income and expense" 
        action={
          <Button size="small" color="secondary" onClick={handleResetData}>
            Reset Data
          </Button>
        }
      />
      <CardContent>
        <Typography align="center" variant="h5">Total Balance ₹{balance}</Typography>
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