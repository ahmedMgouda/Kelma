'use strict'
// Chat application dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io');


// Chat application components
const passport = require('./app/utils/auth');
const socketEvents = require('./app/utils/socket'); 
const authRoutes = require('./app/routes/auth');
const messagesRoutes = require('./app/routes/messages')
const logger = require('./app/utils/logger');


class Server{
    constructor(){
        this.port = process.env.port || 3000;
        this.host = 'localhost';
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

    appConfig(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(
        	cors()
        );
        this.app.use(passport.initialize());
        // this.app.use('', messages);
    }
    /* Including app Routes starts*/
    includeRoutes(){
        new authRoutes(this.app).routesConfig();
        new messagesRoutes(this.app).routesConfig();
        new socketEvents(this.socket).socketConfig();
    }
    appExecute(){
        this.appConfig();
        this.includeRoutes();
        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }
}
const server = new Server();
server.appExecute();