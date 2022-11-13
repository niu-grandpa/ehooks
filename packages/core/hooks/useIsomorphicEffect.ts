import { useEffect, useLayoutEffect } from "react";

/**
 * useIsomorphicEffect
 * @description 当全局执行作用域不是 window 时，切换为 useEffect，反之使用 useLayoutEffect。
 *
 * @param {Function} callback 挂载时调用的回调函数
 */
export const useIsomorphicEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
