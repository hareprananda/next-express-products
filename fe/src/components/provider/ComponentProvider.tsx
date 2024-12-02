'use client';

import React, { createContext, PropsWithChildren, useRef } from 'react';
import Loading, { LoadingRef } from '../loading/Loading';

export const AppContext = createContext({
  setLoading: (() => null) as (val: boolean) => void
});

const ComponentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const loadingRef = useRef<LoadingRef>(null);

  const setLoading = (open: boolean) => {
    if (open) loadingRef.current?.show();
    else loadingRef.current?.dismiss();
  };

  return (
    <>
      <Loading ref={loadingRef} />
      <AppContext.Provider value={{ setLoading: setLoading }}>{children}</AppContext.Provider>
    </>
  );
};

export default ComponentProvider;
