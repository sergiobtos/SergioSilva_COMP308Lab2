const Student = require('mongoose').model('Student');

exports.render = function ( req, res){
    var session = req.session;
    console.log(JSON.stringify(session));
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
   // console.log(JSON.stringify(req.body));
    const student = new Student(req.body);
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

exports.getAllStudents = function (req, res, next) {

    Student.find({}, (err, students) => {
        if (err) {

            return next(err);
        } else {

            res.render('students', {
                students: students,
            });
        }
    });
};