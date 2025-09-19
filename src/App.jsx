import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header>
        <h1>Bienvenidos al Proyecto React + Vite</h1>
      </header>
    </div>
  );
}

export default App;

