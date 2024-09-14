import React, { useState } from 'react';
import { login, logout } from '../services/firebaseAuthService';

const FirebaseAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await login(email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default FirebaseAuth;
