'use client';

import { ICategory } from '@common/interfaces';
import { useDeleteCategory } from '@query';
import { AdminDrawerContext } from '@ui/common';
import { Button } from '@ui/controls';
import { EditCategoryForm } from '@ui/forms';
import { useContext, useEffect } from 'react';
import { CategoriesList } from './CategoriesList';

export interface CategoriesListAdminProps {
  selected?: number;
  setSelected: (id: number | undefined) => void;
}

export const CategoriesListAdmin = ({
  selected,
  setSelected
}: CategoriesListAdminProps) => {
  const { setTitle, setContent, closeDrawer, content } =
    useContext(AdminDrawerContext);

  const { deleteCategory } = useDeleteCategory();

  const openCategoryEdit = (category: ICategory) => {
    setSelected(category.id as number);
    setContent(
      <EditCategoryForm category={category} onSuccess={closeDrawer}>
        <Button
          styleType="alt"
          onClick={deleteCategory.bind(null, category.id as number, undefined)}
        >
          Удалить
        </Button>
      </EditCategoryForm>
    );
    setTitle('Изменить категорию');
  };

  useEffect(() => {
    if (!content) setSelected(undefined);
  }, [content, setSelected]);

  return (
    <CategoriesList
      selected={selected}
      onClick={({ id }) =>
        setSelected(selected === id ? undefined : (id as number))
      }
      onDoubleClick={openCategoryEdit}
    />
  );
};
