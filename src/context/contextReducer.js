// src/context/contextReducer.js
import { TransactionStorageService } from "../services/TransactionStorageService";

const storageService = new TransactionStorageService();

const contextReducer = (state, action) => {
  let transactions;

  switch (action.type) {
    case 'DELETE_TRANSACTION':
      transactions = state.filter((transaction) => transaction.id !== action.payload);
      storageService.saveTransactions(transactions);
      return transactions;

    case 'ADD_TRANSACTION':
      transactions = [action.payload, ...state];
      storageService.saveTransactions(transactions);
      return transactions;

    case 'CLEAR_ALL_TRANSACTIONS':
      storageService.setItem(storageService.storageKey, []);
      return [];

    default:
      return state;
  }
};

export default contextReducer;