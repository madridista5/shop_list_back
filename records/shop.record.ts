import {NewShopEntity, ShopEntity} from "../types/shop";
import {ValidationError} from "../utils/errors";

export class ShopRecord implements ShopEntity {
    id: string;
    name: string;
    category: string;
    url: string;
    lat: number;
    lon: number;

    constructor(obj: NewShopEntity) {
        if(!obj.name || obj.name.length > 30) {
            throw new ValidationError('Nazwa produktu nie może być pusta, ani przekraczać 30 znaków.');
        }

        if(!obj.category || obj.category.length > 30) {
            throw new ValidationError('Kategoria produktu nie może być pusta, ani przekraczać 30 znaków.');
        }

        if(obj.url.length > 100) {
            throw new ValidationError('Adres do strony www nie może przekraczać 100 znaków.');
        }

        if(typeof obj.lon !== 'number' || typeof obj.lat !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.category = obj.category;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }
}