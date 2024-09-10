import React from 'react';
import ChatGptForm from './components/ChatGptForm';
import ResponseDisplay from './components/ResponseDisplay';
import FirebaseAuth from './components/FirebaseAuth';

function App() {
  return (
    <div className="App">
      <FirebaseAuth />
      <h1>JARVIS Assistant</h1>
      <ChatGptForm />
      <ResponseDisplay />
    </div>
  );
}

export default App;
