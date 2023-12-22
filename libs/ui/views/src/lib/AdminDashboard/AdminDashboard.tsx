'use client';

import { useState } from 'react';
import { AdminActionBar } from '../AdminActionBar';
import { CategoriesListAdmin } from '../CategoriesList';
import { ProductsListAdmin } from '../ProductsList';

export const AdminDashboard = () => {
  const [category, setCategory] = useState<number>();

  return (
    <>
      <AdminActionBar />
      <CategoriesListAdmin selected={category} setSelected={setCategory} />
      <ProductsListAdmin category={category} />
    </>
  );
};
