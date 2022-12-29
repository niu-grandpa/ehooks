import { noop } from "@/../utils";
import { useCallback, useEffect } from "react";
import { ListenerOptions } from "../types";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

/**
 * useGlobalObjectEventListener
 * @description 为全局对象 Window 或 Document 添加事件监听器
 *
 * @param {Window | Document} globalObject 全局对象
 * @param {WindowEventMap} eventName 事件名
 * @param {Function} callback 事件监听函数
 * @param {ListenerOptions} listenerOptions 监听器选项
 * @param {boolean} isActive 是否激活事件监听
 * @param {boolean} isLayoutEffect  是否使用 useLayoutEffect 为对象添加事件，默认useEffect
 */
export function useGlobalObjectEventListener<T extends Window | Document>(
  globalObject: T,
  eventName: keyof WindowEventMap,
  callback: EventListener,
  listenerOptions: ListenerOptions = {},
  isActive: boolean = true,
  isLayoutEffect: boolean = false
): void {
  const useEffectToRun = isLayoutEffect ? useIsomorphicEffect : useEffect;
  const listener = useCallback(
    (evt: Event) => {
      if (!isActive || typeof callback !== "function") return;
      callback(evt);
    },
    [isActive, callback]
  );

  useEffectToRun(() => {
    if (typeof globalObject !== "undefined") {
      globalObject.addEventListener(eventName, listener, listenerOptions);
      return () => {
        globalObject.removeEventListener(eventName, listener, listenerOptions);
      };
    } else {
      console.error(
        "[useGlobalObjectEventListener] can't add event handler for undefined "
      );
    }
    return noop;
  }, [globalObject, eventName, listener, listenerOptions]);
}
