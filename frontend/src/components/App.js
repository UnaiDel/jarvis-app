import React, { useState, useEffect } from 'react';
import ChatGptForm from './ChatGptForm';
import FirebaseAuth from './FirebaseAuth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig'; // Asegúrate de importar la instancia de Firebase
import '../styles/App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const auth = getAuth(app); // Pasa la instancia de Firebase a getAuth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Termina la carga cuando se verifica el estado
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Cargando...</p>; // Indicador de carga
  }

  return (
    <div>
      <h1>Welcome to JARVIS</h1>
      <FirebaseAuth />

      {user ? (
        <ChatGptForm />
      ) : (
        <p>Por favor, inicia sesión para realizar consultas.</p>
      )}
    </div>
  );
};

export default App;
