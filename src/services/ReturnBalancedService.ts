import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Balanced {
  transactions: Transaction[];
  balance: Balance;
}

class ReturnBalancedService {
  private transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  public execute(transactions: Transaction[]): Balanced {
    console.log('entered ReturnBalancedService');
    const balance = { income: 0, outcome: 0, total: 0 };
    this.transactions = transactions;

    transactions.map(transaction =>
      transaction.type === 'income'
        ? (balance.income += transaction.value)
        : (balance.outcome += transaction.value),
    );

    balance.total = balance.income - balance.outcome;

    const balanced: Balanced = { transactions, balance };
    return balanced;
  }
}

export default ReturnBalancedService;
