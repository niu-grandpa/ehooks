import { useFreshTick } from "./useFreshTick";
import { useGlobalObjectEventListener } from "./useGlobalObjectEventListener";

/**
 * useOnWindowScroll
 * @description 该钩子在页面滚动时触发
 * @param callback 滚动执行的回调函数
 * @param isActive 是否设置事件监听
 * @param isLayoutEffect 是否使用useLayoutEffect设置事件监听
 */
export function useOnWindowScroll(
  callback: EventListener,
  isActive: boolean = true,
  isLayoutEffect: boolean = false
) {
  const freshCallback = useFreshTick(callback);
  useGlobalObjectEventListener(
    global.window,
    "scroll",
    freshCallback,
    { passive: true },
    isActive,
    isLayoutEffect
  );
}
