import { JSX } from 'react/jsx-runtime';
import styles from './Text.module.scss';

interface TextProps {
  variant: 'title' | 'body' | 'price' | 'muted';
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export function Text({ variant, as: Tag = 'span', children }: TextProps) {
  return <Tag className={styles[variant]}>{children}</Tag>;
}