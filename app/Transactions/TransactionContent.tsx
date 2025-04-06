import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { handleApiError } from "../utils/apiErrorHandler";

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
    addTransaction: (transaction: Omit<Transaction, 'id' | 'iconColor' | 'iconName'>) => void;
    deleteTransaction: (id: string | number) => void;
    loading: boolean;
    error: string | null;
    refreshTransactions: () => Promise<void>;
}

//Create the context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

//Create a provider component
export const TransactionProvider: React.FC<{children: ReactNode}> = ({
    children }) => {
        const [transactions, setTransactions] = useState<Transaction[]>([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        // Function to fetch transactions (simulated)
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Simulate API call
                // In a real app, this would be a fetch or axios call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // For now, we're using the existing data
                // If you had an API, you would fetch and set data here
                
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(handleApiError(err));
            }
        };

        // Initial fetch
        useEffect(() => {
            fetchTransactions();
        }, []);

        const addTransaction = async (transaction: Omit<Transaction, 'id' | 'iconColor' | 'iconName'>) => {
            try {
                setLoading(true);
                setError(null);
                
                const newTransaction = {
                    ...transaction,
                    id: Date.now().toString(),
                    category: transaction.category || 'Other', //Garante sempre que tenha uma categoria
                    iconColor: transaction.type === 'Recepies' ? '#4CAF50' : '#F44336',
                    iconName: transaction.type === 'Recepies'? 'arrow-up-outline' : 'arrow-down-outline',
                };

                // Simulate API call for adding transaction
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Add the new transaction to the state
                setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(handleApiError(err));
            }
        };

        const deleteTransaction = async (id: string | number) => {
            try {
                setLoading(true);
                setError(null);
                
                // Simulate API call for deleting transaction
                await new Promise(resolve => setTimeout(resolve, 500));
                
                setTransactions(prevTransactions =>
                    prevTransactions.filter(transaction => transaction.id !== id)
                );
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(handleApiError(err));
            }
        };

        const refreshTransactions = async () => {
            await fetchTransactions();
        };

        return (
            <TransactionContext.Provider value = {{ 
                transactions,
                addTransaction, 
                deleteTransaction,
                loading,
                error,
                refreshTransactions
            }}>
                {children}
            </TransactionContext.Provider>
        );
};

// Create a hook to use the context
export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    } 
    return context;
};

export default TransactionProvider;