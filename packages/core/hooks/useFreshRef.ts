import { useEffect, useRef } from "react";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

/**
 * useFreshRef
 * @description 自动选择在 useLayoutEffect 或 useEffect 内对 useRef 进行赋值。
 *
 * @param {any} value 引用的原始值
 * @param {Boolean} isUseLayoutEffect 是否在 useLayoutEffect 内对引用值进行赋值
 * @returns 返回一个 React 的 ref 引用值。
 */
export function useFreshRef<T>(
  value: T,
  isUseLayoutEffect: boolean = false
): React.MutableRefObject<T> {
  const useEffectToRun = isUseLayoutEffect ? useIsomorphicEffect : useEffect;
  const ref = useRef<T>(value);

  useEffectToRun(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
