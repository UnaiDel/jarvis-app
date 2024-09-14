// Importar lo necesario de Firebase
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../firebaseConfig'; // Importar la configuración de Firebase

const auth = getAuth(app); // Inicializar la autenticación con la app de Firebase

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
