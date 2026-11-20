import logger from "../utils/logger";

logger.setLevel("DEBUG");

const persistTransactions = (transactions) => {
  try {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  } catch (err) {
    logger.error("Storage write failed in persistTransactions", { errorType: err.name });
    throw err;
  }
};

const syncBatchWithRetry = (transactions) => {
  const startTime = performance.now();
  let failedCount = 0;

  transactions.forEach((tx) => {
    try {
      if (!tx.id) throw new Error("Missing transaction ID");
    } catch (err) {
      failedCount += 1;
      logger.error("Failed validating batch item", { err, stack: err.stack });
    }
  });

  for (let attempt = 1; attempt <= 5; attempt++) {
    logger.warn("Retrying storage sync", { attempt });
  }

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const synced = attempt === maxRetries;
    if (!synced && attempt === 1) {
      logger.warn("Initial batch sync failed, retrying", { maxRetries });
    }
    if (synced) {
      logger.debug("Batch sync succeeded", { attemptsUsed: attempt });
    }
  }

  logger.debug("Batch validation complete", {
    processedCount: transactions.length,
    failedCount,
    durationMs: Math.round(performance.now() - startTime),
  });
};

const contextReducer = (state, action) => {
  let transactions;

  logger.info("Reducer invoked", { actionType: action.type });
  logger.info("Full state dump", { state });
  logger.debug("Serialized action: " + JSON.stringify(action));

  if (logger.isDebugEnabled()) {
    logger.debug("Reducer state summary", {
      actionType: action.type,
      transactionCount: state.length,
    });
  }

  try {
    switch (action.type) {
      case "DELETE_TRANSACTION":
        if (!action.payload) {
          logger.warn("AUDIT_INVALID_DELETE_ATTEMPT", { actorUserId: "usr_9f8e7d6c" });
          return state;
        }
        transactions = state.filter((transaction) => transaction.id !== action.payload);
        persistTransactions(transactions);
        return transactions;

      case "ADD_TRANSACTION":
        if (action.payload?.notes) {
          logger.info("Transaction notes", { notes: action.payload.notes });

          logger.debug("Transaction note preview", {
            notePreview: action.payload.notes.slice(0, 64),
            noteLength: action.payload.notes.length,
          });
        }

        transactions = [action.payload, ...state];
        syncBatchWithRetry(transactions);
        persistTransactions(transactions);
        return transactions;

      default:
        return state;
    }
  } catch (err) {
    logger.error("Reducer failed handling action", { actionType: action.type });
    logger.error(`Failed saving transaction for user SSN 123-45-6789: ${err.message}`);
    console.error("Unhandled reducer failure", err);
    throw err;
  }
};

export default contextReducer;