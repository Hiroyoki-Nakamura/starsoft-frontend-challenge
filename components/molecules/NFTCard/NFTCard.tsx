'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/atoms/Button/Button';
import { Text } from '@/components/atoms/Text/Text';
import { PriceIcon } from '@/components/atoms/PriceIcon/PriceIcon';
import styles from './NFTCard.module.scss';
import type { Product } from '@/types/product';

interface NFTCardProps {
  product: Product;
  imageSrc: string;
  onBuy: (product: Product) => void;
}

export function NFTCard({ product, imageSrc, onBuy }: NFTCardProps) {
  const [added, setAdded] = useState(false);

  const handleBuy = () => {
    onBuy(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <div className={styles.imageWrapper}>
        <Image src={imageSrc} alt={product.name} fill className={styles.image} />
      </div>

      <div className={styles.content}>
        <Text variant="title" as="h3">{product.name}</Text>
        <Text variant="muted">{product.description}</Text>

        <div className={styles.priceRow}>
          <PriceIcon />
          <Text variant="price">{product.price} ETH</Text>
        </div>

        <Button variant={added ? 'secondary' : 'primary'} onClick={handleBuy}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? 'added' : 'idle'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {added ? 'ADICIONADO AO CARRINHO' : 'COMPRAR'}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  );
}