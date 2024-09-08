import React from 'react';

function ResponseDisplay({ response }) {
  return (
    <div>
      <h2>Respuesta de GPT:</h2>
      <p>{response}</p>
    </div>
  );
}

export default ResponseDisplay;
