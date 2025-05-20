import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Definindo o tipo para o usuário
type User = {
  id: string;
  email: string;
  name: string;
} | null;

// Definindo o tipo para o contexto de autenticação
interface AuthContextProps {
  user: User;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  error: string | null;
}

// Criando o contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider do contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar se o usuário já está autenticado ao iniciar o app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          router.replace('/tabs' as any);
        }
      } catch (e) {
        console.error('Erro ao carregar usuário:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Função de login
  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Simulação de autenticação - em um app real, você faria uma chamada API aqui
      // Esta é apenas uma demonstração, não use em produção!
      if (email && password) {
        // Simular um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Usuário de exemplo
        const mockUser = {
          id: '1',
          email,
          name: 'Usuário Teste',
        };
        
        // Salvar usuário no AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        // Navegar para a tela principal
        router.replace('/tabs/home' as any);
        return true;
      } else {
        setError('Email ou senha inválidos');
        return false;
      }
    } catch (e) {
      setError('Erro ao fazer login. Tente novamente.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de cadastro
  const signUp = async (name: string, email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Simulação de cadastro - em um app real, você faria uma chamada API aqui
      if (name && email && password) {
        // Simular um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Criar novo usuário
        const newUser = {
          id: Date.now().toString(),
          email,
          name,
        };
        
        // Salvar usuário no AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        
        // Navegar para a tela principal
        router.replace('/tabs/home' as any);
        return true;
      } else {
        setError('Preencha todos os campos');
        return false;
      }
    } catch (e) {
      setError('Erro ao criar conta. Tente novamente.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      router.replace('/login' as any);
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;