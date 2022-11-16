import React, { useCallback, useEffect, useRef } from "react";
import { useFreshRef } from "./useFreshRef";
import { useGetIsMounted } from "./useGetIsMounted";
import { useWillUnmount } from "./useWillUnmount";

type AsyncEffect<T> = (isCallComplete: () => boolean) => Promise<T>;
type CleanupFn<T> = (result: T | void) => void;

/**
 * useAsyncEffect
 * @description 在 useEffect 中能够使用异步函数
 *
 * @param {AsyncEffect<T>} effect 异步回调
 * @param {React.DependencyList} deps 依赖项，随着依赖变化自动更新副作用函数
 * @param {CleanupFn} cleanup 组件卸载前的副作用清除函数，
 * 通过其回调参数能够取到最新一次异步请求结果
 * 
 * @example
 * ```ts
  useAsyncEffect(async (isCallComplete) => {
    const data = await requset('url');
    if(isCallComplete()) {
      const data2 = await requset('url');
      // ...
    }
  }, 
  [...deps], 
  (result) => {
     // do something
  });
 * ```
 */
export function useAsyncEffect<T extends void>(
  effect: AsyncEffect<T>,
  deps: React.DependencyList,
  cleanup?: CleanupFn<T>
) {
  const lastCallId = useRef(0);
  const newEffect = useFreshRef(effect);
  const result = useRef<T | null>(null);
  const isMounted = useGetIsMounted();

  const callAsyncFn = useCallback(async () => {
    const callId = ++lastCallId.current;
    const isCallComplete = () => callId === lastCallId.current && isMounted();
    try {
      return await newEffect.current(isCallComplete);
    } catch (error) {
      throw error;
    }
  }, [...deps, isMounted, lastCallId.current]);

  useEffect(() => {
    callAsyncFn().then((res: T) => {
      result.current = res;
    });
  }, [callAsyncFn]);

  useWillUnmount(() => {
    cleanup?.(result.current!);
    result.current = null;
  });
}
