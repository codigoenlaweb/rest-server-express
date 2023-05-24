// express
import { Request, Response, Router } from "express";
// controller

export const crudRoutes = Router();

crudRoutes.get("/", (req: Request, res: Response) => {
    res.json({
        msg: 'get crud'
    })
});

crudRoutes.post("/", (req: Request, res: Response) => {
    res.json({
        msg: 'post crud'
    })
});

crudRoutes.put("/", (req: Request, res: Response) => {
    res.json({
        msg: 'put crud'
    })
});

crudRoutes.delete("/", (req: Request, res: Response) => {
    res.json({
        msg: 'delete crud'
    })
});