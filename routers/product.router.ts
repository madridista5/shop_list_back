import {Router} from "express";
import {ProductRecord} from "../records/product.record";

export const productRouter = Router();

productRouter
    .get('/singleShop/:id', async (req, res) => {
        const allProductsFromSingleShop = await ProductRecord.getAllProductsFromSingleShop(req.params.id);
        console.log(allProductsFromSingleShop);
        res.json(allProductsFromSingleShop);
    });