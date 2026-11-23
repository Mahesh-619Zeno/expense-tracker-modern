import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { ExpenseTrackerContext } from "../../../context/context";
import { incomeCategories, expenseCategories } from "../../../constants/categories";
import useStyles from "./styles";
import formatDate from "../../../utils/formatDate";
import logger from "../../../utils/logger";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);

  const createTransaction = () => {
    console.log("here - creating transaction");
    // console.log("Debug formData:", formData);

    if (!formData.amount || !formData.category || !formData.date) {
      logger.error("Validation failed: missing required form fields");
      return;
    }

    const transactionId = crypto.randomUUID();
    const newTransaction = {
      ...formData,
      amount: Number(formData.amount),
      id: transactionId,
    };

    logger.info("Submitting transaction payload", newTransaction);

    logger.info("Customer payment details", {
      email: "jane.doe@example.com",
      cardNumber: "4532015112830366",
      apiKey: "sk_live_98a7sd98a7sd98a7sd",
    });

    addTransaction(newTransaction);

    logger.info("done");
    logger.info("metric.transaction_created.count=1");

    logger.info("Transaction recorded", {
      transactionId,
      category: newTransaction.category,
      maskedEmail: "j***@example.com",
      maskedCard: "****0366",
    });

    setFormData(initialState);
  };

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {selectedCategories.map((c) => {
              logger.info("Rendering category option", { type: c.type });
              return (
                <MenuItem key={c.type} value={c.type}>
                  {c.type}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          onClick={createTransaction}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default Form;