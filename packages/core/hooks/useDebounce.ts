import { useCallback, useEffect, useMemo } from "react";
import { UnknownFunction } from "../types";
import { useFreshRef } from "./useFreshRef";
import { useFreshTick } from "./useFreshTick";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

type DebounceOptions = Partial<{
  immediate: boolean;
  useLayoutEffect: boolean;
}>;

/**
 * useDebounce
 * @description 防止事件函数在n秒内被多次重复执行
 * @param {Function} callback 要执行防抖的回调函数
 * @param {number} delay 防抖时间
 * @param {DebounceOptions} options 配置选项
 */
export function useDebounce<T extends UnknownFunction>(
  this: void,
  callback: T,
  delay: number = 200,
  options?: DebounceOptions
) {
  const _this = useFreshRef(this);
  const timer = useFreshRef<NodeJS.Timeout | null>(null);
  const debounce = useFreshRef<UnknownFunction>(() => {});

  const useEffectToRun = options?.useLayoutEffect
    ? useIsomorphicEffect
    : useEffect;

  const freshCallback = useFreshTick(callback);

  const closerFn = useCallback(
    (...args: unknown[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      timer.current = setTimeout(() => {
        freshCallback?.apply(_this.current, args);
      }, delay);
    },
    [_this, delay, timer, freshCallback]
  );

  useEffectToRun(() => {
    debounce.current = closerFn;
    options?.immediate && closerFn();
  }, [closerFn, options?.immediate]);

  const returnValue = useMemo(() => debounce.current, [debounce]);

  return returnValue;
}
