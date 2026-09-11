'use client';

import { useState } from 'react';
import { NFTCard } from '@/components/molecules/NFTCard/NFTCard';
import { Button } from '@/components/atoms/Button/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { Text } from '@/components/atoms/Text/Text';
import { useProducts } from '@/features/nft/nftQueries';
import { useEffect } from 'react';
import { getProductImage } from '@/lib/getProductImage';
import styles from './NFTGrid.module.scss';
import type { Product } from '@/types/product';

const ROWS_PER_PAGE = 8;

export function NFTGrid() {
  const [page, setPage] = useState(1);
  const [accumulated, setAccumulated] = useState<Product[]>([]);

  const { data, isLoading, error, isFetching } = useProducts({
    page,
    rows: ROWS_PER_PAGE,
    sortBy: 'id',
    orderBy: 'DESC',
  });

useEffect(() => {
  if (data?.products) {
    setAccumulated((prev) => {
      const newItems = data.products.filter(
        (p) => !prev.some((existing) => existing.id === p.id)
      );
      return [...prev, ...newItems];
    });
  }
}, [data]);

const allProducts = accumulated;
const hasMore = data ? allProducts.length < data.count : false;

const handleLoadMore = () => {
  setPage((p) => p + 1);
};

  if (isLoading && page === 1) {
    return (
      <div className={styles.stateWrapper}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateWrapper}>
        <Text variant="body">Erro ao carregar produtos. Tente novamente mais tarde.</Text>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {allProducts.map((product) => (
          <NFTCard
            key={product.id}
            product={product}
            imageSrc={getProductImage(product.id)}
            onBuy={() => undefined}
          />
        ))}
      </div>

      <div className={styles.loadMoreWrapper}>
        {hasMore ? (
          <Button variant="secondary" onClick={handleLoadMore} disabled={isFetching}>
            {isFetching ? 'Carregando...' : 'Carregar mais'}
          </Button>
        ) : (
          <Text variant="muted">Você já viu tudo</Text>
        )}
      </div>
    </div>
  );
}