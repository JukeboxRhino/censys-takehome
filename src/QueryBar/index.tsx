import { useState } from 'react';
import './index.css';

interface QueryBarProps {
  onSubmit: (query: string) => void;
}

const QueryBar = ({ onSubmit }: QueryBarProps) => {
  const [query, setQuery] = useState('');
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(query);
    }
  }
  return (
    <div className='query-bar'>
      <input onChange={inputHandler} onKeyUp={keyHandler} role='searchbox' />
      <button onClick={() => onSubmit(query)}>Submit</button>
    </div>
  )
};

export default QueryBar;
