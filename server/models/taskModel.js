var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	owner: {type: Schema.Types.ObjectId, ref: "User"},
	status: {type: Number, required: true}
}, {timestamps: true})

var Task = mongoose.model('Task', TaskSchema)