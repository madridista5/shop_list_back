import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {config} from "./config/config";
import rateLimit from "express-rate-limit";
import {shopRouter} from "./routers/shop.router";
import {productRouter} from "./routers/product.router";
import {allDataRouter} from "./routers/all.data.router";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

const router = Router();

router.use('/shops', shopRouter);
router.use('/products', productRouter);
router.use('/allData', allDataRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0',() => {
    console.log('Listening on http://localhost:3001');
});