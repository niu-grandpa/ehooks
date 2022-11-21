import { useCallback } from "react";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

export function useSimpleRouter() {
  const onHashChange = useCallback((e: HashChangeEvent) => {
    const { hash, pathname } = window.location;
  }, []);

  useDidMount(() => {
    window.addEventListener("hashchange", onHashChange);
  });

  useWillUnmount(() => {
    window.removeEventListener("hashchange", onHashChange);
  });
}
