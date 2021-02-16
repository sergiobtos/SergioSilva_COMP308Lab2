// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
const StudentSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		// Set an email index
		index: true,
        unique: true,
		// Validate the email format
		match: /.+\@.+\..+/
	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			(password) => password.length >= 6,
			'Password Should Be Longer'
		]
	}
});
/*
UserSchema.statics.findStudentByEmail = function(email, callback) {
	// Use the 'findOne' method to retrieve a user document
	this.findOne({
		email: email
	}, callback);
};*/

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
/*StudentSchema.set('toJSON', {
	setters: true,
	virtuals: true
});*/

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Student', StudentSchema);
