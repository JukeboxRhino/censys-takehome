import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from '../src/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};

// Right now this just hits the actual API to test. With more time
// I would set up some mocks so that the tests aren't dependent on the
// backend service being online (unless the backend was also being tested).
describe('App', () => {
  test('it renders', () => {
    render(<App />, { wrapper })
  });


  test('it searches for a host', async () => {
    render(<App />, { wrapper });

    const queryBar = await screen.findByRole('searchbox');

    // Type "censys.io" into the query bar
    fireEvent.change(queryBar, { target: { value: 'censys.io' } });

    // Press Enter
    fireEvent.keyUp(queryBar, { key: 'Enter' });

    // Should show some hosts with web servers
    expect(await screen.findAllByText('80/HTTP', { exact: false })).toBeTruthy();
  })
});
