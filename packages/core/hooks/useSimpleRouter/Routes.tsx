import {
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import React, { memo } from "react";
import { RouteProps } from "./Route";
import {
  type RouteMap,
  routeMap,
  getLocation,
  checkLocation,
  replaceState,
  pushState,
  setLocation,
} from "./common";
import { useDidMount } from "../useDidMount";

type RoutesProps = {
  hash?: boolean;
  history?: boolean;
  children: RoutesNode;
};

type RoutesNode = RoutesNodeProps | RoutesNodeProps[];

type RoutesNodeProps = {
  props: RouteProps;
};

export const __routeMap = routeMap();
const { isCorrect, isMatchedRoute, isCaseSensitive } = checkLocation;

export const Routes = memo(({ hash, history, children }: RoutesProps) => {
  isHasChildren(children);

  const routeMap = useMemo<RouteMap>(() => collectRoute(children), [children]);
  const [showComponent, setComponent] = useState<ReactNode>(null);

  const routeType = useMemo(() => {
    if (!hash && !history) return "hash";
    return history ? "pathname" : "hash";
  }, [hash, history]);

  useDidMount(() => {
    __routeMap.type = routeType;
    matchRoutes();
  });

  const matchRoutes = useCallback(
    (current = "") => {
      const location = (current || getLocation(routeType)).toLowerCase();
      if (!isCorrect(location) || !isMatchedRoute(location, routeMap)) return;

      const route = routeMap[location];
      if (!route) return;
      const { index, replace, title, component, caseSensitive, pathTemp } =
        route;

      if (!isCaseSensitive(caseSensitive, location, pathTemp)) return;

      setLocation({
        title,
        replace,
        path: location,
        isHash: routeType === "hash",
      });
      setComponent(component);
    },
    [routeType, routeMap]
  );

  return <>{showComponent}</>;
});

const collectRoute = (_nodes: RoutesNode): RouteMap => {
  const routes: RouteMap = {};
  const nodes = Array.isArray(_nodes) ? _nodes : [_nodes];

  const iterators = (node: RoutesNodeProps) => {
    const { path, component, index, replace, title, caseSensitive } =
      node.props;

    if (!validProps(path, component)) return;

    const newPath = path.toLowerCase();
    routes[newPath] = {
      path: newPath,
      pathTemp: path,
      title,
      component,
      index: index || false,
      replace: replace || false,
      caseSensitive: caseSensitive || false,
    };
  };

  nodes.forEach(iterators);
  __routeMap.collect(routes);

  return routes;
};

const isHasChildren = (children: RoutesNode) => {
  if (typeof children === "undefined") {
    throw Error(
      "[useSimpleRouter] The Routes component must have children, like <Routes><Route /></Routes>"
    );
  }
};

const validProps = (path: string, component: ReactNode) => {
  if (!path) {
    console.error("[useSimpleRouter] <Route />, need path props");
    return false;
  }
  if (typeof path !== "string") {
    console.error(
      '[useSimpleRouter] <Route />, the props type of "path" must be string '
    );
    return false;
  }
  if (!component || !isValidElement(component)) {
    console.error(
      '[useSimpleRouter] <Route />, the props type of "component" can\'t be undefined'
    );
    return false;
  }
  return true;
};
