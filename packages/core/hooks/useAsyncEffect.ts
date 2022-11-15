import React, { useCallback, useEffect, useRef } from "react";
import { useFreshRef } from "./useFreshRef";
import { useGetIsMounted } from "./useGetIsMounted";
import { useWillUnmount } from "./useWillUnmount";

type AsyncEffect<T> = (isCallComplete: () => boolean) => Promise<T>;
type CleanupFn<T> = (result: T | void) => void;

/**
 * useAsyncEffect
 * @description
 *
 * @param {AsyncEffect<T>} effect
 * @param {React.DependencyList} deps
 * @param {CleanupFn} cleanup
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
