import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading backend...');

  useEffect(() => {
    fetch('http://localhost:3001/api')
      .then((response) => response.json())
      .then((data) => setMessage(data.message || 'OK'))
      .catch((err) => setMessage(`Failed to reach backend: ${err?.message || 'Unknown error'}`));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
