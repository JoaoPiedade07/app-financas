import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Transaction { //Define the transaction type
    id: string | number;
    name: string;
    date: string;
    value: number;
    type: 'Recepies' | 'Expenses';
    category?: string; 
    iconColor?: string;
    iconName?: string;
    isUpcomingBill?: boolean; 
}

interface TransactionContextType { //Define the context type
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id' | 'iconColor'
        | 'iconName'>) => void;
    deleteTransaction: (id: string | number) => void;
}

//Create the context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

//Create a provider component
export const TransactionProvider: React.FC<{children: ReactNode}> = ({
    children }) => {
        const [transactions, setTransactions] = useState<Transaction[]>([]);

        const addTransaction = (transaction: Omit<Transaction, 'id' |
            'iconColor' | 'iconName'>) => {
                const newTransaction = {
                    ...transaction,
                    id: Date.now().toString(),
                    category: transaction.category || 'Other', //Garante sempre que tenha uma categoria
                    iconColor: transaction.type === 'Recepies' ? '#4CAF50' : '#F44336',
                    iconName: transaction.type === 'Recepies'? 'arrow-up-outline'
                    : 'arrow-down-outline',
                };

                // Add the new transaction to the state
                setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
            };

            const deleteTransaction = (id: string | number) => {
                setTransactions(prevTransactions =>
                    prevTransactions.filter(transaction => 
                        transaction.id !== id)
                    );
            };

            return (
                <TransactionContext.Provider value = {{ 
                    transactions,
                    addTransaction, 
                    deleteTransaction }}>
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