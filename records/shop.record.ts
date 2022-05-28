import {NewShopEntity, ShopEntity} from "../types/shop";
import { pool } from "../utils/db";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type ShopRecordResults = [ShopRecord[], FieldPacket[]];

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

        if(obj.url && obj.url.length > 100) {
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

    static async getOne(id: string): Promise<ShopRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `shops` WHERE `id` = :id", {
            id,
        }) as ShopRecordResults;
        return results.length > 0 ? new ShopRecord(results[0]) : null;
    }

    static async getAll(): Promise<ShopRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `shops`") as ShopRecordResults;
        return results.map(shop => new ShopRecord(shop));
    }

    async insert(): Promise<string> {
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new ValidationError('Ten sklep jest już w bazie danych.');
        }
        await pool.execute("INSERT INTO `shops` VALUES(:id, :name, :category, :url, :lat, :lon)", {
            id: this.id,
            name: this.name,
            category: this.category,
            url: this.url ?? null,
            lat: this.lat,
            lon: this.lon,
        });
        return this.id;
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `shops` WHERE `id` = :id", {
            id: this.id,
        });
    }
}