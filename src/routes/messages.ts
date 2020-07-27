import { Router, Request, Response } from 'express';
import { Client } from 'pg';


export class MessagesContoller {
    router: Router

    constructor(
        private db: Client
    ) {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes = () => {
        this.router.get('/', this.getMessages)
    }

    getMessages = (req: Request, res: Response) => {

        const page = Number(req.query.page) || 1;
        const per_page = Number(req.query.per_page) || 10;

        const offset = (page - 1) * per_page;
        const query = ` SELECT id, userlogin, create_at, payload 
                        FROM Messages 
                        ORDER BY create_at DESC 
                        OFFSET ${offset} 
                        LIMIT ${per_page}`; // 
        
        this.db.query(query, (err, {rows}) => {

            res.json({
                ok: true,
                messages: rows
            });
        });
    }

}




