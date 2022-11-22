import React, { useCallback, useMemo, memo } from "react";
import { ReactElm } from "../types";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

interface RoutesProps {
  hash?: boolean;
  children?: ReactElm;
}

interface RouteProps {
  path?: string;
  /**是否为设置为首页 */
  index?: boolean;
  replace?: boolean;
  component?: ReactElm;
  /**指定匹配时是否区分大小写 */
  caseSensitive?: boolean;
}

interface NavigateProps {
  push?: string;
  replace?: string;
  children?: ReactElm;
}

interface LinkProps {
  to: string;
  state?: Record<string, unknown>;
}

export function useSimpleRouter() {
  const onHashChange = useCallback(() => {}, []);

  const Routes = memo((props: RoutesProps) => {
    return <></>;
  });

  const Route = memo((props: RouteProps) => {
    return <></>;
  });

  const Link = memo((props: LinkProps) => {
    return <></>;
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

  return useMemo(
    () => ({ Routes, Route, Link, Navigate }),
    [Routes, Route, Link, Navigate]
  );
}
