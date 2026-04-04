import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TRANSACTIONS } from '../data/transactions.js';

const normalizeText = (value) => String(value ?? '').trim().toLowerCase();

const sortTransactions = (transactions, field, direction) => {
  const sortedTransactions = [...transactions].sort((first, second) => {
    const firstValue = first[field];
    const secondValue = second[field];

    if (field === 'amount') {
      return Number(firstValue) - Number(secondValue);
    }

    if (field === 'date') {
      return new Date(firstValue).getTime() - new Date(secondValue).getTime();
    }

    return String(firstValue).localeCompare(String(secondValue));
  });

  return direction === 'asc' ? sortedTransactions : sortedTransactions.reverse();
};

const applyFilters = (transactions, filters, sort) => {
  const searchTerm = normalizeText(filters.search);

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (!searchTerm) return true;

      const searchableValues = [
        transaction.description,
        transaction.merchant,
        transaction.category,
        transaction.type,
        transaction.amount,
        transaction.date,
      ]
        .map(normalizeText)
        .join(' ');

      return searchableValues.includes(searchTerm);
    })
    .filter((transaction) => filters.category === 'all' || transaction.category === filters.category)
    .filter((transaction) => filters.type === 'all' || transaction.type === filters.type)
    .filter((transaction) => {
      const { start, end } = filters.dateRange || {};
      const transactionDate = new Date(transaction.date).getTime();

      if (start && transactionDate < new Date(start).getTime()) return false;
      if (end && transactionDate > new Date(end).getTime()) return false;
      return true;
    });

  return sortTransactions(filteredTransactions, sort.field, sort.direction);
};

const createTransactionId = () => `tx_${Date.now()}`;

const useFinanceStore = create(
  persist(
    (set, get) => {
      const syncFilteredTransactions = () =>
        set({
          filteredTransactions: applyFilters(get().transactions, get().filters, get().sort),
        });

      const initialState = {
        transactions: TRANSACTIONS,
        filters: {
          search: '',
          category: 'all',
          type: 'all',
          dateRange: { start: null, end: null },
        },
        sort: {
          field: 'date',
          direction: 'desc',
        },
        role: 'viewer',
        darkMode: false,
        filteredTransactions: applyFilters(
          TRANSACTIONS,
          {
            search: '',
            category: 'all',
            type: 'all',
            dateRange: { start: null, end: null },
          },
          {
            field: 'date',
            direction: 'desc',
          }
        ),
        addTransaction: (transaction) => {
          set((state) => ({
            transactions: [
              {
                ...transaction,
                id: createTransactionId(),
              },
              ...state.transactions,
            ],
          }));
          syncFilteredTransactions();
        },
        updateTransaction: (id, updates) => {
          set((state) => ({
            transactions: state.transactions.map((transaction) =>
              transaction.id === id ? { ...transaction, ...updates } : transaction
            ),
          }));
          syncFilteredTransactions();
        },
        deleteTransaction: (id) => {
          set((state) => ({
            transactions: state.transactions.filter((transaction) => transaction.id !== id),
          }));
          syncFilteredTransactions();
        },
        setFilter: (key, value) => {
          set((state) => ({
            filters: {
              ...state.filters,
              [key]: value,
            },
          }));
          syncFilteredTransactions();
        },
        resetFilters: () => {
          set({
            filters: {
              search: '',
              category: 'all',
              type: 'all',
              dateRange: { start: null, end: null },
            },
          });
          syncFilteredTransactions();
        },
        setSort: (field) => {
          set((state) => ({
            sort: {
              field,
              direction:
                state.sort.field === field && state.sort.direction === 'desc' ? 'asc' : 'desc',
            },
          }));
          syncFilteredTransactions();
        },
        setRole: (role) => set({ role }),
        toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      };

      return initialState;
    },
    {
      name: 'zorvyn-finance-store',
      partialize: (state) => ({
        role: state.role,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useFinanceStore;
