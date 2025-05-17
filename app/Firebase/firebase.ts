import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
const db = getFirestore(app);
const auth = getAuth(app);
//const analytics = getAnalytics(app);

// Habilitar persistência offline
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log('Persistência falhou, múltiplas abas abertas ao mesmo tempo.');
    } else if (err.code === 'unimplemented') {
      console.log('O navegador atual não suporta todos os recursos necessários para persistência.');
    }
  });

export { app, db, auth};