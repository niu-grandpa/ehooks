import { useEffect } from "react";

export function useDidMount(fn: () => any, deps?: any[]) {
  useEffect(() => {
    const cleanup = fn();
    return cleanup;
  }, deps);
}
