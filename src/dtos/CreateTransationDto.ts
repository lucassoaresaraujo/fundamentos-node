export interface CreateTransactionDto {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
