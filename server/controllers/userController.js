var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var session = require('cookie-session');
module.exports = {
	index: function(req, res){
		User.findOne({_id: req.session.userID}, function(err, user){
			if(err){
				console.log("could not find user");
			} else {
				console.log("Found users");
				res.json({user: user});
			}
		})
	},
	register: function(req, res){
		console.log('running the register function with post data', req.body)
		var data = req.body;
		User.findOne({email: data.email}, function(err, user){
			if(user){
				res.json({messages: ["email is already registered. Please login or use a different email to register"]})
			} else {
				var encryptedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8));
				var newUser = new User({userName: data.userName, email: data.email, password: encryptedPassword})
				newUser.save(function(err){
					if(err){
						console.log('unable to register new user', err);
						res.json({messages: ['error in creating user. Please try again.']});
					} else {
						// successful register and writing user._id o session
						req.session.userID = newUser._id
						res.json({user: newUser});
					}
				})
			}
		})
	},
	login: function(req, res){
		var data = req.body;
		console.log('running server login ')
		User.findOne({email: data.email}, function(err, foundUser){
			if(!foundUser){
				console.log('Email has not been registered. Please create an account.')
				res.json({messages: ['Email has not been registered. Please create an account.']});
			} else {
				if(bcrypt.compareSync(data.password, foundUser.password)){
					console.log('able to sign in ')
					// successful login and writing user._id o session
					req.session.userID = foundUser._id
					res.json({user: foundUser})
				} else {
					console.login('unable to sign in')
					res.json({messages: ['Incorrect Password']})
				}
			}
		})
	}
}