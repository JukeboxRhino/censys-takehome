import { useState } from 'react';
import './App.css'
import QueryBar from './QueryBar';
import SearchResults from './SearchResults';
import { useQuery } from '@tanstack/react-query';
import { fetchHosts } from './fetch/hosts';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cursor, setCursor] = useState('');
  const { isPending, data } = useQuery({ queryKey: ['hosts', searchTerm, cursor], queryFn: fetchHosts })

  return (
    <main className='page'>
      <header>
        <h1>Search Hosts</h1>
        <QueryBar onSubmit={setSearchTerm} />
      </header>
      <SearchResults loading={isPending} setCursor={setCursor} data={data} />
    </main>
  )
}

export default App
