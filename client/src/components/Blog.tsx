import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import PostList from '@/components/PostList';

export default function Blog() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );
}
