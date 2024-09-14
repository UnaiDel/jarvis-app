import React from 'react';
import { Button, TextField } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/FirebaseAuth.css';

const FirebaseAuth = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuario autenticado', userCredential);
      })
      .catch((error) => {
        console.error('Error en la autenticación', error);
      });
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Iniciar Sesión
      </Button>
    </div>
  );
};

export default FirebaseAuth;
