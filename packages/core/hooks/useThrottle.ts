import { noop } from "@/../utils";
import { useCallback, useMemo, useRef, useState } from "react";
import { CallbackWithArguments, UnknownFunction } from "../types";
import { useDidUpdate } from "./useDidUpdate";
import { useFreshRef } from "./useFreshRef";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useThrottle
 * @description 回调函数会在定时结束后执行，延时期间确保函数不会重复执行
 * @param {Function} callback 节流函数
 * @param {number} delay 节流延时，单位ms
 */
export function useThrottle<T>(
  callback: CallbackWithArguments<T>,
  delay: number = 200
): [boolean, CallbackWithArguments<T>] {
  const [ready, setReady] = useState(false);
  const timerRef = useFreshRef<number | null>(null);

  const throttleFunc = useCallback(
    (...args: T[]) => {
      if (!ready) return;
      callback(...args);
      setReady(false);
    },
    [ready]
  );

  useDidUpdate(() => {
    if (!ready) {
      timerRef.current = window.setTimeout(() => {
        setReady(true);
      }, delay);
    }
  }, [ready]);

  useWillUnmount(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  });

  return useMemo(() => [ready, throttleFunc], [ready, throttleFunc]);
}
