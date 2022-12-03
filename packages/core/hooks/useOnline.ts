import { CallbackWithNoArguments } from "../types";
import { useFreshRef } from "./useFreshRef";
import { useGlobalObjectEventListener } from "./useGlobalObjectEventListener";

/**
 * useOnline
 * @description 该hook在浏览器联网或断网状态时执行
 *
 * @param callback 联网时执行的回调
 * @returns 返回当前是否处于联网状态
 */
export function useOnline(callback: CallbackWithNoArguments): boolean {
  const isOnline = useFreshRef(false);

  useGlobalObjectEventListener(window, "online", () => {
    isOnline.current = true;
    typeof callback === "function" && callback();
  });

  useGlobalObjectEventListener(
    window,
    "offline",
    () => (isOnline.current = false)
  );

  return isOnline.current;
}
