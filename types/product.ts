export interface Product{
    id: number;
    name: string;
    brand: string;
    description: string;
    price: number;
}

export interface ProductResponse {
    products: Product[];
    count: number;
}

export interface ProductsQueryParams {
    page?: number;
    rows?: number;
    sortBy: 'id' | 'name' | 'price';
    orderBy: 'DESC' | 'ASC';
}