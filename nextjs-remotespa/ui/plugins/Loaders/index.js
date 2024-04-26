'use client';
import { useRouter } from 'next/router';
import * as React from 'react';
import store, { clear, hide, show } from './store';

const Context = React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'Loaders';
}

export const useLoaders = () => {
  const ctx = React.useContext(Context);

  if (!ctx) {
    throw new Error('useLoaders must be used within a Loaders provider');
  }

  return ctx;
};

const Loaders = ({ children, fallback: Cmp = <React.Fragment /> }) => {
  const { events } = useRouter();

  const syncStore = React.useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const state = React.useMemo(
    () => ({
      state: syncStore,
      show,
      hide,
      clear,
    }),
    [syncStore]
  );

  React.useEffect(() => {
    events.on('routeChangeStart', show);
    events.on('routeChangeComplete', hide);

    return () => {
      events.off('routeChangeStart', show);
      events.off('routeChangeComplete', hide);
    };
  }, [events]);

  return (
    <Context.Provider value={state}>
      {syncStore && Cmp}
      {children}
    </Context.Provider>
  );
};

export default Loaders;
