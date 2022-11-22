import { ReactElement, ReactNode } from "react";

export type CallbackOfAnyType = () => any;
export type CallbackWithNoArguments = () => void;
export type CallbackWithArguments<T = unknown> = (...args: T[]) => void;
export type Key = string | number | symbol;
export type UnknownFunction = (...args: unknown[]) => unknown;
export type ReactElm = ReactElement | JSX.Element | ReactNode | Key;
