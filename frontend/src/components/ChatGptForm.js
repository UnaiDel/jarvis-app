import React, { useState } from 'react';
import axios from 'axios';

const ChatGptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/gpt-process',
        {
          prompt,
          type: 'generate',
          fileName: 'generatedFile.js',
        },
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Escribe un prompt..."
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Enviar'}
      </button>
    </form>
  );
};

export default ChatGptForm;
