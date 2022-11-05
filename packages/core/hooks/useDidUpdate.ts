import React, { useEffect, useMemo, useRef } from "react";
import { CallbackWithNoArguments } from "../types/types";
import { useDidMount } from "./useDidMount";
import { useWillUnmount } from "./useWillUnmount";

/**
 * useDidUpdate
 * @description 组件更新时执行。也可以增加更新依赖项，当依赖变化时自动执行更新。
 *
 * @param {Function} update 执行的更新函数
 * @param {Array|undefined} conditions 更新依赖项
 */
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
