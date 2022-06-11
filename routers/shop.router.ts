import {Router} from "express";
import {ShopRecord} from "../records/shop.record";
import {ProductRecord} from "../records/product.record";

export const shopRouter = Router();

shopRouter
    .get('/', async (req, res) => {
        const shops = await ShopRecord.getAll();
        res.json(shops);
    })
    .get('/:productName', async (req, res) => {
        const shopsWithTheProduct = await ShopRecord.getAllShopsWithTheProduct(req.params.productName);
        res.json(shopsWithTheProduct);
    })
    .get('/single/:id', async (req, res) => {
        const shopToView = await ShopRecord.getOne(req.params.id);
        res.json(shopToView);
    })
    .get('/showSingle/:id', async (req, res) => {
        const shopToView = await ShopRecord.getOne(req.params.id);
        const allProducts = await ProductRecord.getAll();
        const productsToView = allProducts.filter(product => product.shop_id === req.params.id);
        res.json({
            shopToView,
            productsToView,
        });
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