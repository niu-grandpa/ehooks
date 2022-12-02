import { useEffect } from "react";
import {
  type CallbackWithArguments,
  type ListenerOptions,
  type RefElementOrNull,
} from "../types";
import { useFreshTick } from "./useFreshTick";
import { useIsomorphicEffect } from "./useIsomorphicEffect";
import { useRefElement } from "./useRefElement";

/**
 * useEventListenerRef
 * @description 类似一个占位器，先提前设置好事件监听器，并且该hook会返回用于设置element的函数，
  在需要用到的地方添加元素，即把事件监听到该元素上
 *
 * @param {string} eventName 事件名
 * @param {Function} callback 事件回调
 * @param {ListenerOptions} listenerOptions 原生事件监听选项
 * @param {boolean} isLayoutEffect 是否使用 useLayoutEffect 添加事件监听
 * @returns 返回一个回调用于添加需要进行事件监听的元素
 */
export function useEventListenerRef(
  eventName: string,
  callback: CallbackWithArguments,
  listenerOptions: ListenerOptions = {},
  isLayoutEffect: boolean = false
): (element: RefElementOrNull<HTMLElement>) => void {
  const callbackFresh = useFreshTick(callback);
  const useEffectToRun = isLayoutEffect ? useIsomorphicEffect : useEffect;
  const [element, setElementRef] = useRefElement<HTMLElement>();

  useEffectToRun(() => {
    element?.addEventListener(eventName, callbackFresh, listenerOptions);
    return () => {
      element?.removeEventListener(eventName, callbackFresh, listenerOptions);
    };
  });

  return setElementRef;
}
