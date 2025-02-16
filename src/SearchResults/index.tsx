import './index.css';
import Host from '../Host';
import { SearchResults as SearchResultsType } from '../fetch/hosts';

interface SearchResultsProps {
  loading: boolean;
  data?: SearchResultsType;
  setCursor: (cursor: string) => void;
}

const CursorButton = ({ className, children, cursor, setCursor }: {
  className: string;
  children: React.ReactElement | string;
  cursor?: string;
  setCursor: (cursor: string) => void;
}) => {
  const hasCursor = typeof cursor === 'string' && cursor.length > 0;
  const handleClick = () => {
    if (hasCursor) {
      setCursor(cursor);
    }
  }
  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={!hasCursor}
    >
      {children}
    </button>
  )
}

const SearchResults = ({ loading, data, setCursor }: SearchResultsProps) => {
  return (
    <section className='results'>
      {loading && <div>Loading...</div>}
      {data && data.hits.map((hit) => <Host host={hit} />)}
      {data?.hits.length ?
        <div className='nav-buttons'>
          <CursorButton className='prev' cursor={data?.links.prev} setCursor={setCursor}>Previous</CursorButton>
          <CursorButton className='next' cursor={data?.links.next} setCursor={setCursor}>Next</CursorButton>
        </div>
        : null}
    </section>
  )
};

export default SearchResults;
