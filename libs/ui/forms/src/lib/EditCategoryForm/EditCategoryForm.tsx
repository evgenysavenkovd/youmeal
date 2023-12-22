import { CreateCategoryDto } from '@api/categories';
import { ICategory } from '@common/interfaces';
import { useUpdateCategory } from '@query';
import { Button, FileInput, TextInput } from '@ui/controls';
import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EditCategoryForm.module.scss';

export type EditCategoryFormProps = PropsWithChildren<{
  category?: ICategory;
  onSuccess?: () => void;
}>;

type FormValues = CreateCategoryDto & { image: FileList };

export const EditCategoryForm = ({
  category,
  onSuccess,
  children
}: EditCategoryFormProps) => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: { displayName: category?.displayName, image: undefined },
    mode: 'all'
  });

  const { updateCategory } = useUpdateCategory(category, onSuccess);

  const onSubmit = (values: FormValues) => {
    updateCategory({ ...values, image: values.image.item(0) as File });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
      <TextInput
        control={control}
        name="displayName"
        placeholder="Название"
        label="Название"
        rules={{ required: true }}
      />
      <FileInput
        name="image"
        register={register}
        preview={category?.imageUrl}
      />
      <Button type="submit">Сохранить</Button>
      {children}
    </form>
  );
};
