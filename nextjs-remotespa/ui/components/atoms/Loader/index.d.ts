import * as React from 'react';

type LoaderHTMLAttributes = React.AllHTMLAttributes<unknown>;

export interface LoaderProps extends LoaderHTMLAttributes {
  component?: React.ElementType;
}

export default function Loader(
  props: {
    children?: React.ReactNode;
  } & LoaderProps
): JSX.Element;
