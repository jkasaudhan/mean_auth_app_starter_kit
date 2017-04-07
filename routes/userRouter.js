var express = require('express');
var router = express.Router();
var UserModel = require('../models/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var passport = require('passport');

///BASE_URL/api/v1/users
router.get('', function(req, res, next) {
    res.send('Get all users.');
    UserModel.getUserByUsername('userjiten', function(err, data) {
       // res.json(data);
    });
    
});

///BASE_URL/api/v1/users/register
router.post('/register', function(req, res, next) {
    //console.log('req body: ', req.body);
    var newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    
    UserModel.addUser(newUser, function(err, user) {
        if(err) {
            req.send({code: '400', status: 'error', message: 'Failed to create user', data: {}});
        }else {
            res.send({code: '200', status: 'success', message: 'User created successfully!!', data: {}});
        }
    });
    
});

//BASE_URL/api/v1/users/789
router.get('/:id', function(req, res) {
    console.log(' user id: ', req.params);
    res.send('Get single user: ');
});

//BASE_URL/api/v1/users
router.post('', function(req, res) {
    res.send('Create or update user.');
});

//BASE_URL/api/v1/users
router.delete(function(req, res) {
  res.send('Delete user');  
});

//BASE_URL/api/v1/users/34/profile
router.get('/:uid/profile', passport.authenticate('jwt', {session: false}) ,function(req, res, next) {
    res.json({
                code: '200',
                status: 'success', 
                data: {
                     user: req.user
                }
            });
});

//BASE_URL/api/v1/users/authenticate
router.post('/authenticate', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    UserModel.getUserByUsername(username, function(err, user) {
        if(err) throw err;
        if(user) {
            UserModel.comparePassword(password, user.password, function(err, isMatched) {
                if(err) throw err;
                if(isMatched) {
                    //User is valid user
                    var tkn = jwt.sign(user, config.secret, {
                        expiresIn: 604800
                    });
                    res.json({
                        code: '200',
                        status: 'success', 
                        data: {
                             token: 'JWT ' + tkn,
                             user: {
                                 id: user._id,
                                 name: user.name,
                                 username: user.name,
                                 email: user.email
                             }
                        }
                    });
                }
            });
        } else {
            res.json({code: '400', status: 'error', message: 'Wrong username or password', data: {}});
        }
    });
    
    
   
});

module.exports = router;