import { ChangeEventHandler, memo } from 'react';
import styles from './QuantityInput.module.scss';

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const QuantityInput = memo(({ value, onChange }: QuantityInputProps) => {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const parsedValue = parseInt(e.target.value);
    if (isNaN(parsedValue)) return;
    onChange(parsedValue);
  };

  const triggerChange = (targetValue: number) => () => onChange(targetValue);

  return (
    <div className={styles['container']}>
      <span className={styles['minus']} onClick={triggerChange(value - 1)}>
        -
      </span>
      <input
        type="number"
        className={styles['input']}
        value={value}
        onChange={onInputChange}
        style={{ width: `${value.toString().length}em` }}
      />
      <span className={styles['plus']} onClick={triggerChange(value + 1)}>
        +
      </span>
    </div>
  );
});
