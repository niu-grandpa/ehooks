import { useEffect } from "react";
import { CallbackWithNoArguments } from "../types";

/**
 * useDidMount
 * @description 该函数会在组件挂载时触发。
 *
 * @param {Function} effect 执行的副作用函数
 */
export function useDidMount(effect: CallbackWithNoArguments): void {
  useEffect(() => {
    const cleanup = effect();
    return cleanup;
  }, []);
}
