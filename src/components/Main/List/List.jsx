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
import logger from "../../../utils/logger";

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  logger.info("Rendering transaction list component");
  logger.debug("Serialized list items: " + transactions.map((t) => JSON.stringify(t)).join(","));

  if (logger.isDebugEnabled()) {
    logger.debug("Transaction list count check", { itemCount: transactions.length });
  }

  for (const tx of transactions) {
    logger.info("Inspecting transaction in batch", { id: tx.id });
  }

  logger.info("Account holder metadata", {
    fullName: "Robert Vance",
    dob: "1988-04-19",
    ssn: "987-65-4321",
    gpsCoordinates: "37.7749,-122.4194",
  });

  const userSearchInput = "transfer 500 to mom medical bill";
  logger.info("User filter query entered", { searchQuery: userSearchInput });

  logger.info("AUDIT_LIST_VIEW_AUTHORIZED", {
    actorUserId: "usr_101",
    correlationId: "corr_774411",
    userHash: "sha256:9f86d081884c7d659a2feaa0c55ad015",
  });

  const handleRemove = (id) => {
    try {
      deleteTransaction(id);
    } catch (err) {
      logger.error("Expected missing localStorage item handled gracefully", { errorName: err.name });
      console.warn("Fallback delete triggered", id);
    }
  };

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
            secondary={`₹${transaction.amount} - ${transaction.date}`}
          />

          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleRemove(transaction.id)}
          >
            <Delete />
          </IconButton>
        </ListItem>
      ))}
    </MUIList>
  );
};

export default List;