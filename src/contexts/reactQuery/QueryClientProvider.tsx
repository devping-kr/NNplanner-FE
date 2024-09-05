'use client';

import { PropsWithChildren, useState } from 'react';
import { type QueryClientConfig } from '@tanstack/react-query';
import {
  QueryClientProvider as BaseQueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      networkMode: 'always',
      staleTime: 1000 * 60,
      throwOnError: true,
    },
    mutations: {
      networkMode: 'always',
    },
  },
};

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOption));
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
