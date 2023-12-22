import { HeroIcon, KitchenIcon, Logo } from '../icons';
import styles from './Hero.module.scss';

export const Hero = () => (
  <div className={styles['hero']}>
    <div className={styles['logo']}>
      <Logo />
      <KitchenIcon />
    </div>
    <div className={styles['cta']}>
      <HeroIcon className={styles['image']} />
      <div className={styles['info']}>
        <div className={styles['text']}>
          Только самые <br />
          <span>сочные бургеры!</span>
        </div>
        <div className={styles['delivery']}>Бесплатная доставка от 599₽</div>
      </div>
    </div>
  </div>
);
