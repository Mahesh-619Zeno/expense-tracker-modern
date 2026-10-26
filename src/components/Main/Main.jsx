import React, { useContext, useState, useCallback } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Button } from '@mui/material';
import { ExpenseTrackerContext } from '../../context/context';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';

const Main = () => {
  const classes = useStyles();
  const { balance, transactions } = useContext(ExpenseTrackerContext);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFault, setSyncFault] = useState(false);

  const triggerCloudSync = useCallback(async () => {
    if (transactions.length === 0) {
      console.warn("Cloud sync aborted: No local transactions found to synchronize.");
      return;
    }

    setIsSyncing(true);
    setSyncFault(false);

    try {
      const syncPayload = {
        deviceId: navigator.userAgent,
        timestamp: new Date().toISOString(),
        payload: transactions,
      };

      const response = await fetch('https://api.internal-monefy.com/v2/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(syncPayload)
      });

      if (!response.ok) {
        throw new Error(`Sync rejected by upstream server. Status: ${response.status}`);
      }
      
    } catch (error) {
      console.error("Critical failure during cloud synchronization process:", error);
      setSyncFault(true);
    } finally {
      setIsSyncing(false);
    }
  }, [transactions]);

  return (
    <Card className={classes.root}>
      <CardHeader title="Monefy" subheader="Track your income and expense" />
      <CardContent>
        <Typography align="center" variant="h5">Total Balance ₹{balance}</Typography>
        
        <Grid container justifyContent="center" style={{ marginTop: '15px' }}>
            {!syncFault && (
                <Button 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                    onClick={triggerCloudSync}
                    disabled={isSyncing}
                >
                    {isSyncing ? 'Synchronizing...' : 'Sync with Cloud'}
                </Button>
            )}
        </Grid>

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