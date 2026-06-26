/**
 * Context Reducer for handling transaction updates
 * @param {Array} state - The current state array containing all transactions
 * @param {any} action - The dispatched action object containing type and payload
 * @returns {Array} The newly updated state array
 */
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
      default:
        return state;
    }
  };
  
  export default contextReducer;