import { memo, ReactNode, useCallback, MouseEvent } from 'react';
import { checkLocation, normalizeLocation, pushState, replaceState } from './common';
import { __routeMap } from './Routes';

type LinkProps = {
  /**路由跳转路径 */
  to: string;
  /**设置元素类名 */
  className?: string;
  children?: ReactNode;
  /**传给对应路由地址的参数 */
  state?: Record<string, unknown>;
};

const { isCorrect, isMatched } = checkLocation;

export const Link = memo(({ to, state, children, className }: LinkProps) => {
  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isCorrect(to)) return;

      const { isHash, map } = __routeMap;
      const { title, path, replace } = map[to];

      if (!isMatched(to, path)) return;

      const url = normalizeLocation(isHash, to);
      replace ? replaceState(state, title || '', url) : pushState(state, title || '', url);
    },
    [to, state]
  );

  return (
    <a href='#!' {...{ className, onClick }}>
      {children}
    </a>
  );
});
