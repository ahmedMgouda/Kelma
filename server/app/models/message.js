'use strict';
 const model = require('../database').models.message;

class Message{
	constructor(){}
	create (data, callback){
		var newMessage = new model(data);
		newMessage.save(callback);
	};

	findOne (data, callback){
		model.findOne(data, callback);
	}

	findById (id, callback){
		model.findById(id, callback);
	}

	findWhere (condition, callback) {
		model.find(condition, callback);
	}
}
module.exports = new Message();