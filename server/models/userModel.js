var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	userName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);