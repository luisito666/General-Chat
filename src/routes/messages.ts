import { Router, Request, Response } from 'express';
import { Connection } from 'mysql';


export class MessagesContoller {
    router: Router

    constructor(
        private db: Connection
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
        const query = `SELECT id, \`from\`, \`date\`, message FROM Messages ORDER BY date DESC LIMIT ${offset}, ${per_page}`;
        
        this.db.query(query, (err, results) => {
            res.json({
                ok: true,
                messages: results
            });
        });
    }

}




