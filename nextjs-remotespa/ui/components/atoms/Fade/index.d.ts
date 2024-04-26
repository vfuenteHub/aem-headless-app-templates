import * as React from 'react';
import { type TransitionProps } from 'react-transition-group/Transition';

export interface FadeProps extends TransitionProps {
  in: boolean;
  timeout?: number;
}

export default function Fade(
  props: {
    children?: React.ReactNode;
    ref?: React.ForwardedRef<unknown> | unknown;
  } & FadeProps
): JSX.Element;
