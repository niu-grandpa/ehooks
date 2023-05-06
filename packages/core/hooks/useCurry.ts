import { useCallback } from "react";
import { CallbackWithArguments } from "../types";

/**
 * useCurry
 * @description 柯里化后的函数会返回一个新函数，当传递给新函数的参数数量达到
 * 原函数参数数量时就会调用它。
 *
 * @param callback 需要柯里化的函数
 * @returns {Function}
 */
export function useCurry<T = CallbackWithArguments>(
  callback: (...params: T[]) => any
): CallbackWithArguments {
  const curried = useCallback((...args: T[]) => {
    if (args.length >= callback.length) return callback(...args);
    return (...args2: T[]) => curried(...args, ...args2);
  }, []);
  return curried;
}
