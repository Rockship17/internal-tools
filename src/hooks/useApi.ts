import { useState, useCallback } from 'react';
import { ApiError, api } from '@/utils/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

type ApiMethod = keyof typeof api;

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (
    method: ApiMethod,
    endpoint: string,
    body?: Record<string, unknown>
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await api[method]<T>(endpoint, body);
      setState({ data: response.data, loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error instanceof ApiError
        ? error
        : new Error('An unexpected error occurred');
      setState(prev => ({ ...prev, loading: false, error: apiError }));
      throw apiError;
    }
  }, []);

  return {
    ...state,
    execute,
  };
} 