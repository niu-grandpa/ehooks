import { RouteProps } from "./Route";

export type RouteMap = Record<string, RouteProps>;

export const routeMap = () => ({
  get: {},
  type: "hash",
  get map() {
    return this.get as RouteMap;
  },
  get isHash() {
    return this.type === "hash";
  },
  collect(obj: RouteMap) {
    this.get = Object.assign({}, obj);
  },
});

export const pushState = (data: unknown, title: string, url?: string) => {
  history.pushState(data, title, url);
};

export const replaceState = (data: unknown, title: string, url?: string) => {
  history.replaceState(data, title, url);
};

export const getLocation = (type: "pathname" | "hash") => {
  return location[type];
};

export const checkLocation = () => {
  //
};
