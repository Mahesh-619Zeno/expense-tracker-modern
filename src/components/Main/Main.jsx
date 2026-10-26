import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Button, Box, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';
import { exportToCSV } from '../../utils/exportToCSV';

const Main = () => {
  const classes = useStyles();
  const { balance, transactions } = useContext(ExpenseTrackerContext);

  const handleExport = () => {
    exportToCSV(transactions);
  };

  return (
    <Card className={classes.root}>
      <CardHeader 
        title="Monefy" 
        subheader="Track your income and expense" 
        action={
          <Tooltip title={transactions.length === 0 ? "No transactions to export" : "Export transactions to CSV"}>
            <span>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
                disabled={transactions.length === 0}
                sx={{ marginTop: '8px', marginRight: '8px' }}
              >
                Export
              </Button>
            </span>
          </Tooltip>
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