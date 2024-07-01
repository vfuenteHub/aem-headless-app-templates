import * as React from 'react';

type TypographyHTMLAttributes = React.AllHTMLAttributes<unknown>;

export type TypographyProps = {
  component?: React.ElementType;
} & TypographyHTMLAttributes;

export default function Typography(
  props: {
    children?: React.ReactNode;
    ref?: React.ForwardedRef<TypographyHTMLAttributes> | unknown;
  } & TypographyProps
): JSX.Element;
