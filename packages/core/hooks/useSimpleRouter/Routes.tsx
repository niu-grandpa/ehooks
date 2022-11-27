import { isValidElement, ReactNode, useCallback, useMemo } from "react";
import React, { memo } from "react";
import { RouteProps } from "./Route";
import { type RouteMap, routeMap, getLocation } from "./common";
import { useDidMount } from "../useDidMount";
import { useFreshRef } from "../useFreshRef";

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

export const Routes = memo(({ hash, history, children }: RoutesProps) => {
  isHasChildren(children);

  const routeMap = useFreshRef<RouteMap>(collectRoute(children));
  const routeType = useMemo(() => {
    if (!hash && !history) return "hash";
    return history ? "pathname" : "hash";
  }, [hash, history]);

  useDidMount(() => {
    __routeMap.type = routeType;
  });

  const matchRouteComponent = useCallback(() => {
    const location = getLocation(routeType);
    return () => routeMap.current[location]?.component;
  }, [routeType, routeMap]);

  const currentComponent = useMemo(
    () => matchRouteComponent(),
    [matchRouteComponent]
  );

  return <>{currentComponent()}</>;
});

const collectRoute = (_nodes: RoutesNode): RouteMap => {
  const routes: RouteMap = {};
  const nodes = Array.isArray(_nodes) ? _nodes : [_nodes];

  const iterators = (node: RoutesNodeProps) => {
    const { path, component, index, replace, title, caseSensitive } =
      node.props;

    if (!validProps(path, component)) return;

    routes[path] = {
      path,
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

const onPopStateChange = () => {};

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
