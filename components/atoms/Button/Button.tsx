'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.scss';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}