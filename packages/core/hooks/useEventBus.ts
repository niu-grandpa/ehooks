import { useCallback, useMemo } from "react";
import { CallbackWithArguments } from "../types/types";

type OnRegisterEvents = (
  eventName: string,
  callback: CallbackWithArguments
) => void;
type OnOffEvents = (eventName: string) => boolean | undefined;
type OnTriggerEvents = (eventName: string | string[], msg?: unknown) => void;
type UseEventBus = Partial<{
  on: OnRegisterEvents;
  off: OnOffEvents;
  emit: OnTriggerEvents;
}>;
type EventStack = Set<CallbackWithArguments>;

/**
 * useEventBus
 * @description 注册一个或多个自定义事件，并在某个合适的时机统一触发。
 * 同一个事件名下可以注册多个事件
 *
 * @example
 * ```ts
 *  const { myEvent, triggerEvent } = useEventBus();
 *  myEvent("A", (msg: any) => {
 *    console.log('接收 triggerEvent 的参数' + msg);
 *  });
 *  triggerEvent("A", "参数：发送给A事件");
 *  // triggerEvent([], "发送给所有注册的事件");
 *  // triggerEvent(["A", "B", "C"], "发送给多个事件");
 * ```
 * @returns {UseEventBus}
 */
export function useEventBus(): UseEventBus {
  const bus = new Map<string, EventStack>();

  const on = useCallback(
    (name: string, callback: CallbackWithArguments) => {
      if (!hasEvent(name)) {
        bus.set(name, new Set());
      }
      const stack = getEvent(name);
      stack?.add(callback);
    },
    [bus]
  );

  const off = useCallback(
    (eventName: string) => {
      if (!hasEvent(eventName)) {
        console.error(`the event "${eventName}" didn't in current eventBus`);
        return;
      }
      return bus.delete(eventName);
    },
    [bus]
  );

  const emit = useCallback(
    (name: string | string[], msg?: unknown) => {
      if (typeof name === "string") {
        const events = getEvent(name);
        runTheEvents(events, msg);
      } else if (Array.isArray(name)) {
        if (!name.length) {
          bus.forEach((events) => runTheEvents(events, msg));
        } else {
          name.forEach((n) => runTheEvents(getEvent(n)), msg);
        }
      }
    },
    [bus]
  );

  const getEvent = (name: string) => bus.get(name);
  const hasEvent = (name: string) => bus.has(name);

  const runTheEvents = (events: EventStack | undefined, ...args: unknown[]) => {
    if (!events) return;
    events.forEach((event) => event(args));
  };

  const returnVal = useMemo<UseEventBus>(
    () => ({ on, off, emit }),
    [on, off, emit]
  );
  return returnVal;
}
