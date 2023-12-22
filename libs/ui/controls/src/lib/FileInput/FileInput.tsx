'use client';

import { ChangeEventHandler, useState } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './FileInput.module.scss';

export interface FileInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  rules?: RegisterOptions;
  preview?: string;
}

export const FileInput = ({
  name,
  register,
  rules,
  preview
}: FileInputProps) => {
  const [previewUri, setPreviewUri] = useState(preview);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files?.length) {
      const file = files[0];
      const uri = URL.createObjectURL(file);
      setPreviewUri(uri);
    }
  };

  return (
    <label className={styles['container']} data-filled={!!previewUri}>
      {previewUri && (
        <img src={previewUri} alt="Preview" className={styles['preview']} />
      )}
      <input hidden type="file" {...register(name, { ...rules, onChange })} />
    </label>
  );
};
