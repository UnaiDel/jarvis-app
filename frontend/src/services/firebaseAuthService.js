import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../firebaseConfig'; // Importa la instancia de Firebase correctamente

const auth = getAuth(app); // Usa la instancia de la app para la autenticación

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
