// src/components/Main/List/List.jsx
import React, { useContext } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { Delete, RestartAlt } from "@mui/icons-material";
import { ExpenseTrackerContext } from "../../../context/context";
import useStyles from "./styles";

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction, resetAllTransactions } = useContext(ExpenseTrackerContext);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Button
          size="small"
          color="secondary"
          startIcon={<RestartAlt />}
          onClick={() => resetAllTransactions()}
        >
          Reset All
        </Button>
      </Box>

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