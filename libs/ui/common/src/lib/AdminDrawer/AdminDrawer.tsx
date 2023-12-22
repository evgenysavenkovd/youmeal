'use client';

import { MouseEventHandler, useContext, useRef } from 'react';
import styles from './AdminDrawer.module.scss';
import { AdminDrawerContext } from './AdminDrawerContext';

export const AdminDrawer = () => {
  const { content, title, closeDrawer } = useContext(AdminDrawerContext);

  const overlayRef = useRef<HTMLDivElement>(null);

  const clearContent: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlayRef.current) closeDrawer();
  };

  return (
    <div
      className={styles['overlay']}
      data-open={!!content}
      onClick={clearContent}
      ref={overlayRef}
    >
      <div className={styles['drawer']}>
        {title && <div className={styles['title']}>{title}</div>}
        <div className={styles['content']}>{content}</div>
      </div>
    </div>
  );
};
