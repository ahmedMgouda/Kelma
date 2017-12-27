'use strict';
var passport = require("passport");
var passportJWT = require('passport-jwt');
var User = require('../models/user');
var config = require('./config');



var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;



/**
 * Encapsulates all code for authentication 
 * Either by using username and password, or by using social accounts
 *
 */
var init = function () {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.jwt.secret;

	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ userName: jwt_payload.userName, socialId: null }, function (err, user) {
			
			if (err) { return done(err); }
			if (!user) {
				return done(null, false);
			}
			return done(null, user);
		});
	}))
	return passport;
}
module.exports = init();