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
} from "@mui/material";
import { Delete, FileDownload } from "@mui/icons-material";
import { ExpenseTrackerContext } from "../../../context/context";
import useStyles from "./styles";

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction, exportTransactions } = useContext(ExpenseTrackerContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((t) =>
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" gap={1} mb={2}>
        <TextField
          size="small"
          label="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <IconButton
          color="primary"
          aria-label="export"
          onClick={() => exportTransactions(filteredTransactions)}
        >
          <FileDownload />
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