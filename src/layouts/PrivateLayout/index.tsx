import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo } from 'react';
import { HiTemplate } from 'react-icons/hi';
import {
  Navigate,
  RouteObject,
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom';
import { PrivateRoute } from '../../components/PrivateRoute';
import { PermissionId } from '../../constants';
import { useSessionId } from '../../contexts/useLocalStorage';
import useHasPermission from '../../data/useHasPermission';
import Dashboard from '../../pages/dashboard';
import { flattenRoutes } from './utils/flattenRoutes';

const PrivateLayout = () => {
  const remainingRoutes: RouteObject[] = useMemo(
    () => [
      {
        path: 'dashboard',
        element: (
          <PrivateRoute
            permissionId={PermissionId.DASHBOARD}
            element={<Dashboard />}
          />
        ),
      },
    ],
    []
  );
  const menuTemplate = useMemo(
    () => [
      {
        to: '/dashboard',
        icon: (
          <HiTemplate className="inline-block w-4 h-4 mr-2 align-text-bottom" />
        ),
        label: 'Dashboard',
      },
    ],
    []
  );
  const location = useLocation();
  const hasPermission = useHasPermission();
  const defaultRoute = useMemo(() => {
    // navigate to the first route that has permission
    return flattenRoutes(remainingRoutes).find(route => {
      const permissionId = route.permissionId;
      return hasPermission(permissionId);
    })?.path;
  }, [remainingRoutes, hasPermission]);
  const routes = useMemo(
    () => [
      {
        index: true,
        element: <Navigate replace to={defaultRoute} />,
      },
      ...remainingRoutes,
    ],
    [defaultRoute, remainingRoutes]
  );
  const element = useRoutes(routes);
  const sessionId = useSessionId();
  const navigate = useNavigate();

  const selectedIndex = useMemo(() => {
    return menuTemplate.findIndex(item => {
      return location.pathname.startsWith(item.to);
    });
  }, [menuTemplate, location]);
  const onTabChange = useCallback(
    (index: number) => {
      const link = menuTemplate[index];
      navigate(link.to);
    },
    [navigate, menuTemplate]
  );
  useEffect(() => {
    // if the user is not signed in, redirect to the sign in page
    if (!sessionId) {
      navigate('/signin', { replace: true });
    }
  }, [sessionId, navigate]);

  return (
    <div className="h-full flex-col">
      <div className="flex-1 overflow-auto flex h-full">
        <div className="w-48 bg-slate-800">
          <div className="py-10 flex flex-col">
            <div className="flex flex-col items-start gap-5">
              {menuTemplate.map((link, index) => {
                const selected = index === selectedIndex;
                return (
                  <button
                    onClick={() => onTabChange(index)}
                    key={link.to}
                    className={classNames(
                      'w-full text-left text-white p-5 text-sm font-medium border-l-8 border-transparent transition duration-500',
                      selected
                        ? 'bg-blue-600/30 border-l-blue-600'
                        : 'hover:bg-blue-900 hover:bg-opacity-30 hover:border-l-blue-600/50'
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="overflow-auto bg-gray-100 flex-auto">
          <div className="p-8">
            <PrivateRoute element={element} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
