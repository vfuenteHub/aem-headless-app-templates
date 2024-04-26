import type { TypographyProps } from '@/components/atoms/Typography';
import * as React from 'react';
import type { UrlObject } from 'url';

type LinkHTMLAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  TypographyProps;

export interface LinkProps extends LinkHTMLAttributes {
  href: string | UrlObject;
  underline?: 'always' | 'hover' | 'none';
}

export default function Link(
  props: {
    children?: React.ReactNode;
    ref?: React.ForwardedRef<LinkHTMLAttributes> | unknown;
  } & LinkProps
): JSX.Element;
