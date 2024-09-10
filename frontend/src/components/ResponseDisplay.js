import React, { useState, useEffect } from 'react';

const ResponseDisplay = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Aquí puedes traer la respuesta desde el backend si la quieres mostrar en tiempo real
  }, []);

  return (
    <div>
      <h2>Respuesta del GPT:</h2>
      {response ? <p>{response}</p> : <p>No hay respuesta disponible aún.</p>}
    </div>
  );
};

export default ResponseDisplay;
