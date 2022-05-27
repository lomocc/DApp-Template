import { useCallback } from 'react';
import useSignedIn from './useSignedIn';

/**
 * Check if user has permission
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
