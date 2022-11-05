import React, { useEffect, useMemo, useRef } from "react";
import { CallbackWithNoArguments } from "../types/types";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

export function useDidUpdate(
  update: CallbackWithNoArguments,
  conditions?: React.DependencyList
) {
  const hasMounted = useRef<boolean>(false);

  const deps = useMemo(() => {
    if (conditions && !Array.isArray(conditions)) {
      return [conditions];
    } else if (Array.isArray(conditions) && !conditions.length) {
      console.warn(
        "用空数组作为依赖会导致 `useDidUpdate` 不会执行, 请使用 `undefined` 或 数组增加依赖项。"
      );
    }
    return conditions;
  }, [conditions]);

  useEffect(() => {
    if (hasMounted.current) {
      update();
    }
  }, deps);

  useDidMount(() => {
    hasMounted.current = true;
  });

  useWillUnmount(() => {
    hasMounted.current = false;
  });
}
