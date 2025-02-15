import { useState } from 'react';
import './App.css'
import QueryBar from './QueryBar';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const hostData = useQuery({ queryKey: ['hosts', searchTerm], queryFn: () => undefined })

  return (
    <main className='page'>
      <header>

        <h1>Search Hosts</h1>
        <QueryBar onSubmit={setSearchTerm} />
      </header>
    </main>
  )
}

export default App
