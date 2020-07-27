import jwt from 'express-jwt';
import express, { Router } from 'express';
import { Client } from 'pg';

// Local Controllers
import { MessagesContoller } from './messages';

export class APIV1Controller {
    router: Router

    constructor(
        private db: Client
    ) {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.use(jwt({secret: 'nr0#kv#85$m!*s6t$1s@1#z%2en-*3n5i853^$vy=4p!nddkfn'}))
                   .use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {

                        if (err.name === 'UnauthorizedError') {
                          if (!req.headers.authorization) {
                            res.status(401).json({ meta: {}, errors: ['missing authorization header'], data: {} })
                          } else {
                            res.status(401).json({ meta: {}, errors: ['unauthorized'], data: {} })
                          }
                        }
                      })
                   .use('/messages', new MessagesContoller(this.db).router)
    }
}

