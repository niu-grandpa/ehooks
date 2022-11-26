import { isValidElement, ReactNode, useCallback, useMemo } from "react";
import React, { memo } from "react";
import { RouteProps } from "./Route";
import { type RouteMap, routeMap, getLocation } from "./common";
import { useFreshRef } from "../useFreshRef";
import { useDidUpdate } from "../useDidUpdate";

type RoutesProps = {
  /**使用hash或history路由，区别在于地址栏是否带 '#' */
  type?: "hash" | "history";
  children: RoutesNode;
};

type RoutesNode = RoutesNodeProps | RoutesNodeProps[];

type RoutesNodeProps = {
  props: RouteProps;
};

export const __routeMap = routeMap();

export const Routes = memo(({ type, children }: RoutesProps) => {
  if (typeof children === "undefined") {
    throw Error(
      "[useSimpleRouter] The Routes component must have children, like <Routes><Route /></Routes>"
    );
  }

  const routeMap = useFreshRef<RouteMap>(collectRoute(children));

  const routeType = useMemo(() => {
    if (!type) return "hash";
    return type === "history" ? "pathname" : type;
  }, [type]);

  useDidUpdate(() => {
    __routeMap.type = routeType;
  }, [routeType]);

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

const validProps = (path: string, component: ReactNode) => {
  if (path && typeof path !== "string") {
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
