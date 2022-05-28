import express, {json} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());

app.use(handleError);

app.listen(3001, '0.0.0.0',() => {
    console.log('Listening on http://localhost:3001');
});