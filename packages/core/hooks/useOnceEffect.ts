import { useEffect, useRef } from "react";
import { CallbackWithNoArguments } from "../types/types";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useOnceEffect
 * @description 函数仅会触发一次，即使依赖发生变化。
 *
 * @param {Function} effect 执行的副作用函数
 * @param {React.DependencyList} deps 函数依赖项
 * @return {Boolean} 返回一个布尔值，表示是否已经调用。
 */
export function useOnceEffect(
  effect: CallbackWithNoArguments,
  deps?: React.DependencyList
): boolean {
  const isCall = useRef<boolean>(false);
  const cleanup = useRef<CallbackWithNoArguments | void>();

  useEffect(() => {
    if (!isCall.current) {
      isCall.current = true;
      cleanup.current = effect && effect();
    }
  }, deps || []);

  useWillUnmount(() => {
    isCall.current = false;
    typeof cleanup.current === "function" && cleanup.current();
  });

  return isCall.current;
}
