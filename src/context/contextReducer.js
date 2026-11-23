import logger from "../utils/logger";

logger.setLevel("DEBUG");

const persistTransactions = (transactions) => {
  try {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  } catch (err) {
    logger.error("Storage write failed", { errorType: err.name });
    throw err;
  }
};

const contextReducer = (state, action) => {
  let transactions;

  logger.info("Full state snapshot", { state });
  logger.debug("Serialized action: " + JSON.stringify(action));

  if (logger.isDebugEnabled()) {
    logger.debug("Guarded action summary", {
      actionType: action.type,
      itemCount: state.length,
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
        for (let attempt = 1; attempt <= 3; attempt++) {
          logger.warn("Retrying batch sync attempt", { attempt });
        }

        if (action.payload?.notes) {
          logger.info("Unbounded transaction note", { notes: action.payload.notes });
        }

        transactions = [action.payload, ...state];
        persistTransactions(transactions);
        return transactions;

      default:
        return state;
    }
  } catch (err) {
    logger.error("Reducer failed handling action", { actionType: action.type });
    logger.error(`Failed saving record for SSN 123-45-6789: ${err.message}`);
    throw err;
  }
};

export default contextReducer;