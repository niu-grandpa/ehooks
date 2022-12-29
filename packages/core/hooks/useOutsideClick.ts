import { MutableRefObject, useCallback } from "react";
import { useDidUpdate } from "./useDidUpdate";
import { useFreshRef } from "./useFreshRef";
import { useGlobalObjectEventListener } from "./useGlobalObjectEventListener";

/**
 * useOutsideClick
 * @description 检查click事件是否发生在ref元素之外，常用于下拉菜单、模态框的显示隐藏等等
 * @param {object} ref 需要监听 outside click 的元素
 * @param {Function} callback outside click时触发的回调函数
 * @param {boolean} isActive 是否激活事件监听
 * @example
 * ```tsx
 * import { useOutsideClick } from "@/hooks/useOutsideClick";
 * import { useRef } from "react";
 *
 * const Component = () => {
 *  const ref = useRef<HTMLDivElement>(null);
 *  const [isOpen, setIsOpen] = useState(false);
 *  const handleOutsideClick = () => setIsOpen(false);
 *  useOutsideClick(ref, handleOutsideClick);
 *  return (
 *   <div {...{ref}}>
 *    <button onClick={() => setIsOpen(true)}>Open</button>
 *    {isOpen && <div>Inside</div>}
 *   </div>
 * );
 * }
 * ```
 */
export function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  callback: (e: MouseEvent) => void,
  isActive: boolean = true
) {
  const callbackRef = useFreshRef(callback);

  const handler = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callbackRef.current(e);
      }
    },
    [ref]
  );

  useDidUpdate(() => {
    useGlobalObjectEventListener(document, "click", handler, true, isActive);
    useGlobalObjectEventListener(
      document,
      "touchstart",
      handler,
      true,
      isActive
    );
  }, [isActive, handler, ref]);
}
