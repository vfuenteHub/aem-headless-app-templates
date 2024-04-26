import * as React from 'react';

export type Id = number;

export interface Item {
  id: Id;
  [key: string]: unknown;
}

export type Store = boolean;

export function show(value?: Item): void;
export function hide(value?: Id): void;
export function clear(): void;

type StoreReturns = {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot(): Store;
  getServerSnapshot(): Store;
};

export default StoreReturns;
