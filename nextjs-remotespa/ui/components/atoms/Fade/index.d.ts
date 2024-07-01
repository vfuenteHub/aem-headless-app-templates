import * as React from 'react';
import { type TransitionProps } from 'react-transition-group/Transition';

export type FadeProps = {
  in: boolean;
  timeout?: number;
} & TransitionProps;

export default function Fade(
  props: {
    children?: React.ReactNode;
    ref?: React.ForwardedRef<unknown> | unknown;
  } & FadeProps
): JSX.Element;
