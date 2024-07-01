import * as React from 'react';
import type { Id, Item, Store } from './store';

type useLoadersReturns = {
  state: Store;
  show(value?: Item): void;
  hide(value?: Id): void;
  clear(): void;
};

export function useLoaders(): useLoadersReturns;

export type LoadersProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function Loaders(props: LoadersProps): JSX.Element;
