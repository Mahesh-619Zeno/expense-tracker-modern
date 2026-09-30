// src/components/Main/Main.jsx
import React, { useContext, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Button, Collapse, Box } from '@mui/material';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import RecurringForm from './RecurringForm/RecurringForm';
import { useRecurring } from '../../hooks/useRecurring';

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);
  const [showRecurring, setShowRecurring] = useState(false);

  useRecurring();

  return (
    <Card className={classes.root}>
      <CardHeader title="Monefy" subheader="Track your income and expense" />
      <CardContent>
        <Typography align="center" variant="h5">Total Balance ₹{balance}</Typography>
        <InfoCard />
        <Divider className={classes.divider} />
        
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Button 
            size="small" 
            color="secondary" 
            onClick={() => setShowRecurring((prev) => !prev)}
          >
            {showRecurring ? "Hide Recurring Settings" : "+ Schedule Recurring Transaction"}
          </Button>
          <Collapse in={showRecurring}>
            <RecurringForm onClose={() => setShowRecurring(false)} />
          </Collapse>
        </Box>

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