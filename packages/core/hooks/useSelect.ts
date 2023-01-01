import { useCallback, useMemo, useState } from "react";

type SelectHandler<T> = {
  index: number;
  item: T;
  setIndex: (newIndex: number) => void;
  setItem: (newItem: T) => void;
};

/**
 * useSelect
 * @description 帮助从列表中选择元素变得更简单
 * @param list 列表源对象
 * @param index 选择的元素索引
 * @returns {object}
 */
export function useSelect<T>(list: T[], index: number): SelectHandler<T> {
  const [selectedIdx, setSelectedIdx] = useState(index);

  const setItem = useCallback(
    (item: T) => {
      setSelectedIdx(list.indexOf(item));
    },
    [list]
  );

  return useMemo(
    () => ({
      index: selectedIdx,
      item: list[selectedIdx],
      setIndex: setSelectedIdx,
      setItem,
    }),
    [list, selectedIdx, selectedIdx, setSelectedIdx, setItem]
  );
}
