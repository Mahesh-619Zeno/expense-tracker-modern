// src/components/Main/List/List.jsx
import React, { useContext, useState } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { Delete, FileDownload, Clear } from "@mui/icons-material";
import { ExpenseTrackerContext } from "../../../context/context";
import useStyles from "./styles";
import { downloadCSV } from "../../../utils/exportCsv";

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction, clearAllTransactions } = useContext(ExpenseTrackerContext);
  const [query, setQuery] = useState("");

  const filteredTransactions = transactions.filter((t) =>
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleExport = () => {
    downloadCSV(filteredTransactions);
  };

  return (
    <Box>
      <Box display="flex" gap={1} mb={2}>
        <TextField
          size="small"
          label="Search category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FileDownload />}
          onClick={handleExport}
        >
          Export
        </Button>
        <IconButton
          color="error"
          aria-label="clear all"
          onClick={() => clearAllTransactions()}
        >
          <Clear />
        </IconButton>
      </Box>

      <MUIList className={classes.listContainer}>
        {filteredTransactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <ListItemAvatar>
              <Avatar
                className={
                  transaction.type === "Income"
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
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
    </Box>
  );
};

export default List;