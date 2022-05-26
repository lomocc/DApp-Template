import { RouteObject } from 'react-router-dom';

function invariant(cond: boolean, message?: string) {
  if (!cond) throw new Error(message);
}

function flattenRoutes(
  routes: RouteObject[],
  branches?: any[],
  parentsMeta?: any[],
  parentPath?: string
) {
  if (branches === void 0) {
    branches = [];
  }

  if (parentsMeta === void 0) {
    parentsMeta = [];
  }

  if (parentPath === void 0) {
    parentPath = '';
  }

  routes.forEach((route, index) => {
    let meta = {
      relativePath: route.path || '',
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route,
    };

    if (meta.relativePath.startsWith('/')) {
      !meta.relativePath.startsWith(parentPath!)
        ? process.env.NODE_ENV !== 'production'
          ? invariant(
              false,
              'Absolute route path "' +
                meta.relativePath +
                '" nested under path ' +
                ('"' +
                  parentPath +
                  '" is not valid. An absolute child route path ') +
                'must start with the combined path of all its parent routes.'
            )
          : invariant(false)
        : void 0;
      meta.relativePath = meta.relativePath.slice(parentPath!.length);
    }

    let path = joinPaths([parentPath!, meta.relativePath]);
    let routesMeta = parentsMeta!.concat(meta); // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.

    if (route.children && route.children.length > 0) {
      !(route.index !== true)
        ? process.env.NODE_ENV !== 'production'
          ? invariant(
              false,
              'Index routes must not have child routes. Please remove ' +
                ('all child routes from route path "' + path + '".')
            )
          : invariant(false)
        : void 0;
      flattenRoutes(route.children, branches, routesMeta, path);
    } // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.

    if (route.path == null && !route.index) {
      return;
    }

    branches!.push({
      path,
      score: computeScore(path, route.index!),
      routesMeta,
    });
  });
  return branches;
}

const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;

const isSplat = (s: string) => s === '*';

function computeScore(path: string, index: boolean) {
  let segments = path.split('/');
  let initialScore = segments.length;

  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }

  if (index) {
    initialScore += indexRouteValue;
  }

  return segments
    .filter(s => !isSplat(s))
    .reduce(
      (score, segment) =>
        score +
        (paramRe.test(segment)
          ? dynamicSegmentValue
          : segment === ''
          ? emptySegmentValue
          : staticSegmentValue),
      initialScore
    );
}

const joinPaths = (paths: string[]) => paths.join('/').replace(/\/\/+/g, '/');

export { flattenRoutes };
