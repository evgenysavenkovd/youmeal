'use client';

import { ReactNode, createContext } from 'react';

export interface IAdminDrawerContext {
  content?: ReactNode;
  title?: string;
  setContent: (value?: ReactNode) => void;
  setTitle: (value?: string) => void;
  closeDrawer: () => void;
}

export const AdminDrawerContext = createContext<IAdminDrawerContext>(
  {} as never
);
