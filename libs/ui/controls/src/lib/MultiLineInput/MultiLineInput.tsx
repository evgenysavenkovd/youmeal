import { CloseIcon } from '@ui/common/server';
import { concat } from '@ui/styles/server';
import { ChangeEventHandler } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Button } from '../Button';
import { textInputStyles } from '../TextInput';
import styles from './MultiLineInput.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MultiLineInputProps = UseControllerProps<any> & {
  label?: string;
};

export const MultiLineInput = ({ label, ...props }: MultiLineInputProps) => {
  const { field } = useController(props);

  const fieldValue = field.value as string[];

  const addItem = () => {
    field.onChange([...fieldValue, '']);
  };

  const removeItem = (index: number) => () => {
    field.onChange([
      ...fieldValue.slice(0, index),
      ...fieldValue.slice(index + 1)
    ]);
  };

  const onItemChange =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      field.onChange([
        ...fieldValue.slice(0, index),
        e.target.value,
        ...fieldValue.slice(index + 1)
      ]);
    };

  return (
    <div className={styles['container']}>
      {label && <p className={styles['label']}>{label}</p>}
      <div className={styles['items']}>
        {fieldValue.map((value, index) => (
          <div className={styles['item']} key={index}>
            <input
              onChange={onItemChange(index)}
              value={value}
              className={concat(textInputStyles['input'], styles['input'])}
              data-touched="true"
              data-valid={value ? true : undefined}
            />
            <div className={styles['close']} onClick={removeItem(index)}>
              <CloseIcon />
            </div>
          </div>
        ))}
      </div>
      <Button styleType="alt" onClick={addItem} className={styles['button']}>
        Добавить
      </Button>
    </div>
  );
};
