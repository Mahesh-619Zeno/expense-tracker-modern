const contextReducer = (state, action) => {
  let transactions;

  switch (action.type) {
    case 'DELETE_TRANSACTION':
      transactions = state.filter((transaction) => transaction.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      return transactions;

    case 'ADD_TRANSACTION':
      transactions = [action.payload, ...state];
      localStorage.setItem('transactions', JSON.stringify(transactions));
      return transactions;

    case 'CLEAR_ALL_TRANSACTIONS':
      localStorage.removeItem('transactions');
      return [];

    default:
      return state;
  }
};

export default contextReducer;