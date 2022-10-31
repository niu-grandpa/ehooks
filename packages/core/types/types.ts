export type CallbackOfAnyType = () => any;
export type CallbackWithNoArguments = () => void;
export type CallbackWithArguments<T = unknown> = (...args: T[]) => void;
export type Key = string | number | symbol;
