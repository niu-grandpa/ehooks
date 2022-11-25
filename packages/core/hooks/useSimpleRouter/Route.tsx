import React from "react";
import { ReactNode } from "react";
import { memo } from "react";

export type RouteProps = {
  path: string;
  index?: boolean;
  replace?: boolean;
  component: ReactNode;
  /**指定匹配时是否区分大小写 */
  caseSensitive?: boolean;
};

export const Route = memo((props: RouteProps) => <></>);
