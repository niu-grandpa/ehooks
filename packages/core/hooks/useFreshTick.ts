import { CallbackWithArguments } from "../types";
import { useFreshRef } from "./useFreshRef";

/**
 * useFreshTick
 * @description 将函数包装在ref里调用
 *
 * @param callback 组件挂载时调用
 * @returns 返回一个新的回调函数
 */
export function useFreshTick<T>(
  callback: CallbackWithArguments<T>
): CallbackWithArguments<T> {
  const callbackRef = useFreshRef(callback);
  const tick = (...args: T[]) => {
    if (typeof callbackRef.current !== "function") return;
    callbackRef.current(...args);
  };
  return tick;
}
