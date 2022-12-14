import { ReactElement, ReactNode } from "react";

export type CallbackOfAnyType = () => any;
export type CallbackWithNoArguments = () => void;
export type CallbackWithArguments<T = unknown> = (...args: T[]) => void;
export type Key = string | number | symbol;
export type UnknownFunction = (...args: unknown[]) => unknown;
export type ReactElm = ReactElement | JSX.Element | ReactNode | string | number;
export type RefElementOrNull<T> = T | null;

export type ListenerOptions =
  | AddEventListenerOptions
  | EventListenerOptions
  | boolean
  | {
      capture?: boolean;
      once?: boolean;
      passive?: boolean;
      signal?: AbortSignal;
    };
