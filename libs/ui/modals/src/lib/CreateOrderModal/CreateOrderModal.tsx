'use client';

import { DonutIcon } from '@ui/common/server';
import { CreateOrderForm } from '@ui/forms';
import { Modal, ModalProps } from '../Modal';
import styles from './CreateOrderModal.module.scss';

export const CreateOrderModal = ({ isOpen, close }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles['content']}>
        <div className={styles['image']}>
          <DonutIcon />
        </div>
        <div className={styles['form']}>
          <CreateOrderForm onSuccess={close} />
        </div>
      </div>
    </Modal>
  );
};
