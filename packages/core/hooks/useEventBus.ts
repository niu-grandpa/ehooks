import { useCallback, useMemo } from "react";
import { CallbackWithArguments } from "../types/types";

type OnRegisterEvents = (name: string, callback: CallbackWithArguments) => void;
type OnTriggerEvents = (name: string | string[], msg?: unknown) => void;
type UseEventBus = [OnRegisterEvents, OnTriggerEvents];
type EventStack = Set<CallbackWithArguments>;

/**
 * useEventBus
 * @description 注册一个或多个自定义事件，并在某个合适的时机统一触发
 *
 * @example
 * ```ts
 *  const [myListen, setMyListenRun] = useEventBus();
 *  myListen("A", (msg: any) => {
 *    console.log('接收 setMyListenRun 的参数' + msg);
 *  });
 *  setMyListenRun("A", "参数：发送给A事件");
 *  // setMyListenRun([], "发送给所有注册的事件");
 *  // setMyListenRun(["A", "B", "C"], "发送给多个事件");
 * ```
 * @returns {UseEventBus}
 */
export function useEventBus(): UseEventBus {
  const bus = new Map<string, EventStack>();

  const on: OnRegisterEvents = useCallback(
    (name: string, callback: CallbackWithArguments) => {
      if (!bus.has(name)) {
        bus.set(name, new Set());
      }
      const stack = bus.get(name);
      stack?.add(callback);
    },
    [bus]
  );

  const emit: OnTriggerEvents = useCallback(
    (name: string | string[], msg?: unknown) => {
      if (typeof name === "string") {
        const events = bus.get(name);
        runTheEvents(events, msg);
      } else if (Array.isArray(name)) {
        if (!name.length) {
          bus.forEach((events) => runTheEvents(events, msg));
        } else {
          name.forEach((n) => runTheEvents(bus.get(n)));
        }
      }
    },
    [bus]
  );

  const runTheEvents = (events: EventStack | undefined, ...args: unknown[]) => {
    if (!events) return;
    events.forEach((event) => event(args));
  };

  const returnVal = useMemo<UseEventBus>(() => [on, emit], [on, emit]);
  return returnVal;
}
