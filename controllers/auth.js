var env=require('../config/evnironments.json');
var User=require('../models/user');
var request=require('request');
var passport = require('passport')
    ,  OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('provider', new OAuth2Strategy({
        authorizationURL: 'http://localhost:3000/api/oauth2/authorize?response_type=code',
        tokenURL: 'http://localhost:3000/api/oauth2/token',
        clientID: 'tivo',
        clientSecret: '123',
        callbackURL: 'http://localhost:8000/redirect',
        customHeaders : { Authorization: 'Basic '+ env.encodedIdSecret }
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        var options = {
            url: 'http://localhost:3000/api/users?id='+accessToken.userId,
            headers: {
                'User-Agent': 'request',
                'Authorization': 'Bearer ' + accessToken.value
            }
        };


        request(options, function (error, response, body) {
            console.log(body);
            if(error){
                console.log(error);
            }
            else{
                var data=new User({
                    value:accessToken.value,
                    clientId:accessToken.clientId,
                    userId:accessToken.userId,
                    _id:accessToken._id,
                    userDetails:body
                });
                User.findOrCreate(data,function (err,user) {
                    done(err,user);
                })
            }
        });

    }
));

module.exports.isAuthenticated =function (req,res,next) {
    if(req.isAuthenticated()){
        console.log(req.user);
        next();
    } else{
        res.redirect("/login");
    }
};

module.exports.isUnAuthenticated =function (req,res,next) {
    if(req.isAuthenticated()){
        console.log(req.user);
        res.render("dashboard",{user:JSON.parse(req.user.userDetails)});
    } else{
        next();
    }
};

module.exports.authenticateSuccessFailure = passport.authenticate('provider', { successRedirect: '/',
    failureRedirect: '/failed' });

module.exports.authenticate = passport.authenticate('provider');

module.exports.logout = function (req,res) {
    req.logout();
    res.redirect('/');
};