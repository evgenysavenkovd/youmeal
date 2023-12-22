import { concat } from '@ui/styles/server';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

export type ButtonProps = PropsWithChildren<
  Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'className' | 'disabled' | 'type'
  > & {
    styleType?: 'alt' | 'gray';
  }
>;

export const Button = ({
  onClick,
  className,
  disabled,
  type = 'button',
  styleType,
  children
}: ButtonProps) => (
  <button
    className={concat(styles['button'], styles[styleType || ''], className)}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);
