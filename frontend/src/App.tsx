import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getPing = async () => {
      const response = await window.electron.ping();
      setMessage(response);
    };

    getPing();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Plates For Us</h1>
      <p>Messaggio da Electron: {message}</p>
    </div>
  );
}

export default App;
