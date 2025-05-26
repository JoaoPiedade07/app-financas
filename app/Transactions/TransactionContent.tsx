import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { handleApiError } from "@/utils/apiErrorHandler";
import { db } from "@/utils/Firebase/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot
} from "firebase/firestore";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "@/app/(auth)/AuthContext";

export interface Transaction {
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

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id' | 'iconColor' | 'iconName'>) => Promise<void>;
    deleteTransaction: (id: string | number) => Promise<void>;
    loading: boolean;
    error: string | null;
    refreshTransactions: () => Promise<void>;
    isOnline: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{children: ReactNode}> = ({
    children }) => {
        const [transactions, setTransactions] = useState<Transaction[]>([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [isOnline, setIsOnline] = useState(true);
        const { isAuthenticated } = useAuth();

        // Monitorar o estado da conexão
        useEffect(() => {
            const unsubscribe = NetInfo.addEventListener(state => {
                setIsOnline(state.isConnected ?? false);
            });

            return () => unsubscribe();
        }, []);

        // Função para buscar transações do Firestore
        const fetchTransactions = async () => {
            try {
                // Não buscar dados se o usuário não estiver autenticado
                if (!isAuthenticated) {
                    console.log("Usuário não autenticado, não buscando transações");
                    return () => {};
                }
                
                setLoading(true);
                setError(null);
                
                // Verificar conexão antes de tentar buscar dados
                const netInfo = await NetInfo.fetch();
                if (!netInfo.isConnected) {
                    setIsOnline(false);
                    setLoading(false);
                    
                    // Tentar carregar dados do cache local
                    try {
                        const cachedTransactions = await AsyncStorage.getItem('cachedTransactions');
                        if (cachedTransactions) {
                            setTransactions(JSON.parse(cachedTransactions));
                        }
                    } catch (cacheError) {
                        console.error("Erro ao carregar do cache:", cacheError);
                    }
                    
                    setError("Sem conexão com a internet");
                    return () => {};
                }
                
                // Obter o ID do usuário atual
                const userJson = await AsyncStorage.getItem('user');
                const userData = userJson ? JSON.parse(userJson) : null;
                const userId = userData?.id;
                
                if (!userId) {
                    setError('Usuário não autenticado');
                    setLoading(false);
                    return () => {};
                }
                
                // Criar uma referência à subcoleção de transações do usuário
                const transactionsRef = collection(db, 'users', userId, 'transactions');
                const q = query(transactionsRef, orderBy('createdAt', 'desc'));
                
                // Configurar um listener com timeout
                let timeoutId: NodeJS.Timeout;
                const timeoutPromise = new Promise<() => void>((_, reject) => {
                    timeoutId = setTimeout(() => {
                        reject(new Error("Tempo limite excedido ao buscar transações"));
                    }, 15000); // 15 segundos de timeout
                });
                
                // Configurar um listener para atualizações em tempo real
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    clearTimeout(timeoutId);
                    const transactionsData: Transaction[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        transactionsData.push({
                            id: doc.id,
                            name: data.name,
                            date: data.date,
                            value: data.value,
                            type: data.type,
                            category: data.category || 'Other',
                            iconColor: data.iconColor,
                            iconName: data.iconName,
                            isUpcomingBill: data.isUpcomingBill || false
                        });
                    });
                    setTransactions(transactionsData);
                    
                    // Armazenar no cache local para acesso offline
                    AsyncStorage.setItem('cachedTransactions', JSON.stringify(transactionsData))
                        .catch(err => console.error("Erro ao salvar no cache:", err));
                        
                    setLoading(false);
                }, (err) => {
                    clearTimeout(timeoutId);
                    console.error("Erro ao buscar transações:", err);
                    setError(handleApiError(err));
                    setLoading(false);
                });
                
                // Retornar a função de limpeza para desinscrever o listener
                return () => {
                    clearTimeout(timeoutId);
                    unsubscribe();
                };
            } catch (err) {
                setLoading(false);
                setError(handleApiError(err));
                return () => {};
            }
        };

        // Inicializar o listener apenas quando o usuário estiver autenticado
        useEffect(() => {
            if (isAuthenticated) {
                const unsubscribePromise = fetchTransactions();
                
                return () => {
                    // Usar Promise.resolve para garantir que temos uma Promise
                    Promise.resolve(unsubscribePromise).then(unsubscribe => {
                        if (typeof unsubscribe === 'function') {
                            unsubscribe();
                        }
                    });
                };
            }
        }, [isAuthenticated]);

        const addTransaction = async (transaction: Omit<Transaction, 'id' | 'iconColor' | 'iconName'>) => {
            try {
                setLoading(true);
                setError(null);
                
                // Obter o ID do usuário atual
                const userJson = await AsyncStorage.getItem('user');
                const userData = userJson ? JSON.parse(userJson) : null;
                const userId = userData?.id;
                
                if (!userId) {
                    setError('Usuário não autenticado');
                    setLoading(false);
                    return;
                }
                
                const newTransaction = {
                    ...transaction,
                    category: transaction.category || 'Other',
                    iconColor: transaction.type === 'Recepies' ? '#4CAF50' : '#F44336',
                    iconName: transaction.type === 'Recepies'? 'arrow-up-outline' : 'arrow-down-outline',
                    createdAt: new Date().toISOString()
                };
    
                // Adicionar ao Firestore como subcoleção do usuário
                if (isOnline) {
                    await addDoc(collection(db, 'users', userId, 'transactions'), newTransaction);
                } else {
                    // Armazenar localmente para sincronização posterior
                    const localTransaction = {
                        ...newTransaction,
                        id: Date.now().toString(),
                        pendingSync: true
                    };
                    
                    // Adicionar à lista local
                    setTransactions(prevTransactions => [...prevTransactions, localTransaction as Transaction]);
                    
                    // Armazenar na fila de sincronização
                    try {
                        const pendingTransactionsJson = await AsyncStorage.getItem('pendingTransactions');
                        const pendingTransactions = pendingTransactionsJson ? JSON.parse(pendingTransactionsJson) : [];
                        pendingTransactions.push({...localTransaction, userId});
                        await AsyncStorage.setItem('pendingTransactions', JSON.stringify(pendingTransactions));
                    } catch (error) {
                        console.error('Erro ao salvar transação pendente:', error);
                    }
                }
                
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
                
                // Obter o ID do usuário atual
                const userJson = await AsyncStorage.getItem('user');
                const userData = userJson ? JSON.parse(userJson) : null;
                const userId = userData?.id;
                
                if (!userId) {
                    setError('Usuário não autenticado');
                    setLoading(false);
                    return;
                }
                
                if (isOnline) {
                    // Excluir da subcoleção do usuário
                    await deleteDoc(doc(db, 'users', userId, 'transactions', id.toString()));
                } else {
                    // Marcar para exclusão quando online
                    try {
                        const pendingDeletionsJson = await AsyncStorage.getItem('pendingDeletions');
                        const pendingDeletions = pendingDeletionsJson ? JSON.parse(pendingDeletionsJson) : [];
                        pendingDeletions.push({id: id.toString(), userId});
                        await AsyncStorage.setItem('pendingDeletions', JSON.stringify(pendingDeletions));
                        
                        // Atualizar a UI imediatamente
                        setTransactions(prevTransactions =>
                            prevTransactions.filter(transaction => transaction.id !== id)
                        );
                    } catch (error) {
                        console.error('Erro ao salvar exclusão pendente:', error);
                    }
                }
                
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(handleApiError(err));
            }
        };

        // Função para sincronizar dados pendentes quando voltar online
        const syncPendingData = async () => {
            if (!isOnline) return;
            
            try {
                // Obter o ID do usuário atual
                const userJson = await AsyncStorage.getItem('user');
                const userData = userJson ? JSON.parse(userJson) : null;
                const userId = userData?.id;
                
                if (!userId) {
                    console.error('Usuário não autenticado, não é possível sincronizar');
                    return;
                }
                
                // Sincronizar transações pendentes
                const pendingTransactionsJson = await AsyncStorage.getItem('pendingTransactions');
                const pendingTransactions = pendingTransactionsJson ? JSON.parse(pendingTransactionsJson) : [];
                
                if (pendingTransactions.length > 0) {
                    for (const transaction of pendingTransactions) {
                        const { id, pendingSync, ...transactionData } = transaction;
                        await addDoc(collection(db, 'users', userId, 'transactions'), transactionData);
                    }
                    await AsyncStorage.setItem('pendingTransactions', '[]');
                }
                
                // Sincronizar exclusões pendentes
                const pendingDeletionsJson = await AsyncStorage.getItem('pendingDeletions');
                const pendingDeletions = pendingDeletionsJson ? JSON.parse(pendingDeletionsJson) : [];
                
                if (pendingDeletions.length > 0) {
                    for (const deletion of pendingDeletions) {
                        await deleteDoc(doc(db, 'users', deletion.userId, 'transactions', deletion.id));
                    }
                    await AsyncStorage.setItem('pendingDeletions', '[]');
                }
            } catch (err) {
                console.error("Erro ao sincronizar dados pendentes:", err);
            }
        };

        // Monitorar mudanças no estado da conexão para sincronizar
        useEffect(() => {
            if (isOnline) {
                syncPendingData();
            }
        }, [isOnline]);

        const refreshTransactions = async () => {
            // A atualização em tempo real já é tratada pelo listener do Firestore
            // Esta função é mantida para compatibilidade com a interface existente
            if (!isOnline) {
                setError("Você está offline. Os dados podem não estar atualizados.");
            }
            return Promise.resolve();
        };

        return (
            <TransactionContext.Provider value = {{ 
                transactions,
                addTransaction, 
                deleteTransaction,
                loading,
                error,
                refreshTransactions,
                isOnline
            }}>
                {children}
            </TransactionContext.Provider>
        );
};

// Hook para usar o contexto
export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    } 
    return context;
};

export default TransactionProvider;