import * as React from 'react';

type BackdropHTMLAttributes = React.AllHTMLAttributes<unknown>;

export interface BackdropProps extends BackdropHTMLAttributes {
  component?: React.ElementType;
  open: boolean;
  zIndex?: number;
}

export default function Backdrop(
  props: {
    children?: React.ReactNode;
    ref?: React.ForwardedRef<BackdropHTMLAttributes> | unknown;
  } & BackdropProps
): JSX.Element;
