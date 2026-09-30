// src/components/Main/Main.jsx
import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
  TextField,
  Box,
  LinearProgress,
} from "@mui/material";
import { ExpenseTrackerContext } from "../../context/context";
import useStyles from "./styles";
import Form from "./Form/Form";
import List from "./List/List";
import InfoCard from "../InfoCard";
import { filterAndSumTransactions, formatFilteredBalance } from "../../utils/filterTransactions";

const SPENDING_LIMIT = 5000;

const Main = () => {
  const classes = useStyles();
  const { balance, transactions } = useContext(ExpenseTrackerContext);
  const [searchTerm, setSearchTerm] = useState("");

  const { filtered, total: filteredTotal } = filterAndSumTransactions(
    transactions,
    searchTerm
  );

  // Calculate total monthly expense progress against spending limit
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const budgetProgress = Math.min((totalExpenses / SPENDING_LIMIT) * 100, 100);

  return (
    <Card className={classes.root}>
      <CardHeader title="Monefy" subheader="Track your income and expense" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance ₹{balance}
        </Typography>

        {/* Budget Limit Progress Bar */}
        <Box sx={{ width: "100%", mt: 2, mb: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Monthly Expense Limit (₹{totalExpenses} / ₹{SPENDING_LIMIT})
          </Typography>
          <LinearProgress
            variant="determinate"
            value={budgetProgress}
            color={budgetProgress >= 90 ? "error" : "primary"}
            sx={{ height: 8, borderRadius: 4, mt: 0.5 }}
          />
        </Box>

        <InfoCard />
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: "block" }}>
                  Filtered Total: {formatFilteredBalance(filteredTotal)}
                </Typography>
              )}
            </Box>
            <List filteredTransactions={filtered} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;