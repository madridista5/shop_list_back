import {NewProductEntity, ProductEntity, SimplyProductEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type ProductRecordResults = [ProductRecord[], FieldPacket[]];

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

    static async getOne(id: string): Promise<ProductRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `products` WHERE `id` = :id", {
            id,
        }) as ProductRecordResults;
        return results.length > 0 ? new ProductRecord(results[0]) : null;
    }

    static async getAll(): Promise<ProductRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `products`") as ProductRecordResults;
        return results.map(product => new ProductRecord(product));
    }

    static async getAllProductsFromSingleShop(shopId: string): Promise<SimplyProductEntity[]> {
        const [results] = await pool.execute("SELECT `products`.`id`, `products`.`name`, `products`.`price` FROM `products` JOIN `shops` ON `products`.`shop_id` = `shops`.`id` WHERE `shops`.`id` = :shopId", {
            shopId,
        }) as ProductRecordResults;
        return results.map(product => new ProductRecord(product));
    }

    static async getOneProductFromSingleShop(shopId: string, productName: string): Promise<SimplyProductEntity[]> {
        const [results] = await pool.execute("SELECT `products`.`id`, `products`.`name`, `products`.`price`, `products`.`shop_id` FROM `products` WHERE `shop_id` = :shopId AND `name` = :productName", {
            shopId,
            productName,
        }) as ProductRecordResults;
        return results.map(product => new ProductRecord(product));
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Ten produkt został już dodany.');
        }
        await pool.execute("INSERT INTO `products` VALUES(:id, :name, :price, :description, :shop_id)", {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description ?? null,
            shop_id: this.shop_id ?? null,
        });

        return this.id;
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `products` WHERE `id` = :id", {
            id: this.id,
        });
    }
}