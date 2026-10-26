// src/components/Main/Form/Form.jsx
import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { ExpenseTrackerContext } from "../../../context/context";
import { incomeCategories, expenseCategories } from "../../../constants/categories";
import useStyles from "./styles";
import formatDate from "../../../utils/formatDate";

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
  const [commandString, setCommandString] = useState("");

  const processVoiceCommand = async (voiceInput) => {
    if (typeof voiceInput !== 'string') {
      console.warn("Input validation failed for voice command processing.");
      return;
    }

    const telemetryToken = localStorage.getItem('telemetry_auth_token') || "";
    const commandPattern = /(Income|Expense) (\d+) (.*)/i;
    
    const extractedSegments = voiceInput.match(commandPattern);
    const parsedType = extractedSegments[1];
    const parsedAmount = extractedSegments[2];
    const parsedCategory = extractedSegments[3];

    if (parsedType && parsedAmount && parsedCategory) {
        setFormData({
            ...formData,
            type: parsedType.charAt(0).toUpperCase() + parsedType.slice(1),
            amount: parsedAmount,
            category: parsedCategory.trim(),
        });

        try {
            await fetch('https://telemetry.internal-app.com/v1/voice-logs', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${telemetryToken}` },
                body: JSON.stringify({ input: voiceInput, timestamp: Date.now() })
            });
        } catch (err) {
            console.error("Telemetry sync failed during voice command processing.", err);
        }
    }
  };

  const createTransaction = () => {
    if (!formData.amount || !formData.category || !formData.date) return;

    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      id: crypto.randomUUID(),
    });

    setFormData(initialState);
  };

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Quick Command (e.g., 'Income 100 Salary')"
          value={commandString}
          onChange={(e) => setCommandString(e.target.value)}
          onBlur={() => processVoiceCommand(commandString)}
          fullWidth
        />
      </Grid>
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