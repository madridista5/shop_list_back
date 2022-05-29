export interface SimpleShopEntity {
    id: string,
    lat: number,
    lon: number,
}

export interface ShopEntity extends SimpleShopEntity{
    name: string;
    category: string;
    url: string;
}

export interface NewShopEntity extends Omit<ShopEntity, 'id' | 'url'> {
    id?: string;
    url?: string;
}