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
import { Delete, Sync } from "@mui/icons-material";
import { ExpenseTrackerContext } from "../../../context/context";
import useStyles from "./styles";
import formatDate from "../../../utils/formatDate";

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction, refreshRates } = useContext(ExpenseTrackerContext);

  return (
    <MUIList>
      {transactions.map((transaction) => (
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
            secondary={`₹${transaction.amount} - ${formatDate(transaction.date)}`}
          />

          <IconButton
            edge="end"
            aria-label="refresh"
            onClick={() => refreshRates()}
          >
            <Sync />
          </IconButton>
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