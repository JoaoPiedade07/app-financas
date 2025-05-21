import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import { initializeFirestore, persistentLocalCache, persistentSingleTabManager }  from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8kgJJ2D1BvnEs__HIw-wdLYZkCEFOgV4",
  authDomain: "finances-tracker-56fe1.firebaseapp.com",
  databaseURL: "https://finances-tracker-56fe1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "finances-tracker-56fe1",
  storageBucket: "finances-tracker-56fe1.firebasestorage.app",
  messagingSenderId: "395103140215",
  appId: "1:395103140215:web:028b68c2a52a0f9ca9c972",
  measurementId: "G-MCQ3WTD0V6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore com persistência de cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager(undefined)
  })
});

const auth = getAuth(app);

// Função auxiliar para verificar o estado de autenticação atual
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export { app, db, auth, getCurrentUser };