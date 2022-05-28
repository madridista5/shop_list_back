export interface ProductEntity {
    id: string,
    name: string,
    price: number,
    description: string;
    shop_id: string;
}

export interface NewProductEntity extends Omit<ProductEntity, 'description' | 'shop_id'> {
    description?: string;
    shop_id?: string;
}