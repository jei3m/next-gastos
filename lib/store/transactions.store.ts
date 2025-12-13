import {
  CreateTransaction,
  EditTransactionPayload,
} from "@/types/transactions.types";
import { revalidateTransactions } from "../actions/transactions.actions";

export const createTransaction = async(transaction: CreateTransaction) => {
  try {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(transaction)
    });
    const data = await res.json();
    if(!res.ok) throw Error(data.message);
    // Expire cache tags
    revalidateTransactions();
    return(data.data);
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    };
    throw Error('Failed to Create Transaction');
  }
};

export const fetchTransactions = async(
  selectedAccountID: string,
  page: number,
) => {
  try {
    const res = await fetch(`/api/transactions?accountID=${selectedAccountID}&page=${page}`, {
      method: 'GET',
      next:{
        tags: ['transactions'],
        revalidate: 3600 // 1hr
      }
    })
    const data = await res.json();
    return(data.data);
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message)
    };
    throw Error("Failed to Fetch Transactions")
  }
};

export const fetchTransactionByID = async(
  id: string,
) => {
  try {
    const res = await fetch(`/api/transactions/${id}`, {
      method: 'GET',
      next:{
        tags: [`transaction-${id}`],
        revalidate: 3600 // 1hr
      }
    });
    const data = await res.json();
    return(data.data);
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message)
    };
    throw Error("Failed to Fetch Transaction")
  }
};

export const fetchTransactionsCount = async(
  selectedAccountID: string
) => {
  try {
    const res = await fetch(`/api/transactions/count?accountID=${selectedAccountID}`, {
      method: 'GET',
      next:{
        tags: ['transaction-count'],
        revalidate: 3600 // 1hr
      }
    });
    const data = await res.json();
    return(data.data);
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message)
    };
    throw Error("Failed to Fetch Transactions")
  }
};

export const editTransactions = async(
  id: string,
  transaction: EditTransactionPayload
) => {
  try {
    const res = await fetch(`/api/transactions/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(transaction)
    });
    const data = await res.json();
    if (!res.ok) throw Error(data.message);
    // Expire cache tags
    revalidateTransactions(id);
    return(data.data);
  } catch (error) {
    if (error instanceof Error){
      throw Error(error.message);
    };
    throw Error('Failed to Update Transaction')
  }
};

export const deleteTransaction = async(id: string) => {
  try {
    const res = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });
    const data = await res.json();
    if (!res.ok) throw Error(data.message);
    // Expire cache tags
    revalidateTransactions(id);
    return(data.data);
  } catch (error) {
    if (error instanceof Error){
      throw Error(error.message);
    };
    throw Error('Failed to Update Transaction')
  }
};