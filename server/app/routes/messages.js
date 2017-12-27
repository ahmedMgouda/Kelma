'use strict';
const passport = require('passport');
const Message = require('../models/message');

class MessagesRoutes {
    constructor(app) {
        this.app = app;
    }
    routes() {
        this.app.post('/getMessages', passport.authenticate('jwt', { session: false }), function (req, res) {
            let userId = req.body.userId;
            let toUserId = req.body.toUserId;
            let messages = {}

            if (userId == '') {
                messages.error = true;
                messages.message = `userId cant be empty.`;
                response.status(200).json(messages);
            } else {
                Message.findWhere({ 'fromUserId': userId, 'toUserId': toUserId }, (error, result)=> {
                    if (error) {
                        messages.error = true;
                        messages.message = `Server error.`;
                        res.status(200).json(messages);
                    } else {
                        messages.error = false;
                        messages.messages = result;
                        res.status(200).json(messages);
                    }
                });
            }
        });
    }
    routesConfig() {
        this.routes();
    }

}
module.exports = MessagesRoutes;
