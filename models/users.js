var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	first_name:{
		type: String,
		required: false
	},
	nick:{
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: false
	},
	password:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: false
	},
	altEmail:{
		type: String
	},
	LastLogin: {
		type: String,
		unique : false,
		default : "Never"
	}
});
module.exports = mongoose.model('users', userSchema);
