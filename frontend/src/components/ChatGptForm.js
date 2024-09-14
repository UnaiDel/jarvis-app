import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { sendGptInput } from '../services/apiService'; // Named import

const ChatGptForm = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await sendGptInput(input); // Llamada correcta
    setResponse(res);
  };

  return (
    <div className="chat-container">
      <h2>Consulta a GPT</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Escribe tu consulta"
          variant="outlined"
          fullWidth
          margin="normal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
};

export default ChatGptForm;
