// frontend/src/components/ChatGptForm.js

import React, { useState } from 'react';
import apiService from '../services/apiService'; // Llamada al servicio de la API

const ChatGptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('Procesando la solicitud...'); // Mensaje mientras se espera la respuesta

    try {
      // Llamar a la API del backend y obtener la respuesta de GPT
      const gptResponse = await apiService.getGPTResponse(prompt);

      // Si la respuesta es un objeto, convierte a cadena JSON
      const formattedResponse =
        typeof gptResponse === 'object'
          ? JSON.stringify(gptResponse)
          : gptResponse;

      // Mostrar la respuesta en el frontend
      setResponse(formattedResponse);
    } catch (error) {
      console.error('Error al enviar el prompt:', error.message);
      setResponse('Hubo un error al obtener la respuesta.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu pregunta..."
        />
        <button type="submit">Enviar</button>
      </form>

      <div>
        <h3>Respuesta de GPT:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatGptForm;
