import {AllProductsShopsData, NewAllProductsShopsData} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type AllProductsShopsDataRecords = [AllProductsShopsData[], FieldPacket[]];

export class AllProductsShopsDataRecord implements AllProductsShopsData {
    productId: string
    productName: string;
    productPrice: number;
    description: string;
    shopId: string;
    shopName: string;
    category: string;
    url: string;

    constructor(obj: NewAllProductsShopsData) {
        if(!obj.productName || obj.productName.length > 30) {
            throw new ValidationError('Nazwa produktu nie może być pusta, ani przekraczać 30 znaków.');
        }

        if(!obj.productPrice || obj.productPrice > 999999.99) {
            throw new ValidationError('Cena musi zostać podana i nie może przekraczać: 999999.99');
        }

        if(obj.description && obj.description.length > 200) {
            throw new ValidationError('Opis nie może przekraczać 200 znaków.');
        }

        if(!obj.shopName || obj.shopName.length > 30) {
            throw new ValidationError('Nazwa produktu nie może być pusta, ani przekraczać 30 znaków.');
        }

        if(!obj.category || obj.category.length > 30) {
            throw new ValidationError('Kategoria produktu nie może być pusta, ani przekraczać 30 znaków.');
        }

        if(obj.url && obj.url.length > 100) {
            throw new ValidationError('Adres do strony www nie może przekraczać 100 znaków.');
        }

        this.productId = obj.productId;
        this.productName = obj.productName;
        this.productPrice = obj.productPrice;
        this.description = obj.description;
        this.shopId = obj.shopId;
        this.shopName = obj.shopName;
        this.category = obj.category;
        this.url = obj.url;
    }

    static async getAllProductsAndShopsData(): Promise<AllProductsShopsDataRecord[]> {
        const [results] = await pool.execute("SELECT `products`.`id` AS `productId`, `products`.`name` AS `productName`, `products`.`price` AS `productPrice`, `products`.`description` AS `description`, `products`.`shop_id` AS `shopId`, `shops`.`name` AS `shopName`, `shops`.`category` AS `category`, `shops`.`url` AS `url` FROM `products` JOIN `shops` ON `products`.`shop_id` = `shops`.`id` ORDER BY `products`.`name` ASC") as AllProductsShopsDataRecords;
        return results.map(record => new AllProductsShopsDataRecord(record));
    }
}