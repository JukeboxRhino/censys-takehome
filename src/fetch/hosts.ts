export const fetchHosts = async ({ queryKey }: { queryKey: string }) => {
  if (queryKey === '') {
    return [];
  }
  const response = await fetch('/url');
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};
