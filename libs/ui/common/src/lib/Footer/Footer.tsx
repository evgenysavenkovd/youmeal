import { variables } from '@ui/styles/server';
import { KitchenIcon, Logo, PhoneIcon, TelegramIcon, VKIcon } from '../icons';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['credits']}>
        <div className={styles['logo']}>
          <Logo fill={variables.main} />
          <KitchenIcon fill={variables.main} />
        </div>
        <p className={styles['copyright']} data-display="desktop">
          © YouMeal, 2022
        </p>
      </div>
      <div className={styles['contacts']}>
        <div className={styles['item']}>
          <h3>Номер для заказа</h3>
          <a href="tel:+79308333811" className={styles['phone']}>
            <PhoneIcon />
            +7(930)833-38-11
          </a>
        </div>
        <div className={styles['item']}>
          <h3>Мы в соцсетях</h3>
          <ul className={styles['socials']}>
            <li>
              <a href="/" target="_blank">
                <VKIcon />
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <TelegramIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className={styles['copyright']} data-display="mobile">
        © YouMeal, 2022
      </p>
    </footer>
  );
};
