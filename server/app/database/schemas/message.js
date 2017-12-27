'use strict';
var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    toUserId: { type: String, required: true},
    fromUserId: { type: String, required: true},
    date: { type: String, required: true, default: Date.now},
    message: { type: String, required: true},    
},{timestamps: true});


// Create a message model
var messageModel = mongoose.model('message', MessageSchema);

module.exports = messageModel;