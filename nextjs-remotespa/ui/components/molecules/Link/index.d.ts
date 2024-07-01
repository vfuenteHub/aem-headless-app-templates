import type { TypographyProps } from '@/components/atoms/Typography';
import * as React from 'react';
import type { UrlObject } from 'url';

type LinkHTMLAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  TypographyProps;

export type LinkProps = {
  href: string | UrlObject;
  underline?: 'always' | 'hover' | 'none';
} & LinkHTMLAttributes;

export default function Link(
  props: {
    children?: React.ReactNode;
    ref?: React.ForwardedRef<LinkHTMLAttributes> | unknown;
  } & LinkProps
): JSX.Element;
