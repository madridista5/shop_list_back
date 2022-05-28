import {NewProductEntity, ProductEntity} from "../types/product";
import {ValidationError} from "../utils/errors";

export class ProductRecord implements ProductEntity {
    id: string;
    name: string;
    price: number;
    description: string;
    shop_id: string;

    constructor(obj: NewProductEntity) {
        if(!obj.name || obj.name.length > 30) {
            throw new ValidationError('Nazwa produktu nie może być pusta, ani przekraczać 30 znaków.');
        }

        if(!obj.price || obj.price > 999999.99) {
            throw new ValidationError('Cena musi zostać podana i nie może przekraczać: 999999.99');
        }

        if(obj.description && obj.description.length > 200) {
            throw new ValidationError('Opis nie może przekraczać 200 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.price = obj.price;
        this.description = obj.description;
        this.shop_id = obj.shop_id;
    }
}