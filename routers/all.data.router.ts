import {Router} from "express";
import {AllProductsShopsDataRecord} from "../records/all.products.shops.data";

export const allDataRouter = Router();

allDataRouter
    .get('/', async (req, res) => {
        const allData = await AllProductsShopsDataRecord.getAllProductsAndShopsData();
        res.json(allData);
    });