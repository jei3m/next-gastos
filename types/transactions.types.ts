export interface Transaction {
  date: string,
  total: string,
  details: TransactionDetails[],
  userID: string
};

export interface TransactionDetails {
  uuid: string,
  note: string,
  time: string,
  type: string,
  amount: number,
  category: string
}

export interface CreateTransaction {
  amount: number,
  type: string,
  time: string,
  date: string,
  categoryID: string
};

export interface EditTransaction {
  note: string;
  amount: number;
  type: string;
  time: string;
  date: string;
  accountID: string;
  categoryID: string;
};