var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./database');
var UserModel = require('../models/userModel');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        UserModel.getUserById(jwt_payload._doc._id, function(err, user) {
            if(err) done(err, false);
            
            if(user){
                done(null, user);
            }else {
                done(null, false);
            }
        });
    }));
}