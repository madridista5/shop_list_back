export interface AllProductsShopsData {
    productId: string
    productName: string,
    productPrice: number,
    description: string,
    shopId: string,
    shopName: string,
    category: string,
    url: string,
}

export interface NewAllProductsShopsData extends Omit<AllProductsShopsData, 'description' | 'url'> {
    description?: string;
    url?: string;
}