// src/components/Main/List/List.jsx
import React, { useContext } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ExpenseTrackerContext } from "../../../context/context";
import useStyles from "./styles";

const List = ({ filteredTransactions }) => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  // Use passed filtered list if provided; otherwise fallback to global state
  const displayList = filteredTransactions || transactions;

  if (!displayList.length) {
    return (
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
        No transactions found.
      </Typography>
    );
  }

  return (
    <MUIList>
      {displayList.map((transaction) => (
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
  );
};

export default List;