import {Router} from "express";
import {ProductRecord} from "../records/product.record";

export const productRouter = Router();

productRouter
    .get('/singleShop/:id', async (req, res) => {
        const allProductsFromSingleShop = await ProductRecord.getAllProductsFromSingleShop(req.params.id);
        res.json(allProductsFromSingleShop);
    })
    .get('/singleProduct/:shopId/:productName', async (req, res) => {
        const oneProductFromSingleShop = await ProductRecord.getOneProductFromSingleShop(req.params.shopId, req.params.productName);
        res.json(oneProductFromSingleShop);
    })
    .post('/add', async (req, res) => {
        const newProduct = new ProductRecord(req.body);
        await newProduct.insert();
        res.json(newProduct);
    });