import express, { Application } from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import From Local Project
import * as socket from '../sockets/sockets';
import { APIV1Controller } from '../routes';
import { SERVER_PORT, MYSQL_STRING } from '../enviroments/environments';


export default class Server {
    private static _instance: Server;
    private httpServer: http.Server;

    db: mysql.Connection
    app: Application;
    port: number;
    io: SocketIO.Server;


    private constructor() {
        this.app = express()
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = SocketIO( this.httpServer );

        // Register Middleware
        this.registerMiddleware();

        // Setup MySQL
        this.db = mysql.createConnection(MYSQL_STRING);
        this.db.connect();

        // Listen Sockets
        this.listenSockets();

        // Register Routes
        this.registerRoutes();

        
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() )
    }

    private listenSockets() {
        console.log('Start to listen sockets..');

        this.io.on('connect', client => {
            // Register functions
            if (!client.connected) {
                
            }
            socket.connectUser(client, this.io);
            socket.configUser(client, this.io);
            socket.getUsers(client, this.io);
            socket.message(client, this.io, this.db);
            socket.disconnectUser(client, this.io);
        });
    }

    private registerMiddleware() {
        // Config Body Parser
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

        // Cors Config
        this.app.use(cors({origin: true, credentials: true}));
    }

    private registerRoutes() {
        this.app.use('/', new APIV1Controller(this.db).router);
    }

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback() );
    }

}
