import React, { createContext, useState, useMemo } from 'react';

interface Transaction {
    id: number;
    name: string;
    date: string;
    value: number;
    type: 'Recepies' | 'Expense';
}

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    totalRecepies: number;
    totalExpenses: number;
}

// Cria o contexto
export const TransactionContext = createContext<TransactionContextType>({
    transactions: [],
    addTransaction: () => {},
    totalRecepies: 0,
    totalExpenses: 0,
});

// Provedor do contexto
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = (transaction: Transaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    };

    // Calcula os totais de receitas e despesas
    const { totalRecepies, totalExpenses } = useMemo(() => {
        let totalRecepies = 0;
        let totalExpenses = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === 'Recepies') {
                totalRecepies += transaction.value;
            } else {
                totalExpenses += Math.abs(transaction.value);
            }
        });

        return { totalRecepies, totalExpenses };
    }, [transactions]);

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, totalRecepies, totalExpenses }}>
            {children}
        </TransactionContext.Provider>
    );
};