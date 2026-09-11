import Image from 'next/image';
import styles from './Logo.module.scss';

export function Logo() {
  return (
    <div className={styles.wrapper}>
      <Image src="/logo.svg" alt="Starsoft" width={101} height={38} priority />
    </div>
  );
}