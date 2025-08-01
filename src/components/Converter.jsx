import React, { useState } from 'react';

const CONVERTER_API_URL = import.meta.env.VITE_CONVERTER_API_URL || 'https://kbnnoxp0k1.execute-api.eu-west-2.amazonaws.com/prod/convert';

export default function Converter() {
  const [value, setValue] = useState('');
  const [conversionType, setConversionType] = useState('meters_to_feet');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    console.log('Making conversion API call to:', CONVERTER_API_URL);
    console.log('Request payload:', { value, conversionType });
    
    try {
      const response = await fetch(CONVERTER_API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          value: parseFloat(value), 
          conversion_type: conversionType 
        }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText.substring(0, 200)}`);
      }
      
      const data = await response.json();
      console.log('Success response:', data);
      console.log('Response type:', typeof data);
      console.log('Data keys:', Object.keys(data));
      
      // Handle different response formats
      let resultValue;
      if (data.result !== undefined) {
        resultValue = data.result;
      } else if (data.value !== undefined) {
        resultValue = data.value;
      } else if (data.body) {
        // Parse the body if it's a JSON string
        const bodyData = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
        resultValue = bodyData.result;
      } else {
        console.error('Unexpected response format:', data);
        throw new Error('Unexpected response format from API');
      }
      
      console.log('Result value:', resultValue);
      setResult(resultValue);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getConversionLabel = () => {
    switch (conversionType) {
      case 'meters_to_feet': return 'Meters to Feet';
      case 'feet_to_meters': return 'Feet to Meters';
      case 'kg_to_pounds': return 'Kilograms to Pounds';
      case 'pounds_to_kg': return 'Pounds to Kilograms';
      default: return 'Convert';
    }
  };

  const getInputLabel = () => {
    switch (conversionType) {
      case 'meters_to_feet': return 'Meters';
      case 'feet_to_meters': return 'Feet';
      case 'kg_to_pounds': return 'Kilograms';
      case 'pounds_to_kg': return 'Pounds';
      default: return 'Value';
    }
  };

  const getOutputLabel = () => {
    switch (conversionType) {
      case 'meters_to_feet': return 'Feet';
      case 'feet_to_meters': return 'Meters';
      case 'kg_to_pounds': return 'Pounds';
      case 'pounds_to_kg': return 'Kilograms';
      default: return 'Result';
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Unit Converter</h2>
      <div>
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={getInputLabel()}
          required
          step="any"
        />
      </div>
      <div>
        <select value={conversionType} onChange={e => setConversionType(e.target.value)}>
          <option value="meters_to_feet">Meters to Feet</option>
          <option value="feet_to_meters">Feet to Meters</option>
          <option value="kg_to_pounds">Kilograms to Pounds</option>
          <option value="pounds_to_kg">Pounds to Kilograms</option>
        </select>
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
        {loading ? 'Converting...' : getConversionLabel()}
      </button>
      {result !== null && (
        <div style={{ marginTop: 16 }}>
          Result: <strong>{typeof result === 'number' ? result.toFixed(4) : result} {getOutputLabel()}</strong>
        </div>
      )}
      {error && (
        <div style={{ marginTop: 16, color: 'red' }}>Error: {error}</div>
      )}
    </form>
  );
} 