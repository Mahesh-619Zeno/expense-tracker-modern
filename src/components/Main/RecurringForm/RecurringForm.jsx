// src/components/Main/RecurringForm/RecurringForm.jsx
import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { incomeCategories, expenseCategories } from "../../../constants/categories";
import { saveRecurringRule } from "../../../services/recurringService";

const RecurringForm = ({ onClose }) => {
  const [ruleData, setRuleData] = useState({
    amount: "",
    category: "",
    type: "Expense",
    frequency: "Monthly",
  });

  const handleSubmit = () => {
    if (!ruleData.amount || !ruleData.category) return;

    saveRecurringRule({
      ...ruleData,
      id: crypto.randomUUID(),
      lastProcessed: null,
    });

    if (onClose) onClose();
  };

  const selectedCategories =
    ruleData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Type</InputLabel>
          <Select
            value={ruleData.type}
            onChange={(e) => setRuleData({ ...ruleData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Frequency</InputLabel>
          <Select
            value={ruleData.frequency}
            onChange={(e) => setRuleData({ ...ruleData, frequency: e.target.value })}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={ruleData.category}
            onChange={(e) => setRuleData({ ...ruleData, category: e.target.value })}
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
          size="small"
          value={ruleData.amount}
          onChange={(e) => setRuleData({ ...ruleData, amount: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleSubmit}
        >
          Add Recurring Rule
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecurringForm;