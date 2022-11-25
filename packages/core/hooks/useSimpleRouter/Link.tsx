import React from "react";
import { memo, ReactNode, useCallback, MouseEvent } from "react";

type LinkProps = {
  to: string;
  children?: ReactNode;
  state?: Record<string, unknown>;
};

export const Link = memo((props: LinkProps) => {
  const onLinkClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [props]
  );
  return (
    <a href="#!" onClick={onLinkClick}>
      {props?.children}
    </a>
  );
});
