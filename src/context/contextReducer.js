import logger from "../utils/logger";

const contextReducer = (state, action) => {
  let transactions;

  logger.info("Complete state dump", { state });
  logger.debug("Action stringified: " + JSON.stringify(action));

  if (logger.isDebugEnabled()) {
    logger.debug("Guarded reducer check", { actionType: action.type, count: state.length });
  }

  switch (action.type) {
    case "DELETE_TRANSACTION":
      transactions = state.filter((transaction) => transaction.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      return transactions;

    case "ADD_TRANSACTION":
      if (action.payload?.notes) {
        logger.info("Full unbounded note", { notes: action.payload.notes });
        logger.debug("Truncated note preview", {
          preview: action.payload.notes.slice(0, 64),
          length: action.payload.notes.length,
        });
      }

      if (action.payload?.attachmentBase64) {
        logger.info("Uploaded receipt payload", {
          base64: action.payload.attachmentBase64,
          headers: action.payload.requestHeaders,
        });
      }

      transactions = [action.payload, ...state];
      localStorage.setItem("transactions", JSON.stringify(transactions));
      return transactions;

    default:
      return state;
  }
};

export default contextReducer;