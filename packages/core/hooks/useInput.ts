import { ChangeEvent, useCallback, useState } from "react";
import { useDidUpdate } from "./useDidUpdate";

type InputDefaultValue = string | number | readonly string[] | undefined;

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

type InputHandler<T> = {
  /**
   * 当前的输入值
   */
  value: T;
  /**
   * 输入框发生改变时的函数
   * @param event 输入框事件
   */
  onChange: (event: InputChangeEvent) => void;
};

type Options<T> = {
  /**
   * validate
   * 该方法用于阻止输入值的更新
   * @param current 当前值
   * @param newValue 最新值
   * @returns {boolean} 是否更新输入值
   */
  validate?: (current: T, newValue: T) => boolean;
};

/**
 * useInput
 *
 * @description
 * @param {unknown} initValue 初始值
 * @param {Options} options 选项
 * @returns {InputHandler} 返回输入框change事件和当前值
 */
export function useInput<T extends InputDefaultValue = string>(
  initValue: T,
  options: Options<T> = {}
): InputHandler<T> {
  const [value, setValue] = useState<T>(initValue);

  const onChange = useCallback(
    (event: InputChangeEvent) => {
      const newValue = event.target.value as T;
      let shouldUpdate = true;
      if (typeof options.validate === "function") {
        shouldUpdate = options.validate(value, newValue);
      }
      if (!shouldUpdate) return;
      setValue(newValue);
    },
    [value, options]
  );

  useDidUpdate(() => {
    setValue(initValue);
  }, [initValue]);

  return {
    value,
    onChange,
  };
}
