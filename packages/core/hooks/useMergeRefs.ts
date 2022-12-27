import { MutableRefObject, Ref, RefCallback, useMemo } from "react";

type PossibleRef<T> = Ref<T> | undefined;

/**
 * useMergeRefs
 * 把多个ref合并成一个
 * @param {Array<PossibleRef<T>>} refs 存放ref的数组
 * @returns {RefCallback<T> | null} 返回用于设置ref值的函数
 */
export function useMergeRefs<T>(
  ...refs: Array<PossibleRef<T>>
): RefCallback<T> | null {
  const returnFn = useMemo(() => {
    return refs.every((ref) => ref === null)
      ? null
      : (refValue: T) => {
          for (const ref of refs) {
            setRef(ref, refValue);
          }
        };
  }, [refs]);
  return returnFn;
}

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== undefined || ref !== null) {
    (ref as MutableRefObject<T>).current = value;
  }
}
