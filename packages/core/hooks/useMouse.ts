import { useCallback, useState } from "react";
import { useDidMount } from "./useDidMount";

type MouseData = {
  clientX: number;
  clientY: number;
  movementX: number;
  movementY: number;
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  x: number;
  y: number;
};

const defaultData = {
  clientX: 0,
  clientY: 0,
  movementX: 0,
  movementY: 0,
  offsetX: 0,
  offsetY: 0,
  pageX: 0,
  pageY: 0,
  screenX: 0,
  screenY: 0,
  x: screenX,
  y: screenY,
};

function getMousePositionFromEvent(event: MouseEvent): MouseData {
  const {
    screenX,
    screenY,
    movementX,
    movementY,
    pageX,
    pageY,
    clientX,
    clientY,
    offsetX,
    offsetY,
  } = event;

  return {
    clientX,
    clientY,
    movementX,
    movementY,
    offsetX,
    offsetY,
    pageX,
    pageY,
    screenX,
    screenY,
    x: screenX,
    y: screenY,
  };
}

/**
 * useMouse
 * @description 返回当前鼠标移动的位置和坐标数据
 * @returns {MouseData}
 */
export function useMouse(): MouseData {
  const [mouseData, setMouseData] = useState<MouseData>(defaultData);

  const handler = useCallback((event: MouseEvent) => {
    const data = getMousePositionFromEvent(event);
    setMouseData(data);
  }, []);

  useDidMount(() => {
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  });

  return mouseData;
}
