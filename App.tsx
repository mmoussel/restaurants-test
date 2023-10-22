/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Navigation } from './src/navigation';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}

export default App;
