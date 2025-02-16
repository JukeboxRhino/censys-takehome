const API_BASE_URL = 'https://search.censys.io/api';
const API_ID = import.meta.env.VITE_CENSYS_API_KEY;
const API_SECRET = import.meta.env.VITE_CENSYS_API_SECRET;
const PAGE_SIZE = '20';

interface FetchHostsParams {
  queryKey: [string, string, string]
}

export interface Service {
  transport_protocol: string;
  extended_service_name: string;
  service_name: string;
  port: number;
}
export interface Hit {
  ip: string;
  location: {
    city?: string;
    country?: string;
  };
  services: Service[];
}

export interface SearchResults {
  query: string;
  total: number;
  duration: number;
  hits: Hit[];
  links: {
    next?: string;
    prev?: string;
  }
}

export const fetchHosts = async ({ queryKey: [_key, search, cursor] }: FetchHostsParams): Promise<SearchResults> => {
  if (search === '') {
    return {
      query: search,
      total: 0,
      duration: 0,
      hits: [],
      links: {}
    };
  }
  const searchParams = new URLSearchParams();
  searchParams.set('q', search);
  searchParams.set('per_page', PAGE_SIZE);
  if (cursor) {
    searchParams.set('cursor', cursor);
  }
  const headers = new Headers();
  const basicAuthString = btoa(`${API_ID}:${API_SECRET}`);
  headers.set('Authorization', `Basic ${basicAuthString}`);
  const response = await fetch(
    `${API_BASE_URL}/v2/hosts/search?${searchParams.toString()}`,
    { headers }
  );
  if (!response.ok) {
    throw new Error('Network error');
  }
  const parsedResponse = await response.json();
  return parsedResponse.result as SearchResults;
};
