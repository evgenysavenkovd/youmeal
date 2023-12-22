'use client';

import { CreateOrderDto } from '@api/orders';
import { useCreateOrder } from '@query';
import { Button, RadioButtons, TextInput } from '@ui/controls';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styles from './CreateOrderForm.module.scss';

export interface CreateOrderFormProps {
  onSuccess: () => void;
}

export const CreateOrderForm = ({ onSuccess }: CreateOrderFormProps) => {
  const { control, handleSubmit, getValues } = useForm<CreateOrderDto>({
    defaultValues: {
      address: undefined,
      deliveryType: 'delivery',
      name: '',
      phone: ''
    },
    mode: 'all'
  });

  const { createOrder } = useCreateOrder(onSuccess);

  const onSubmit = ({ address, ...dto }: CreateOrderDto) => {
    createOrder(dto.deliveryType === 'pickup' ? dto : { ...dto, address });
  };

  const validateIfPickup = useCallback(
    (value?: string) => !!value || getValues().deliveryType === 'pickup',
    [getValues]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
      <div className={styles['content']}>
        <h2>Доставка</h2>
        <TextInput
          name="name"
          control={control}
          placeholder="Ваше имя"
          rules={{ required: true }}
        />
        <TextInput
          name="phone"
          control={control}
          placeholder="Телефон"
          rules={{ required: true }}
        />
        <RadioButtons
          name="deliveryType"
          control={control}
          options={[
            { label: 'Самовывоз', value: 'pickup' },
            { label: 'Доставка', value: 'delivery' }
          ]}
          className={styles['delivery']}
          rules={{ required: true }}
        />
        <TextInput
          name="address.street"
          control={control}
          placeholder="Улица, дом, квартира"
          rules={{
            validate: {
              required: validateIfPickup
            }
          }}
        />
        <div className={styles['row']}>
          <TextInput
            name="address.floor"
            control={control}
            placeholder="Этаж"
            rules={{
              validate: {
                required: validateIfPickup
              }
            }}
          />
          <TextInput
            name="address.intercom"
            control={control}
            placeholder="Домофон"
            rules={{
              validate: {
                required: validateIfPickup
              }
            }}
          />
        </div>
      </div>
      <Button type="submit">Оформить</Button>
    </form>
  );
};
