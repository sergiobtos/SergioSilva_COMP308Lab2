const Student = require('mongoose').model('Student');

exports.render = function ( req, res){
    res.render('index', {
        title: 'Lab3 - MongoDB',
    });
};

exports.signInView = function ( req, res){
    res.render('signin', {
        title: 'Lab3 - MongoDB',
        msg: false,
    });
};

exports.signUpView = function ( req, res){
    res.render('signup', {
        title: 'Lab3 - MongoDB',
    });
};

exports.create = function( req, res, next){
    console.log(JSON.stringify(req.body));
    const student = new Student(req.body);
    console.log(student);
    student.save((err) =>{
        if(err){
        return next(err);
    }else{
        res.render('index', {
            title: 'Lab3 - MongoDB',
        });
    }
    });
};

exports.findById = function (req, res) {
    var session = req.session;
    session.email = req.body.email;
	Student.findOne({
		email: session.email 
	}).then(student => {
        if(student){
            session['student'] = student;
            session.msg = false;
            res.redirect("/submit_comments");
        }else{
            res.render("signin", {
                msg: 'No student found!',
                title: 'Sign In Page',
            });
        }
    })
};
/*
exports.findAll = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    User.find({}, (err, students) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('listall', {
                title: 'List All Users',
                students: students
            });
        }
    });
};*/