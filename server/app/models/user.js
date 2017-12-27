'use strict';
const model = require('../database').models.user;

class User{
	
	constructor(){}
	
	login(userId,callback){
		model.findOne({ id: userId }, function (err, user){
			user.status = true;
			user.save();
		});	
	}

	create (data, callback){
		let newUser = new model(data);
		newUser.save(callback);
	}

	findOne (data, callback){
		model.findOne(data, callback);
	}

	findById (id, callback){
		model.findById(id, callback);
	}
	getAll (callback)
	{
		model.find({}, callback);
	}
	addSocketId(data, callback){
		model.findOne({ _id: data.userId}, function (err, user){
			user.socketId = data.socketId;
			user.save();
		});	
	}

	logout (userId, callback){
		model.findOne({ id: userId }, function (err, user){
			user.status = false;
			user.save();
		});	
	}
}
module.exports = new User();