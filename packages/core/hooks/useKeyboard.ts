import { doesIdentifierMatchKeyboardEvent } from "@/../utils/doesIdentifierMatchKeyboardEvent";
import { RefObject, useCallback, useEffect, useMemo } from "react";
import { useFreshTick } from "./useFreshTick";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

type Keys = (string | number)[] | string | number;

type KeyEventTypes = "keyup" | "keydown" | "keypress";

type KeyboardEventHandler = (event: KeyboardEvent) => void;

type Options = {
  eventTypes?: KeyEventTypes[];
  target?: RefObject<HTMLElement>;
  when?: boolean;
  useLayoutEffect?: boolean;
};

const defaultOptions: Options = {
  when: true,
  useLayoutEffect: false,
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

  const { when, target, eventTypes, useLayoutEffect } = internalOptions;

  const useEffectToRun = useLayoutEffect ? useIsomorphicEffect : useEffect;

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
    if (when && typeof window !== "undefined") {
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
  }, [when, target, setEventsByloop]);

  useEffectToRun(() => {
    const cleanup = bindEvent();
    return cleanup;
  }, [bindEvent]);
}
