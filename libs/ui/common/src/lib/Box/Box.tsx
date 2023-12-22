import { concat } from '@ui/styles/server';
import { PropsWithChildren } from 'react';
import styles from './Box.module.scss';

export type BoxProps = PropsWithChildren<{
  className?: string;
  styleType?: 'small' | 'big';
}>;

export const Box = ({ children, className, styleType = 'big' }: BoxProps) => {
  return (
    <div className={concat(styles['box'], styles[styleType], className)}>
      {children}
    </div>
  );
};
