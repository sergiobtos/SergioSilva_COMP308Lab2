const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    courseCode: String,
    courseName: String,
    program: String,
    semester: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
});

/*UserSchema.statics.findAllByStudentId = function(id, callback) {
	// Use the 'findOne' method to retrieve a user document
	this.findOne({
		student: id
	}, callback);
};*/
/*StudentSchema.set('toJSON', {
	setters: true,
	virtuals: true
});*/

mongoose.model('Comment', CommentSchema);
