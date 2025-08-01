import { useState } from 'react';
import Calculator from './components/Calculator';
import Converter from './components/Converter';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Math & Conversion Tools</h1>
      
      {/* Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <button
          onClick={() => setActiveTab('calculator')}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'calculator' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'calculator' ? 'white' : 'black'
          }}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('converter')}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'converter' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'converter' ? 'white' : 'black'
          }}
        >
          Unit Converter
        </button>
      </div>

      {/* Content */}
      {activeTab === 'calculator' ? <Calculator /> : <Converter />}
    </div>
  );
}

export default App;
