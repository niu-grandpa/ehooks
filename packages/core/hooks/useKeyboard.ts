import { doesIdentifierMatchKeyboardEvent } from "@/../utils/doesIdentifierMatchKeyboardEvent";
import { RefObject, useCallback, useEffect, useMemo } from "react";
import { useFreshTick } from "./useFreshTick";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

type Keys = (string | number)[] | string | number;

export type KeyEventTypes = "keyup" | "keydown" | "keypress";

export type KeyboardEventHandler = (event: KeyboardEvent) => void;

export type Options = {
  /**
   * 键盘事件类型
   */
  eventTypes?: KeyEventTypes[];
  /**
   * 是否为目标元素添加键盘监听事件
   */
  target?: RefObject<HTMLElement>;
  /**
   * 是否开启事件监听
   */
  isActive?: boolean;
  /**
   * 是否使用useLayoutEffect函数添加事件监听
   * @default useEffect
   */
  isLayoutEffect?: boolean;
};

const defaultOptions: Options = {
  isActive: true,
  isLayoutEffect: false,
  eventTypes: ["keydown"],
};

/**
 * useKeyboard
 *
 * @description
 * @param keys
 * @param callback
 * @param options
 */
export function useKeyboard(
  keys: Keys,
  callback: KeyboardEventHandler,
  options?: Options
): void {
  const keyList = useMemo(() => (Array.isArray(keys) ? keys : [keys]), [keys]);

  const internalOptions = useMemo(
    () => ({ ...defaultOptions, ...options }),
    [defaultOptions, options]
  );

  const { isActive, target, eventTypes, isLayoutEffect } = internalOptions;

  const useEffectToRun = isLayoutEffect ? useIsomorphicEffect : useEffect;

  const callbackRef = useFreshTick(callback);

  const setEventsByloop = useCallback(
    (
      type: "addEventListener" | "removeEventListener",
      target: HTMLElement | Window | null
    ) => {
      eventTypes?.forEach((event) => target?.[type](event, handler));
    },
    [eventTypes]
  );

  const handler = useCallback(
    (event: KeyboardEvent) => {
      const isMatch = keyList.some((key) =>
        doesIdentifierMatchKeyboardEvent(event, key)
      );
      isMatch && callbackRef(event);
    },
    [keyList]
  );

  const bindEvent = useCallback(() => {
    if (isActive && typeof window !== "undefined") {
      if (!target) return;
      const elem = target.current;
      setEventsByloop("addEventListener", elem);
      return () => {
        setEventsByloop("removeEventListener", elem);
      };
    } else {
      setEventsByloop("addEventListener", window);
      return () => {
        setEventsByloop("removeEventListener", window);
      };
    }
  }, [isActive, target, setEventsByloop]);

  useEffectToRun(() => {
    const cleanup = bindEvent();
    return cleanup;
  }, [bindEvent]);
}
