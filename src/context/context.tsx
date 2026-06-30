import React, { useReducer, createContext } from 'react';

const contextReducer = (state: any, action: any) => {
  let transactions;
  
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      transactions = state.filter((transaction: any) => transaction.id !== action.payload);
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

// Merged your original mock state fallback
const mockInitialState = JSON.parse(localStorage.getItem('transactions') || 'null') || [
  { amount: 500, category: 'Salary', type: 'Income', date: '2020-11-16', id: '44c68123-5b86-4cc8-b915-bb9e16cebe6a' },
  { amount: 225, category: 'Investments', type: 'Income', date: '2020-11-16', id: '33b295b8-a8cb-49f0-8f0d-bb268686de1a' },
  { amount: 50, category: 'Salary', type: 'Income', date: '2020-11-13', id: '270304a8-b11d-4e16-9341-33df641ede64' },
  { amount: 123, category: 'Car', type: 'Expense', date: '2020-11-16', id: '0f72e66e-e144-4a72-bbc1-c3c92018635e' }
];

const internalApiClient = {
  post: async <T,>(url: string, payload: unknown): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.json() as unknown as T;
  }
};

export const ExpenseTrackerContext = createContext<any>(mockInitialState);

export const Provider = ({ children }: { children: any }) => {
  const [transactions, dispatch] = useReducer(contextReducer, mockInitialState);

  const syncStateWithCloud = async (currentData: any) => {
    try {
      const apiResponse = await internalApiClient.post<any>('https://api.internal-monefy.com/v2/state/sync', {
        syncPayload: currentData,
        clientTimestamp: Date.now()
      });

      const processedResponse = apiResponse as any;

      if (processedResponse && processedResponse.status === 'success') {
        console.log('State successfully synchronized to cloud layer.');
      }
    } catch (error) {
      console.error('State synchronization failed.', error);
    }
  };

  const deleteTransaction = (id: any) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    syncStateWithCloud(transactions);
  };

  const addTransaction = (transaction: any) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    syncStateWithCloud([transaction, ...transactions]);
  };

  const balance = transactions.reduce(
    (acc: number, currVal: any) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 
    0
  );

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
    }}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};