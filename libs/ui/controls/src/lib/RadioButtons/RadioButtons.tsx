import { concat } from '@ui/styles/server';
import { UseControllerProps, useController } from 'react-hook-form';
import styles from './RadioButtons.module.scss';

export type RadioButtonsProps<Value extends string> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UseControllerProps<any> & {
    options: {
      value: Value;
      label: string;
    }[];
    className?: string;
  };

export const RadioButtons = <Value extends string>({
  options,
  className,
  ...props
}: RadioButtonsProps<Value>) => {
  const { field, formState } = useController(props);

  console.log({ errors: formState.errors });

  const fieldValue = field.value as Value;

  const onClick = (value: Value) => () => {
    field.onChange(value);
  };

  return (
    <div className={concat(styles['container'], className)}>
      {options.map(({ label, value }, index) => (
        <div
          className={styles['option']}
          key={index}
          data-active={fieldValue === value}
          onClick={onClick(value)}
        >
          <div className={styles['radio-view']}></div>
          {label}
        </div>
      ))}
    </div>
  );
};
