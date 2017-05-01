var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	userName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	friends: [{type: Schema.Types.ObjectId, ref: "User"}],
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);