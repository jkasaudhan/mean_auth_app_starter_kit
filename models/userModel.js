var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
});

var UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;

module.exports.getUserById = function(uid, callback) {
   UserModel.findById(uid,callback);
}

module.exports.getUserByUsername = function(username, cb) {
    UserModel.findOne({username: username}, cb);
}

module.exports.addUser = function(newUser, cb) {
    //encrypt password and save it
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hashedPWD) {
            if(err) throw err;
            newUser.password = hashedPWD;
            newUser.save(cb);
        });
    });
}

module.exports.comparePassword = function(plainPwd, hashPwd, cb) {
    bcrypt.compare(plainPwd, hashPwd, function(err, isMatched) {
        if(err) throw err;
        
        cb(null, isMatched);
    });
}