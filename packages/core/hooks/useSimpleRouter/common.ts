/* eslint-disable no-restricted-globals */
import { RouteProps } from './Route';

export type RouteMap = Record<string, RouteProps>;

export const routeMap = () => ({
  get: {},
  type: 'hash',
  get map() {
    return this.get as RouteMap;
  },
  get isHash() {
    return this.type === 'hash';
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

export const getLocation = (type: 'pathname' | 'hash') => {
  return location[type];
};

export const checkLocation = {
  isMatchedLocation(to: string, target: string) {
    if (to !== target) {
      console.warn(`[useSimpleRouter] The destination location does not exist "${target}"`);
      return false;
    }
    return true;
  },
  isMatchedRoute(path: string, obj: RouteMap) {
    if (!(path in obj)) {
      console.warn(`[useSimpleRouter] No routes matched location "${path}"`);
      return false;
    }
    return true;
  },
  isCorrect(path: string) {
    if (!path.startsWith('/')) {
      console.warn(`[useSimpleRouter] The location must be preceded by a "/", example "/${path}"`);
      return false;
    }
    return true;
  },
};

export const normalizeLocation = (isHash: boolean, path: string) => {
  const url = path.split('');
  return isHash ? url.splice(1, 0, '#') && url.join('') : path;
};
