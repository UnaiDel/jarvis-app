import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ChatGptForm = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [listening, setListening] = useState(false);
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  useEffect(() => {
    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setInput(voiceInput);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }, []);

  const handleVoiceCommand = () => {
    if (!listening) {
      recognition.start();
      setListening(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await apiService.sendPrompt(input);
    setResponse(result);
  };

  return (
    <div>
      <button onClick={handleVoiceCommand}>
        {listening ? 'Listening...' : 'Start Voice Command'}
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <p>Response: {response}</p>
    </div>
  );
};

export default ChatGptForm;
