import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '..firebaseConfig';

firebase.initializeApp(firebaseConfig);

const FirebaseAuth = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario autenticado:', user);
      } else {
        console.log('Usuario no autenticado.');
      }
    });
  }, []);

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      console.log('Autenticación exitosa');
    } catch (error) {
      console.error('Error en autenticación:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default FirebaseAuth;
