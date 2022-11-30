import { useCallback, useState } from "react";
import { useTimer } from "./useTimer";

type CountdownOptions = Partial<{
  /**每次进行计时都会调用 */
  onDown: (restTime: number, newTime: Date) => void;
  /**计时结束时调用 */
  onEnd: (newTime: Date) => void;
}>;

/**
 * useCountdown
 * @description 一个简易的倒计时hook，直到给定的结束时间才停止计时
 *
 * @param {Date} endTime 计时结束时间
 * @param {CountdownOptions} options 计时选项
 * @param {number} interval 计时间隔 （单位ms）
 * @returns 返回从计时到结束所需的次数
 */
export function useCountdown(
  endTime: Date,
  options: CountdownOptions,
  interval: number = 1000
) {
  const { onDown, onEnd } = options;

  const [time, setTime] = useState<Date>(() => new Date());

  const restTime = endTime.getTime() - time.getTime();
  const count = restTime ? Math.ceil(restTime / interval) : 0;
  const timeout = count ? interval : undefined;

  const onTick = useCallback(() => {
    const newTime = new Date();
    if (newTime > endTime) {
      onEnd?.(newTime);
      setTime(endTime);
      return;
    }
    onDown?.(restTime, newTime);
    setTime(newTime);
  }, [endTime, restTime, onEnd, onDown]);

  useTimer("interval", onTick, timeout, true, true);

  return count;
}
