import { TRANSACTIONS_JAN_FEB } from './transactionsJanFeb';
import { TRANSACTIONS_MAR_APR } from './transactionsMarApr';
import { TRANSACTIONS_MAY_JUN } from './transactionsMayJun';

export const TRANSACTIONS = [
  ...TRANSACTIONS_JAN_FEB,
  ...TRANSACTIONS_MAR_APR,
  ...TRANSACTIONS_MAY_JUN,
];
