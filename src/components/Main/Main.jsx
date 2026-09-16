import React, { useContext, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Button } from '@mui/material';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import ExportDrawer from './ExportDrawer/ExportDrawer';
import { useAnalyticsSync } from '../../hooks/useAnalyticsSync';

const Main = () => {
  const classes = useStyles();
  const { balance, transactions } = useContext(ExpenseTrackerContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useAnalyticsSync(transactions);

  return (
    <Card className={classes.root}>
      <CardHeader title="Monefy" subheader="Track your income and expense" />
      <CardContent>
        <Typography align="center" variant="h5">Total Balance ₹{balance}</Typography>
        <InfoCard />
        <Button 
          variant="text" 
          color="secondary" 
          onClick={() => setIsDrawerOpen(true)} 
          sx={{ mt: 1, display: 'block', mx: 'auto' }}
        >
          Export History
        </Button>
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
      <ExportDrawer 
        open={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        transactions={transactions} 
      />
    </Card>
  );
};

export default Main;