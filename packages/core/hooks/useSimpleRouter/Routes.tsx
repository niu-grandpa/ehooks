/* eslint-disable no-restricted-globals */
import React from "react";
import { isValidElement, ReactNode, useCallback, useMemo, useRef } from "react";
import { memo } from "react";
import { useFreshRef } from "../useFreshRef";
import { RouteProps } from "./Route";

type RoutesProps = {
  type?: "hash" | "history";
  children: RoutesNode;
};

type RoutesNode = RoutesNodeProps | RoutesNodeProps[];

type RoutesNodeProps = {
  props: RouteProps;
};

type RouteMap = Record<string, RouteProps>;

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
    const { path, component, index, replace, caseSensitive } = node.props;

    if (!validProps(path, component)) return;

    routes[path] = {
      index: index || false,
      path,
      component,
      replace: replace || false,
      caseSensitive: caseSensitive || false,
    };
  };

  nodes.forEach(iterators);

  return routes;
};

const getLocation = (type: "pathname" | "hash") => {
  return location[type];
};

const onPopStateChange = () => {};

const pushState = (data: unknown, title: string, url?: string) => {
  history.pushState(data, title, url);
};

const replaceState = (data: unknown, title: string, url?: string) => {
  history.replaceState(data, title, url);
};

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
