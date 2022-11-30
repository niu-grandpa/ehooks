import { useMemo } from "react";
import { CallbackWithNoArguments } from "../types";
import { useDidMount } from "./useDidMount";
import { useDidUpdate } from "./useDidUpdate";
import { useFreshRef } from "./useFreshRef";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useTimer
 * @description 用于选择使用timeout或interval定时器的hook
 *
 * @param {string} type 定时器类型
 * @param {Function} callback 定时器执行的回调
 * @param {number} timeout 调用的时间间隔（毫秒）
 * @param {boolean} when 是否执行该 hook
 * @param {boolean} immediate 是否立即执行一次定时器回调
 */
export function useTimer(
  type: "timeout" | "interval",
  callback: CallbackWithNoArguments,
  timeout: number = 0,
  when: boolean = true,
  immediate: boolean = false
) {
  const intervalRef = useFreshRef(callback);
  const timerType = useMemo(
    () => (type === "interval" ? "setInterval" : "setTimeout"),
    [type]
  );

  const timerHandler = () => intervalRef.current?.();

  let timer: number | undefined;

  useDidMount(() => {
    intervalRef.current = callback;
  });

  useDidUpdate(() => {
    if (when) {
      immediate && timerHandler();
      timer = window[timerType](timerHandler, timeout);
    }
  }, [when, immediate, timer, timerHandler, timerType]);

  useWillUnmount(() => {
    window.clearInterval(timer);
  });
}
