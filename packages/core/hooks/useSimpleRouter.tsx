import React, { useCallback, useMemo, memo, useRef, MouseEvent } from "react";
import { ReactElm } from "../types";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

interface RoutesProps {
  hash?: boolean;
  children?: ReactElm;
}

interface RouteOptions {
  index?: boolean;
  replace?: boolean;
  component?: ReactElm;
  /**指定匹配时是否区分大小写 */
  caseSensitive?: boolean;
}

interface RouteProps extends RouteOptions {
  path: string;
}

interface NavigateProps {
  push?: string;
  replace?: string;
  children?: ReactElm;
}

interface LinkProps {
  to: string;
  state?: Record<string, unknown>;
  children?: ReactElm;
}

type RoutesMap = Record<string, RouteOptions>;

export function useSimpleRouter() {
  const routes = useRef<RoutesMap>({});

  const Routes = memo((props: RoutesProps) => {
    return <></>;
  });

  const Route = memo((props: RouteProps) => {
    const { path, index, replace, component, caseSensitive } = props;
    if (typeof path === "string") {
      routes.current[path] = {
        index,
        replace,
        component,
        caseSensitive,
      };
    }
    return <></>;
  });

  const Link = memo((props: LinkProps) => {
    const onClick = useCallback((e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!props.to) {
        console.error(
          '[useSimpleRouter warn]: The <Link /> component must be set props "to"'
        );
        return;
      }

      matchComponent(props.to);
    }, []);
    return <a {...{ onClick }}>{props?.children}</a>;
  });

  const Navigate = memo((props: NavigateProps) => {
    return <></>;
  });

  useDidMount(() => {
    window.addEventListener("hashchange", onHashChange);
  });

  useWillUnmount(() => {
    window.removeEventListener("hashchange", onHashChange);
  });

  const onHashChange = useCallback(() => {}, [routes]);

  const matchComponent = useCallback(
    (target: string) => {
      if (!(target in routes.current)) return;
      const { component } = routes.current[target];
    },
    [routes]
  );

  const returnVal = useMemo(
    () => ({ Routes, Route, Link, Navigate }),
    [Routes, Route, Link, Navigate]
  );

  return returnVal;
}
