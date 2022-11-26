import React from "react";
import { memo, ReactNode, useCallback, MouseEvent } from "react";
import { pushState } from "./common";
import { __routeMap } from "./Routes";

type LinkProps = {
  /**路由跳转路径 */
  to: string;
  children?: ReactNode;
  /**传给对应路由地址的参数 */
  state?: Record<string, unknown>;
};

export const Link = memo(({ to, state, children }: LinkProps) => {
  const onLinkClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const { isHash, map } = __routeMap;
      const { title, path } = map[to];
      if (to !== path) {
        console.warn(`[useSimpleRouter] No routes matched location "${path}"`);
        return;
      }
      pushState(state, title || "", isHash ? `#${to}` : to);
    },
    [to, state]
  );
  return (
    <a href="#!" onClick={onLinkClick}>
      {children}
    </a>
  );
});
