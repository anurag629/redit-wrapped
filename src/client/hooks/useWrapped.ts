import { useState, useCallback } from 'react';
import type { AnalyzeResponse, ErrorResponse } from '../../shared/types/api';

interface WrappedState {
  data: AnalyzeResponse | null;
  loading: boolean;
  error: string | null;
}

export const useWrapped = () => {
  const [state, setState] = useState<WrappedState>({
    data: null,
    loading: false,
    error: null,
  });

  const analyze = useCallback(async (username: string) => {
    setState({ data: null, loading: true, error: null });

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, limit: 100 }),
      });

      const data: AnalyzeResponse | ErrorResponse = await res.json();

      if (data.type === 'error') {
        setState({ data: null, loading: false, error: data.message });
        return;
      }

      setState({ data, loading: false, error: null });
    } catch (err) {
      console.error('Failed to analyze user', err);
      setState({
        data: null,
        loading: false,
        error: 'Failed to fetch user data. Please try again.',
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    analyze,
    reset,
  } as const;
};
