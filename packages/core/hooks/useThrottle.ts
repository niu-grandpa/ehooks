import { useCallback, useRef } from "react";
import { CallbackWithNoArguments } from "../types/types";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useThrottle
 *
 * @description 在n秒后执行事件函数，稀释函数执行频率。
 */
export function useThrottle(callback: CallbackWithNoArguments, wait?: number) {
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const fn = useRef<CallbackWithNoArguments | null>(callback);

  if (typeof callback !== "function") {
    throw TypeError("expected is a function!");
  }

  // TODO arguments和调用this指向
  const throttleFn = useCallback(() => {
    if (timerId.current) return;
    timerId.current = setTimeout(() => {
      clearTimer(timerId.current);
      callback();
    }, wait || 200);
  }, [timerId.current]);

  useDidMount(() => {
    fn.current = throttleFn;
  });

  useWillUnmount(() => {
    clearTimer(timerId.current);
    fn.current = null;
  });

  return fn.current;
}

export const clearTimer = (timerId: NodeJS.Timeout | null) => {
  if (!timerId) return;
  clearTimeout(timerId);
  timerId = null;
};
