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
import CurrencyText from "../../CurrencyText/CurrencyText";
import useStyles from "./styles";

const List = ({ customTransactions }) => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  const displayList = customTransactions || transactions;

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
            secondary={
              <React.Fragment>
                <CurrencyText amount={transaction.amount} /> - {transaction.date}
              </React.Fragment>
            }
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