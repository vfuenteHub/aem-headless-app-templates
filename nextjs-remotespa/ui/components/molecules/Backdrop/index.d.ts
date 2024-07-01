import * as React from 'react';

type BackdropHTMLAttributes = React.AllHTMLAttributes<unknown>;

export type BackdropProps = {
  component?: React.ElementType;
  open: boolean;
  zIndex?: number;
} & BackdropHTMLAttributes;

export default function Backdrop(
  props: {
    children?: React.ReactNode;
    ref?: React.ForwardedRef<BackdropHTMLAttributes> | unknown;
  } & BackdropProps
): JSX.Element;
