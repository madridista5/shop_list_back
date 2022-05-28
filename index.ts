import express, {json} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {config} from "./config/config";
import rateLimit from "express-rate-limit";
import {shopRouter} from "./routers/shop.router";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

app.use('/shops', shopRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0',() => {
    console.log('Listening on http://localhost:3001');
});