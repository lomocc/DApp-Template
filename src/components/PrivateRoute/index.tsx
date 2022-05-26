import useSignedIn from '../../data/useSignedIn';

interface Props {
  element: React.ReactElement | null;
  permissionId?: string;
}

export const PrivateRoute: React.FC<Props> = ({ element, permissionId }) => {
  const isSignedIn = useSignedIn();
  return isSignedIn ? element : <>Access denied</>;
};
