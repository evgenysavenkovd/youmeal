'use client';

import { concat } from '@ui/styles/server';
import { InputHTMLAttributes, useMemo } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import styles from './TextInput.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TextInputProps = UseControllerProps<any> &
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'placeholder' | 'className' | 'type'
  > & {
    textarea?: boolean;
    label?: string;
  };

export const TextInput = ({
  placeholder,
  className,
  type,
  textarea,
  label,
  ...props
}: TextInputProps) => {
  const { field, fieldState } = useController(props);

  const Component = useMemo(
    () => (textarea ? 'textarea' : 'input'),
    [textarea]
  );

  return (
    <label className={styles['container']}>
      {label && <span className={styles['label']}>{label}</span>}
      <Component
        {...field}
        type={type}
        className={concat(styles['input'], className)}
        data-valid={!fieldState.invalid}
        data-touched={fieldState.isTouched}
        placeholder={placeholder}
      />
    </label>
  );
};
