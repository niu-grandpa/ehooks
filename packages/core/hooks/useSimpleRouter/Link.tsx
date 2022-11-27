import React from "react";
import { memo, ReactNode, useCallback, MouseEvent } from "react";
import {
  checkLocation,
  normalizeLocation,
  pushState,
  replaceState,
} from "./common";
import { __routeMap } from "./Routes";

type LinkProps = {
  /**路由跳转路径 */
  to: string;
  /**设置元素类名 */
  className?: string;
  children?: ReactNode;
  /**传给对应路由地址的参数 */
  state?: Record<string, unknown>;
};

const { isCorrect, isMatchedLocation } = checkLocation;

export const Link = memo(({ to, state, children, className }: LinkProps) => {
  const setLocation = useCallback(() => {
    const { isHash, map } = __routeMap;
    const { title, path, replace } = map[to];
    if (!isMatchedLocation(to, path)) return;
    const url = normalizeLocation(isHash, to);
    replace
      ? replaceState(state, title || "", url)
      : pushState(state, title || "", url);
  }, [to, state]);

  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isCorrect(to)) return;
      setLocation();
    },
    [to, setLocation]
  );

  return (
    <a href="#!" {...{ className, onClick }}>
      {children}
    </a>
  );
});
