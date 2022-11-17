import {
  MutableRefObject,
  Ref,
  RefCallback,
  useCallback,
  useMemo,
} from "react";

type PossibleRef<T> = Ref<T> | undefined;

/**
 * useForkRef
 * @description 将两个 react ref 合并在一起赋值
 *
 * @param {PossibleRef<T>} refA 
 * @param {PossibleRef<T>} refB
 * @return 返回一个用于赋值的函数
 * @example
 * ```ts
  const refA = useRef(1);
  const refB = useRef(2);
  const forkRef = useForkRef(refA, refB);
  forkRef(3); // refA.current & refA.current -> 3
 * ```
 */
export function useForkRef<T>(
  refA: PossibleRef<T>,
  refB: PossibleRef<T>
): RefCallback<T> | null {
  const returnVal = useMemo(
    () => (value: T) => {
      setRefVal(refA, value);
      setRefVal(refB, value);
    },
    [refA, refB]
  );

  return returnVal;
}

const setRefVal = useCallback(<T>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== undefined && ref !== null) {
    (ref as MutableRefObject<T>).current = value;
  }
}, []);
