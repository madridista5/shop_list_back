import {Router} from "express";
import {ShopRecord} from "../records/shop.record";

export const shopRouter = Router();

shopRouter
    .get('/', async (req, res) => {
        const shops = await ShopRecord.getAll();
        console.log(shops);
        res.json(shops);
    })
    .get('/edit/:id', async (req, res) => {
        const shopToEdit = await ShopRecord.getOne(req.params.id);
        res.json(shopToEdit);
    })
    .delete('/delete/:id', async (req, res) => {
        const shopToDelete = await ShopRecord.getOne(req.params.id);
        const shopName = shopToDelete.name;
        await shopToDelete.delete();
        res.json(shopName);
    })
    .post('/add', async (req, res) => {
        const newShop = new ShopRecord(req.body);
        await newShop.insert();
        res.json(newShop);
    });