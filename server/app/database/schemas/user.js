'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = "/img/user.jpg";


/**
 * Every user has a username, password, socialId, and a picture.
 * If the user registered via username and password(i.e. LocalStrategy), 
 *      then socialId should be null.
 * If the user registered via social authenticaton, 
 *      then password should be null, and socialId should be assigned to a value.
 */

var UserSchema = new mongoose.Schema({
    socketId: {type: String},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    userName: { type: String, required: true, unique: true },
    email: { type: String, default: null },
    password: { type: String, required: true },    
    socialId: { type: String, default: null },
    picture: { type: String, default: DEFAULT_USER_PICTURE },
    online: { type: Boolean, default: true },
    // frinds: [{ 
    //             id: String,
    //             firstName: String,
    //             lastName: String,
    //             userName: String,
    //             isFrind: Boolean,
    //             date: Date, 
    //             socketId: {type: String, required: true, unique},
    //             unique: true
    //          }]
},{timestamps: true});


/**
 * Before save a user document, Make sure:
 * 1. User's picture is assigned, if not, assign it to default one.
 * 2. Hash user's password
 *
 */

UserSchema.pre('save', function (next) {
    var user = this;

    // ensure user picture is set
    if (!user.picture) {
        user.picture = DEFAULT_USER_PICTURE;
    }


    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/**
 * Create an Instance method to validate user's password
 * This method will be used to compare the given password with the passwoed stored in the database
 * 
 */
UserSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Create a user model
var userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
