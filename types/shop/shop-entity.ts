export interface ShopEntity {
    id: string;
    name: string;
    category: string;
    url: string;
    lat: number;
    lon: number;
}

export interface NewShopEntity extends Omit<ShopEntity, 'id' | 'url'> {
    id?: string;
    url?: string;
}