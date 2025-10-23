import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/message')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => setError(error.toString()));
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <p>
        {error ? `Error: ${error}` : (message || 'Loading message from backend...')}
      </p>
    </>
  )
}

export default App
