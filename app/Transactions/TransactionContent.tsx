import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Transaction { //Define the transaction type
    id: string | number;
    name: string;
    date: string;
    value: number;
    type: 'Recepies' | 'Expenses';
    iconColor?: string;
    iconName?: string;
}

interface TransactionContextType { //Define the context type
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id' | 'iconColor'
        | 'iconName'>) => void;
}

//Create the context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

//Create a provider component
export const TransactionProvider: React.FC<{children: ReactNode}> = ({
    children }) => {
        const [transactions, setTransactions] = useState<Transaction[]>([
            { id: '1', type: 'Recepies', name: 'App UI', date: '12 Set 2025',
                value: 10000, iconColor: '#4CAF50', iconName: 'arrow-up-outline' },
            { id: '2', type: 'Expenses', name: 'Shopping', date: '10 Set 2025',
                value: -120.99, iconColor: '#F44336', iconName: 'arrow-down-outline' },
            { id: '3', type: 'Recepies', name: 'Visual Design', date: '08 Set 2025',
                value: 300, iconColor: '#4CAF50', iconName: 'arrow-up-outline' },
            { id: '4', type: 'Expenses', name: 'Food Shopping', date: '23 Dec 2025',
                value: -30.45, iconColor: '#F44336', iconName: 'arrow-down-outline' },
        ]);

        const addTransaction = (transaction: Omit<Transaction, 'id' |
            'iconColor' | 'iconName'>) => {
                const newTransaction = {
                    ...transaction,
                    id: Date.now().toString(),
                    iconColor: transaction.type === 'Recepies' ? '#4CAF50' : '#F44336',
                    iconName: transaction.type === 'Recepies'? 'arrow-up-outline'
                    : 'arrow-down-outline',
                };

                setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
            };

            return (
                <TransactionContext.Provider value = {{ transactions,
                    addTransaction }}>
                        {children}
                </TransactionContext.Provider>
            );
    };

// Create a hook to use the context
export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    } return context;
};

export default TransactionProvider;