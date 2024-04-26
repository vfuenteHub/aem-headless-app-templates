import * as React from 'react';

type TypographyHTMLAttributes = React.AllHTMLAttributes<unknown>;

export interface TypographyProps extends TypographyHTMLAttributes {
  component?: React.ElementType;
}

export default function Typography(
  props: {
    children?: React.ReactNode;
    ref?: React.ForwardedRef<TypographyHTMLAttributes> | unknown;
  } & TypographyProps
): JSX.Element;
