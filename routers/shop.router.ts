import {Router} from "express";

export const shopRouter = Router();

shopRouter
    .get('/', (req, res) => {
        res.json({
            ok: 'true',
        });
    });