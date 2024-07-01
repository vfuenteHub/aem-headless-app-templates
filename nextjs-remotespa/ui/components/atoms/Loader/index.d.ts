import * as React from 'react';

type LoaderHTMLAttributes = React.AllHTMLAttributes<unknown>;

export type LoaderProps = {
  component?: React.ElementType;
} & LoaderHTMLAttributes;

export default function Loader(
  props: {
    children?: React.ReactNode;
  } & LoaderProps
): JSX.Element;
