import { useEffect } from "react";
import { CallbackWithNoArguments } from "../types/types";

/**
 * useOnceEffect
 * @description 函数仅会触发一次，即使依赖发生变化。
 *
 * @param {Function} effect 回调
 * @param {React.DependencyList} deps 函数依赖项
 * @return {Boolean} 返回一个布尔值，表示是否已经调用。
 */
export function useOnceEffect(
  effect: CallbackWithNoArguments,
  deps?: React.DependencyList
): boolean {
  let isCall = false;

  useEffect(() => {
    if (!isCall) {
      isCall = true;
      return effect && effect();
    }
  }, deps || []);

  return isCall;
}
