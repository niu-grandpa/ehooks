import { UnknownFunction } from "../types/types";

/**
 * useDebounce
 *
 * @description 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。
 */
export function useDebounce<T extends UnknownFunction>(
  callback: T,
  wait?: number,
  options?: {}
) {
  // TODO
}
