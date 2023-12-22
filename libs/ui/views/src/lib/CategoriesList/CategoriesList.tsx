'use client';

import { ICategory } from '@common/interfaces';
import { useGetCategories } from '@query';
import { useCallback, useState } from 'react';
import { SwipeCallback, useSwipeable } from 'react-swipeable';
import styles from './CategoriesList.module.scss';

export interface CategoriesListProps {
  onClick?: (category: ICategory) => void;
  onDoubleClick?: (category: ICategory) => void;
  selected?: number;
}

export const CategoriesList = ({
  selected,
  onClick,
  onDoubleClick
}: CategoriesListProps) => {
  const { categories } = useGetCategories();

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [initialPosition, setInitialPosition] = useState(0);

  const wrapperRef = useCallback((el: HTMLDivElement | null) => {
    if (el) setMaxTranslate(el.offsetWidth - el.scrollWidth);
  }, []);

  const onSwiping: SwipeCallback = ({ deltaX }) => {
    let tmp = initialPosition + deltaX;
    if (tmp > 0) tmp = 0;
    else if (tmp < maxTranslate) tmp = maxTranslate;
    setTranslate(tmp);
  };

  const onSwiped: SwipeCallback = ({ event }) => {
    event.stopPropagation();
    setInitialPosition(translate);
  };

  const handlers = useSwipeable({
    onSwiping,
    onSwiped,
    trackMouse: true
  });

  return (
    <div className={styles['list']} {...handlers}>
      <div
        className={styles['wrapper']}
        ref={wrapperRef}
        style={{ transform: `translateX(${translate}px)` }}
      >
        {categories?.map((category) => (
          <div
            key={category.id}
            className={styles['item']}
            onClick={onClick?.bind(null, category)}
            onDoubleClick={onDoubleClick?.bind(null, category)}
            data-active={selected === category.id}
          >
            <img src={category.imageUrl} alt={category.displayName} />
            <span>{category.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
