import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { mockProducts } from '../../lib/mocks/products.mock';
import type { ProductResponse, ProductsQueryParams } from '@/types/product'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const fetchProducts = async (params: ProductsQueryParams): Promise<ProductResponse> => {
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 300));

        const start = (params.page! - 1) * params.rows!;
        const end = start + params.rows!;
        const paginated = mockProducts.slice(start, end);

        return {products: paginated, count: mockProducts.length};

    }
    const { data } = await api.get<ProductResponse>('/products', { params })
    return data;
}

export function useProducts(params: ProductsQueryParams) {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => fetchProducts(params),
        staleTime: 1000 * 60,
    })
}