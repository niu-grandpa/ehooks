import { useCallback, useRef } from "react";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useGetIsMounted
 *
 * @description 返回一个函数并调用它，用于判断当前组件是否已经挂载完毕。
 */
export function useGetIsMounted(): () => boolean {
  const isMounted = useRef<boolean>(false);

  useDidMount(() => {
    isMounted.current = true;
  });

  useWillUnmount(() => {
    isMounted.current = false;
  });

  return useCallback(() => isMounted.current, []);
}
