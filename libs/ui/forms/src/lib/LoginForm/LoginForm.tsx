'use client';

import { SignInDto } from '@api/auth';
import { apiClient } from '@query';
import { Button, TextInput } from '@ui/controls';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<SignInDto>({
    defaultValues: { login: '', password: '' },
    mode: 'all'
  });

  const [authError, setAuthError] = useState(false);

  const onSubmit = (values: SignInDto) => {
    apiClient.auth
      .signIn(values)
      .then((res) => router.refresh())
      .catch(() => setAuthError(true));
  };

  return (
    <div className={styles['wrapper']}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <p>Вход</p>
        <TextInput
          control={control}
          name="login"
          placeholder="Логин"
          rules={{ required: true }}
        />
        <TextInput
          control={control}
          name="password"
          placeholder="Пароль"
          type="password"
          rules={{ required: true }}
        />
        {authError && <span>Неправильный логин или пароль</span>}
        <Button type="submit" disabled={!formState.isValid}>
          Вход
        </Button>
      </form>
    </div>
  );
};
