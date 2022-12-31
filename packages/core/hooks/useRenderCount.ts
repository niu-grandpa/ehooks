import { useFreshRef } from "./useFreshRef";

/**
 * useRenderCount
 * @returns {number} 获取当前组件渲染次数
 */
export function useRenderCount(): number {
  const count = useFreshRef(0);
  return ++count.current;
}
