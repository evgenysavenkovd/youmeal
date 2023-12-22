import { CloseIcon } from '@ui/common/server';
import { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.module.scss';

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  close: () => void;
}>;

ReactModal.setAppElement('body');

export const Modal = ({ isOpen, close, children }: ModalProps) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={close}
    className={styles['content']}
    overlayClassName={styles['overlay']}
  >
    <div className={styles['close']} onClick={close}>
      <CloseIcon />
    </div>
    {children}
  </ReactModal>
);
