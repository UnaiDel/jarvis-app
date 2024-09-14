import React, { useState } from 'react';
import { sendGptInput } from '../services/apiService';
import './ChatGptForm.css'; // Asegúrate de importar los estilos

const ChatGptForm = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [error, setError] = useState(null);
  const [isCelebration, setIsCelebration] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendGptInput(inputText);
      setResponseText(response.message || 'No message found');

      // Activar modo celebración
      setIsCelebration(true);
      setTimeout(() => setIsCelebration(false), 3000); // La celebración dura 3 segundos
    } catch (err) {
      setError('Failed to get GPT response');
    }
  };

  return (
    <div className={isCelebration ? 'celebration-mode' : ''}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text"
        />
        <button type="submit">Send</button>
      </form>
      {responseText && <p>Response: {responseText}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ChatGptForm;
