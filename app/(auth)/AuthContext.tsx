import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { auth, db, uploadProfileImage } from '@/utils/Firebase/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';


// Definindo o tipo para o usuário
type User = {
  id: string;
  email: string;
  name: string;
  photoURL: string | null;
} | null;

// Definindo o tipo para o contexto de autenticação
interface AuthContextProps {
  user: User;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  error: string | null;
  getCurrentUser: () => Promise<any>;
  isAuthenticated: boolean;
}

// Criando o contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider do contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se o usuário já está autenticado ao iniciar o app
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Buscar dados adicionais do usuário no Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userInfo = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: userData.name || 'Usuário',
              photoURL: userData.photoURL || null,
            };
            setUser(userInfo);
            setIsAuthenticated(true);

            // Salvar dados do usuário no AsyncStorage para uso offline
            await AsyncStorage.setItem('user', JSON.stringify(userInfo));
          } else {
            // Se não existir documento do usuário, usar apenas os dados básicos
            const userInfo = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'Usuário',
              photoURL: null,
            };
            setUser(userInfo);
            setIsAuthenticated(true);
            
            // Salvar dados do usuário no AsyncStorage para uso offline
            await AsyncStorage.setItem('user', JSON.stringify(userInfo));
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          await AsyncStorage.removeItem('user');
        }
      } catch (e) {
        console.error('Erro ao carregar usuário:', e);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    });

    // Limpar o listener quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  // Função para obter o usuário atual do Firebase
  const getCurrentUser = async () => {
    try {
      // Primeiro tenta obter do estado
      if (user) return user;
      
      // Se não estiver no estado, tenta obter do AsyncStorage
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser;
      }
      
      // Por último, tenta obter do Firebase
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (firebaseUser) => {
            unsubscribe();
            resolve(firebaseUser);
          },
          reject
        );
      });
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    }
  };

  // Função de login
  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Autenticar com Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Buscar dados adicionais do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userInfo = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          name: userData.name || 'Usuário',
          photoURL: userData.photoURL || null,
        };
        setUser(userInfo);
        setIsAuthenticated(true);
        
        // Salvar dados do usuário no AsyncStorage para uso offline
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      } else {
        // Se não existir documento do usuário, usar apenas os dados básicos
        const userInfo = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          name: firebaseUser.displayName || 'Usuário',
          photoURL: null,
        };
        setUser(userInfo);
        setIsAuthenticated(true);
        
        // Salvar dados do usuário no AsyncStorage para uso offline
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      }
      
      // Navegar para a tela principal com um pequeno atraso para garantir que os estados sejam atualizados
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 500);
      
      return true;
    } catch (e) {
      console.error('Erro ao fazer login:', e);
      setError('Email ou senha inválidos');
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
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Criar documento do usuário no Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name,
        email,
        createdAt: new Date(),
        photoURL: null, // <-- Adicione esta linha!
      });
      
      // Definir o usuário no estado
      setUser({
        id: firebaseUser.uid,
        email,
        name,
        photoURL: null,
      });
      
      // Navegar para a tela principal
      router.replace('/(tabs)/home');
      return true;
    } catch (e) {
      console.error('Erro ao criar conta:', e);
      setError('Erro ao criar conta. Tente novamente.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      // Deslogar do Firebase
      await firebaseSignOut(auth);
      
      // Remover do AsyncStorage
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      
      // Navegar para a tela de login com um pequeno atraso
      setTimeout(() => {
        router.replace('/(signup)/login');
      }, 100);
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
      throw e; // Propagar o erro para que possa ser tratado
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      signIn, 
      signUp, 
      signOut, 
      error,
      getCurrentUser,
      isAuthenticated
    }}>
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

const handleProfileImageUpdate = async (uri: string, userId: string) => {
  const url = await uploadProfileImage(uri, userId);
  await updateDoc(doc(db, "users", userId), { photoURL: url });
}

export default AuthContext;