import { useState } from 'react';
import './App.css';
import { getAllQueryParams } from './utils/client-utils';

function App() {
  const [count, setCount] = useState(0);
  const params = getAllQueryParams();
  return (
    <div className="card">
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>{JSON.stringify(params)}</div>
      <button style={{ marginTop: "20px" }} onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </button>
    </div>
  )
}

export default App
