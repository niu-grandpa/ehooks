import { useDidMount } from "./useDidMount";
import { useDidUpdate } from "./useDidUpdate";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useLifecycleLogger
 * @description 当组件生命周期执行时，打印输出当前组件名和参数
 * @param componentName
 * @param args
 */
export function useLifecycleLogger(
  componentName = "Component",
  ...args: unknown[]
) {
  useDidMount(() => {
    console.log(`${componentName} mounted`, ...args);
  });

  useDidUpdate(() => {
    console.log(`${componentName} updated`, ...args);
  });

  useWillUnmount(() => {
    console.log(`${componentName} unmounted`, ...args);
  });
}
