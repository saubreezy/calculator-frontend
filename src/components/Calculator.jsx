import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://kbnnoxp0k1.execute-api.eu-west-2.amazonaws.com/prod/calculate';

export default function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a, b, operation }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Calculator</h2>
      <div>
        <input
          type="number"
          value={a}
          onChange={e => setA(e.target.value)}
          placeholder="First number"
          required
          step="any"
        />
      </div>
      <div>
        <input
          type="number"
          value={b}
          onChange={e => setB(e.target.value)}
          placeholder="Second number"
          required
          step="any"
        />
      </div>
      <div>
        <select value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
        {loading ? 'Calculating...' : 'Calculate'}
      </button>
      {result !== null && (
        <div style={{ marginTop: 16 }}>Result: <strong>{result}</strong></div>
      )}
      {error && (
        <div style={{ marginTop: 16, color: 'red' }}>Error: {error}</div>
      )}
    </form>
  );
} 