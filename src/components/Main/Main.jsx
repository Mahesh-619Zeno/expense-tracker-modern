import React, { useContext, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@mui/material';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import CustomizedSnackbar from '../Snackbar/Snackbar';

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader title="Monefy" subheader="Track your income and expense" />
      <CardContent>
        <Typography align="center" variant="h5">Total Balance ₹{balance}</Typography>
        <InfoCard />
        <Divider className={classes.divider} />
        <Form setOpenSnackbar={setOpenSnackbar} />
      </CardContent>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
      <CustomizedSnackbar open={openSnackbar} setOpen={setOpenSnackbar} />
    </Card>
  );
};

export default Main;