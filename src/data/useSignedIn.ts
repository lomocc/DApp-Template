import { useMemo } from 'react';
import { useSessionId } from '../contexts/useLocalStorage';

/**
 * Check if user is signed in
 */
export default function useSignedIn() {
  const sessionId = useSessionId();
  return useMemo(() => sessionId != null, [sessionId]);
}
