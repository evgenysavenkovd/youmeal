import { CreateProductDto } from '@api/products';
import { IProduct } from '@common/interfaces';
import { useGetCategories, useUpdateProduct } from '@query';
import {
  Button,
  FileInput,
  MultiLineInput,
  Select,
  TextInput
} from '@ui/controls';
import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import styles from './EditProductForm.module.scss';

export type EditProductFormProps = PropsWithChildren<{
  product?: IProduct;
  onSuccess?: () => void;
}>;

type FormValues = CreateProductDto & { image: FileList };

export const EditProductForm = ({
  product,
  onSuccess,
  children
}: EditProductFormProps) => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      calorieValue: product?.calorieValue || 0,
      category: product?.category || undefined,
      compound: product?.compound || [],
      description: product?.description || '',
      displayName: product?.displayName || '',
      image: undefined,
      price: product?.price || 0,
      weight: product?.weight || 0
    },
    mode: 'all'
  });

  const { categories } = useGetCategories();
  const { updateProduct } = useUpdateProduct(product, onSuccess);

  const onSubmit = ({ image, ...values }: FormValues) => {
    updateProduct({ ...values, image: image.item(0) as File });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
      <Select
        control={control}
        name="category"
        label="Категория"
        options={
          categories?.map((category) => ({
            label: category.displayName,
            value: category.id as number
          })) || []
        }
      />
      <TextInput
        control={control}
        name="displayName"
        placeholder="Название"
        label="Название"
        rules={{ required: true }}
      />
      <TextInput
        control={control}
        name="description"
        placeholder="Описание"
        label="Описание"
        rules={{ required: true }}
        textarea
      />
      <div className={styles['row']}>
        <TextInput
          control={control}
          name="price"
          placeholder="Цена"
          label="Цена"
          rules={{ required: true }}
          type="number"
        />
        <TextInput
          control={control}
          name="weight"
          placeholder="Вес"
          label="Вес"
          rules={{ required: true }}
          type="number"
        />
        <TextInput
          control={control}
          name="calorieValue"
          placeholder="Калорийность"
          label="Калорийность"
          rules={{ required: true }}
          type="number"
        />
      </div>
      <MultiLineInput control={control} name="compound" label="Состав" />
      <FileInput name="image" register={register} preview={product?.imageUrl} />
      <Button type="submit">Сохранить</Button>
      {children}
    </form>
  );
};
