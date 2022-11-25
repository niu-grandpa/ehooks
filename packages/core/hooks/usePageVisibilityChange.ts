import { useFreshRef } from "./useFreshRef";
import { useGlobalObjectEventListener } from "./useGlobalObjectEventListener";

/**
 * usePageVisibilityChange
 * @description 监听判断当前页面是否活动页面
 *
 * @param {Function} callback 页面切换时执行的回调函数
 */
export function usePageVisibilityChange(callback?: (show: boolean) => void) {
  const callbackRef = useFreshRef(callback);
  useGlobalObjectEventListener(
    document,
    "visibilitychange",
    () => {
      callbackRef.current?.(document.hidden);
    },
    false
  );
}
