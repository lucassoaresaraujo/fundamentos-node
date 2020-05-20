import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { CreateTransactionDto } from '../dtos/CreateTransationDto';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(createTransaction: CreateTransactionDto): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    const transactionValueGreaterTotal = createTransaction.value > total;

    if (createTransaction.type === 'outcome' && transactionValueGreaterTotal) {
      throw new Error('Transaction amount greater than the total');
    }

    return this.transactionsRepository.create(createTransaction);
  }
}

export default CreateTransactionService;
