import { useEffect, useRef } from "react";
import { CallbackWithNoArguments } from "../types";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useEffectOnce
 * @description 函数仅会触发一次，即使依赖发生变化。
 *
 * @param {Function} effect 执行的副作用函数
 * @param {React.DependencyList} deps 函数依赖项
 * @return {Boolean} 返回一个布尔值，表示是否已经调用。
 */
export function useOnceEffect<T extends CallbackWithNoArguments>(
  effect: T,
  deps?: React.DependencyList
): boolean {
  const isCall = useRef<boolean>(false);
  const effectFn = useRef<T | null>(effect);
  const cleanup = useRef<T | void>();

  useDidMount(() => {
    effectFn.current = effect;
  });

  useEffect(() => {
    if (!isCall.current) {
      isCall.current = true;
      cleanup.current = effectFn.current?.();
    }
  }, deps || []);

  useWillUnmount(() => {
    isCall.current = false;
    cleanup.current?.();
    effectFn.current = null;
  });

  return isCall.current;
}
