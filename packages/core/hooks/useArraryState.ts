import { useCallback, useMemo, useState } from "react";

export type UseArrayStateControls = {};

export function useArrayState<T>(initValues: T[] = []) {
  const [array, setArray] = useState<T[]>(initValues);

  const pop = useCallback(() => {
    setArray(array.slice(0, array.length - 1));
  }, [array]);

  const push = useCallback(
    (value: T) => {
      setArray([...array, value]);
    },
    [array]
  );

  const shift = useCallback(() => {
    setArray(array.slice(1));
  }, [array]);

  const unshift = useCallback(
    (value: T) => {
      setArray([value, ...array]);
    },
    [array]
  );

  const reverse = useCallback(() => {
    setArray(array.slice().reverse());
  }, [array]);

  const fill = useCallback(
    (value: T, start?: number, end?: number) => {
      setArray(array.slice().fill(value, start, end));
    },
    [array]
  );

  const concat = useCallback(
    (newVal: T[]) => {
      setArray([...array, ...newVal]);
    },
    [array]
  );

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const controls = useMemo(
    () => ({
      push,
      pop,
      shift,
      unshift,
      clear,
      reverse,
      fill,
      concat,
    }),
    [push, pop, shift, unshift, clear, reverse, fill, concat]
  );

  const returnValue = useMemo(() => [array, controls], [array, controls]);

  return returnValue;
}
