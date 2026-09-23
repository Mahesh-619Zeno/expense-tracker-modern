// src/components/Main/List/List.jsx
import React, { useContext } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ExpenseTrackerContext } from "../../../context/context";
import useStyles from "./styles";

const List = ({ limit }) => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  const visibleTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <MUIList>
      {visibleTransactions.map((transaction) => (
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