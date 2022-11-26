import React from "react";
import { ReactNode } from "react";
import { memo } from "react";

export type RouteProps = {
  /**路由地址 */
  path: string;
  /**对应路由的页面标题 */
  title?: string;
  /**是否为首页 */
  index?: boolean;
  /**是否路由切换时不加入浏览器地址历史记录 */
  replace?: boolean;
  /**指定路由页面渲染的组件 */
  component: ReactNode;
  /**指定匹配时是否区分大小写 */
  caseSensitive?: boolean;
};

export const Route = memo((props: RouteProps) => <></>);
