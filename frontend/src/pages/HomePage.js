import React from 'react';
import { Link } from 'react-router-dom';
import FirebaseAuth from '../components/FirebaseAuth';

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido a JARVIS</h1>
      <FirebaseAuth />
      <Link to="/gpt">Ir al Chat GPT</Link>
    </div>
  );
};

export default HomePage;
