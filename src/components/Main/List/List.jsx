import React, { useState, useContext } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { ExpenseTrackerContext } from "../../../context/context";
import { incomeCategories, expenseCategories } from "../../../constants/categories";

const List = () => {
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const handleTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterCategory("All");
  };

  const availableCategories =
    filterType === "Income"
      ? incomeCategories
      : filterType === "Expense"
      ? expenseCategories
      : [...incomeCategories, ...expenseCategories];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType === "All" || transaction.type === filterType;
    const matchesCategory =
      filterCategory === "All" || transaction.category === filterCategory;
    return matchesType && matchesCategory;
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Filter Type</InputLabel>
            <Select
              value={filterType}
              label="Filter Type"
              onChange={handleTypeChange}
            >
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Filter Category</InputLabel>
            <Select
              value={filterCategory}
              label="Filter Category"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {availableCategories.map((c) => (
                <MenuItem key={c.type} value={c.type}>
                  {c.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {filteredTransactions.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
          No transactions found for the selected filter.
        </Typography>
      ) : (
        <MUIList>
          {filteredTransactions.map((transaction) => (
            <ListItem key={transaction.id}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: transaction.type === "Income" ? green[500] : red[500],
                    color: "#fff",
                  }}
                >
                  {transaction.type === "Income" ? "+" : "-"}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={transaction.category}
                secondary={`₹${transaction.amount} - ${transaction.date}`}
              />

              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTransaction(transaction.id)}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </MUIList>
      )}
    </Box>
  );
};

export default List;