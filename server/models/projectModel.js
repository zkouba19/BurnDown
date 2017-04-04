var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProjectSchema = new mongoose.Schema({
	name: {type: String, required: true},
	owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
	collaborators: [{type: Schema.Types.ObjectId, ref: "User"}],
	tasks: [{type: Schema.Types.ObjectId, ref: "Task"}]
}, {timestamps: true})

var Project = mongoose.model('Project', ProjectSchema);