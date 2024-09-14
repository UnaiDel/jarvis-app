import React from 'react';
import ChatGptForm from './ChatGptForm';
import FirebaseAuth from './FirebaseAuth';
import './App.css';

const App = () => {
  return (
    <div>
      <h1>Welcome to JARVIS</h1>
      <FirebaseAuth />
      <ChatGptForm />
    </div>
  );
};

export default App;
