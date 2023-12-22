'use client';

import { useClickAwayListener } from '@ui/common';
import { useMemo, useRef, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import styles from './Select.module.scss';

export type SelectProps<Value extends string | number> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UseControllerProps<any> & {
    label?: string;
    options: {
      value: Value;
      label: string;
    }[];
  };

export const Select = <Value extends string | number>({
  label,
  options,
  ...props
}: SelectProps<Value>) => {
  const { field } = useController(props);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setOpen] = useState(false);

  const toggleOpen = (value: boolean) => () => setOpen(value);

  const onOptionClick = (value: Value) => () => {
    field.onChange(value);
    setOpen(false);
  };

  const fieldValue = field.value as Value;

  const currentOption = useMemo(
    () => options.find(({ value }) => value === fieldValue),
    [options, fieldValue]
  );

  useClickAwayListener(containerRef, toggleOpen(false));

  return (
    <div
      className={styles['container']}
      ref={containerRef}
      onBlur={field.onBlur}
    >
      {label && <p className={styles['label']}>{label}</p>}
      <div
        className={styles['view']}
        onClick={toggleOpen(!isOpen)}
        data-placeholder={!currentOption}
      >
        {currentOption?.label || 'Select'}
      </div>
      {isOpen && (
        <div className={styles['dropdown']}>
          {options.map((option, index) => (
            <div
              className={styles['option']}
              onClick={onOptionClick(option.value)}
              key={index}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
