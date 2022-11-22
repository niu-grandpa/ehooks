import { UnknownFunction } from "../types";

/**
 * useDebounce
 *
 * @description 限制在n秒后执行一次事件函数，如果n秒内再次执行则重新进入等待时间。
 */
export function useDebounce<T extends UnknownFunction>(
  callback: T,
  wait?: number,
  options?: {}
) {
  // TODO
}
