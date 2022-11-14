import { useCallback, useMemo, useRef } from "react";

type UseCounterActionType = "increase" | "decrease" | "multiply" | "division";
type UseCounter = [
  number,
  (action: UseCounterActionType, step?: number) => void
];

/**
 * useCounter
 * @description 一个加减乘除计数器
 *
 * @param {Number} initValue 初始值
 * @example
 * ```ts
   const [counter, setCounter] = useCounter(0);
   setCounter('increase', 1);
   setCounter('decrease', 1);
   setCounter('multiply', 1);
   setCounter('division', 1);
 * ``` 
 */
export function useCounter(initValue: number): UseCounter {
  const value = useRef<number>(initValue);

  const setCounter = useCallback((action: UseCounterActionType, step = 1) => {
    if (action === "increase") increase(step);
    else if (action === "decrease") decrease(step);
    else if (action === "division") division(step);
    else if (action === "multiply") multiply(step);
  }, []);

  const increase = useCallback(
    (step: number) => {
      value.current += step;
    },
    [value.current]
  );

  const decrease = useCallback(
    (step: number) => {
      value.current -= step;
    },
    [value.current]
  );

  const multiply = useCallback(
    (step: number) => {
      value.current *= step;
    },
    [value.current]
  );

  const division = useCallback(
    (step: number) => {
      value.current /= step;
    },
    [value.current]
  );

  const returnValue = useMemo<UseCounter>(
    () => [value.current, setCounter],
    [value.current]
  );

  return returnValue;
}
