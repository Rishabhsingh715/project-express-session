const express = require('express');

const router = express.Router();
console.log('router loaded');

const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');



router.get('/',function(req,res){
    
    

    if(req.isAuthenticated()){
       
        
        res.render('profile',{
            content: req.user
        });
      

    }
    else
    res.render('index');
});

router.get('/go', function(req, res){

    res.render('home');
});


router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),function(req,res){

    let user = User.findOne({username: req.body.username}, function(err, user){
        if(err){
            console.log('error in finding user', err);
        }
        // req.session.userid = user.username; //old method we can now do this using the passport serializer.

        res.render('profile',{
            content: user
        });

    });
  

    
    // res.end(`<h1>Welcome back bro ${req.body.username}</h1>`);

});

//creating the session here
router.post('/sign-up',function(req,res){
   
    let user = User.findOne({username: req.body.username}, function(err, user){
        if(err){
            console.log('error in finding user', err);
        }
        if(!user || user == null){

            User.create(req.body, function(err, user){
            if(err){
                console.log('error in creating user', err);
            }
            console.log(user);
             return res.end(`<h1>New user created: ${user.username}</h1>`);
            });
        }
        if(user){
           return res.end(`<h1>welcome back: ${user.username}</h1>`);
        }
    });
});

router.get('/logout', function(req,res)  {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router
