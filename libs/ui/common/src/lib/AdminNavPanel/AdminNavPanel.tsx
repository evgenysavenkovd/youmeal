'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminNavPanel.module.scss';

const routes: { label: string; href: string }[] = [
  {
    label: 'Главная',
    href: '/'
  },
  {
    label: 'Заказы',
    href: '/orders'
  }
];

export const AdminNavPanel = () => {
  const pathname = usePathname();

  return (
    <div className={styles['panel']}>
      <nav>
        <ul>
          {routes.map(({ href, label }, index) => (
            <li key={index}>
              <Link
                href={href}
                className={pathname === href ? styles['active'] : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
