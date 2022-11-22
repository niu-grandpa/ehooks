import { noop } from "@/../utils";
import { useCallback, useRef } from "react";
import { CallbackWithArguments, UnknownFunction } from "../types";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useThrottle
 *
 * @description 函数节流。在n秒后执行事件函数，稀释函数执行频率。
 *
 * ```ts
 * const fn = useThrottle((a, b) => { console.log(a + b); }, 200);
 * setInterval(() => { fn(1, 2); }, 200);
 * ```
 */
export function useThrottle<T extends CallbackWithArguments>(
  this: any,
  callback: T,
  wait?: number
) {
  const that = useRef<any>(this);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const throttleFn = useRef<UnknownFunction | null>(null);

  if (typeof callback !== "function") {
    throw TypeError("expected is a function!");
  }

  const declareThrottleFn = () => {
    throttleFn.current = useCallback(
      function () {
        if (timerId.current) return;
        const args = arguments;
        timerId.current = setTimeout(() => {
          clearTimer();
          callback.apply(that.current, args);
        }, wait || 200);
      },
      [timerId.current]
    );
  };

  const clearTimer = useCallback(() => {
    if (!timerId.current) return;
    clearTimeout(timerId.current as unknown as number);
    timerId.current = null;
  }, [timerId.current]);

  useDidMount(declareThrottleFn);

  useWillUnmount(() => {
    that.current = null;
    throttleFn.current = null;
    clearTimer();
  });

  return throttleFn.current || noop;
}
