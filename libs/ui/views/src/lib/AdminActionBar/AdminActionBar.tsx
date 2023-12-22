'use client';

import { AdminDrawerContext } from '@ui/common';
import { Button } from '@ui/controls';
import { EditCategoryForm, EditProductForm } from '@ui/forms';
import { useContext } from 'react';
import styles from './AdminActionBar.module.scss';

export const AdminActionBar = () => {
  const { setTitle, setContent, closeDrawer } = useContext(AdminDrawerContext);

  const addCategory = () => {
    setContent(<EditCategoryForm onSuccess={closeDrawer} />);
    setTitle('Добавить категорию');
  };

  const addProduct = () => {
    setContent(<EditProductForm onSuccess={closeDrawer} />);
    setTitle('Добавить товар');
  };

  return (
    <div className={styles['bar']}>
      <Button onClick={addCategory} className={styles['button']}>
        Добавить категорию
      </Button>
      <Button onClick={addProduct} className={styles['button']}>
        Добавить товар
      </Button>
    </div>
  );
};
