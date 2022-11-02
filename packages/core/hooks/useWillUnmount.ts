import { useEffect } from "react";
import { CallbackWithNoArguments } from "../types/types";

/**
 * useWillUnmount
 *
 * @description 在组件卸载前执行清除函数
 * @param {Function} cleanup
 * @return
 */
export function useWillUnmount(cleanup: CallbackWithNoArguments): void {
  useEffect(() => {
    return cleanup;
  }, []);
}
