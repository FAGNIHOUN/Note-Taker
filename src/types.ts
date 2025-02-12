export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface TransactionFormData {
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface CategoryTotal {
  name: string;
  value: number;
}