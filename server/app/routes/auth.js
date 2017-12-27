'use strict';
const passport = require("passport");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');

class AuthRoutes{
	constructor(app){
		this.app = app;
	}
	routes(){
		// Register via username and password
		this.app.post('/register', function (req, res, next) {
			var credentials = {'firstName': req.body.firstName,
								'lastName': req.body.lastName, 
								'userName': req.body.userName, 
								'email': req.body.email, 
								'password': req.body.password };
			if (!credentials.userName ||
				!credentials.password || 
				!credentials.firstName || 
				!credentials.lastName || 
				!credentials.email) {
				res.json({ success: false, message: 'Please fill the required fields.' });
			} else {
				// Check if the username already exists for non-social account
				User.findOne({ 'userName': new RegExp('^' + req.body.userName + '$', 'i'), 'socialId': null }, function (err, user) {
					if (err) throw err;
					if (user) {
						res.json({ success: false, message: 'Username already exists, try to login.' });
					} else {
						User.create(credentials, function (err, newUser) {
							if (err) throw err;
							let token = generateToken(newUser);
							res.json({ success: true, message: 'Your account has been created.', token: 'bearer ' + token, userId: newUser.id, userName: newUser.userName});
						});
					}
				});
			}
		});
		this.app.post('/login', function (req, res) {
			User.findOne({
				userName: req.body.userName
			}, function (err, user) {
				if (err) throw err;
				if (!user) {
					res.json({ success: false, message: 'User not found.' })
				} else {
					user.validatePassword(req.body.password, function (err, isMatch) {
						if (isMatch && !err) {							
							let token = generateToken(user);
							res.json({ success: true, token: 'bearer ' + token, userId: user.id, userName: user.userName });
						} else {
							res.json({ success: false, message: 'Authentication faild.' })
						};
					});
				};
			});
		});
	}
     
	routesConfig(){
		this.routes();
	}
}
function generateToken(user){
	return jwt.sign(user.toJSON(), config.jwt.secret, {
		expiresIn: config.jwt.expiresIn
	});
}
function isAuthenticated(type) {
	return passport.authenticate(type, { session: false });
}
module.exports = AuthRoutes;