import React from 'react';

const ResponseDisplay = ({ response }) => {
  return (
    <div>
      <h2>Response from JARVIS</h2>
      <p>{response}</p>
    </div>
  );
};

export default ResponseDisplay;
