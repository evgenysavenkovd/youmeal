import { LoginForm } from '@ui/forms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход'
};

export default function Page() {
  return <LoginForm />;
}
