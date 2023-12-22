'use client';

import { QueryProvider } from '@query';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { AdminDrawer, AdminDrawerContext } from '../AdminDrawer';

export const AdminProviders = ({ children }: PropsWithChildren<object>) => {
  const [drawerContent, setDrawerContent] = useState<ReactNode>();
  const [drawerTitle, setDrawerTitle] = useState<string>();

  const closeDrawer = () => {
    setDrawerContent(undefined);
    setDrawerTitle(undefined);
  };

  return (
    <QueryProvider>
      <AdminDrawerContext.Provider
        value={{
          title: drawerTitle,
          content: drawerContent,
          setContent: setDrawerContent,
          setTitle: setDrawerTitle,
          closeDrawer
        }}
      >
        {children}
        <AdminDrawer />
      </AdminDrawerContext.Provider>
    </QueryProvider>
  );
};
