import { useCallback, useMemo, useState } from "react";
import { type RefElementOrNull } from "../types";

/**
 * useRefElement
 * @description 通过回调的方式间接设置元素引用值
 * @returns 返回一个变量引用元素和一个设置引用元素的回调
 */
export function useRefElement<T>(): [
  RefElementOrNull<T>,
  (element: RefElementOrNull<T>) => void
] {
  const [refElement, setRefElement] = useState<RefElementOrNull<T>>(null);

  const ref = useCallback((element: RefElementOrNull<T>) => {
    setRefElement(element);
  }, []);

  return useMemo(() => [refElement, ref], [refElement, ref]);
}
