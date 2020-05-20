import Transaction from '../models/Transaction';
import { CreateTransactionDto } from '../dtos/CreateTransationDto';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income: number = this.transactions
      .map(transaction => {
        if (transaction.type === 'income') {
          return transaction.value;
        }
        return 0;
      })
      .reduce((accumulator, value) => accumulator + value, 0);

    const outcome: number = this.transactions
      .map(transaction => {
        if (transaction.type === 'outcome') {
          return transaction.value;
        }
        return 0;
      })
      .reduce((accumulator, value) => accumulator + value, 0);

    const balance: Balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
