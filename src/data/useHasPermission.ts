import { useCallback } from 'react';
import useSignedIn from './useSignedIn';

/**
 * Check if user is signed in
 */
export default function useHasPermission() {
  const isSignedIn = useSignedIn();
  return useCallback(
    (permissionId: string | string[]) => {
      // fixme
      return isSignedIn;
    },
    [isSignedIn]
  );
}
