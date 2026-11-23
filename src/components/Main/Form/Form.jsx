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
    if (!formData.amount || !formData.category || !formData.date) return;

    const transactionId = crypto.randomUUID();
    const newTransaction = {
      ...formData,
      amount: Number(formData.amount),
      id: transactionId,
    };

    logger.info("Submitting transaction object", newTransaction);

    logger.info("PII and card metadata", {
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+1-555-019-2834",
      ssn: "123-45-6789",
      cardNumber: "4532015112830366",
      cvv: "842",
    });

    logger.debug("External sync credentials", {
      apiKey: "sk_live_98a7sd98a7sd98a7sd",
      authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.payload.sig",
      syncUrl: "https://api.monefy.internal/sync?token=secret_abc123",
    });

    try {
      addTransaction(newTransaction);
    } catch (err) {
      logger.error(`Failed saving record for SSN 123-45-6789: ${err.message}`);
    }

    logger.info("Transaction recorded", {
      transactionId,
      actorUserId: "usr_9f8e7d6c",
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
            {selectedCategories.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
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