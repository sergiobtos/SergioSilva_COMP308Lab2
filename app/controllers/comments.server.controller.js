const session = require('express-session');
const Student = require('mongoose').model('Student');
const Comment = require('mongoose').model('Comment');

exports.displayForm = function (req, res){
    var session = req.session;
   if(session.student){
    res.render("submit_comments", {
        student: session.student,
        msg: session.msg,
    });
   }else{
       res.redirect("/signin");
   }
    
};

exports.createComment = function(req, res, next){
    var session = req.session;
    //var comment = req.body.comment;
    const comment = new Comment({...req.body, student:session.student});
    comment.save((err) =>{
        if(err){
        return next(err);
        }else{
            res.render('thankyou', {
                title: 'Thank You',
                firstName: session.student.firstName,
                comment: comment.comment,
            });
        }
    });  
};



/*exports.display = function(req,res){
    var email = req.session.email;
    var studentId;
    Student.findStudentByEmail(email, function(err, student) {
        if(err){
            return getErrorMessage(err);
        }
        studentId = student._id;
    }).then( () => {
        Comment.findAllByStudentId(studentId, function (err, allComments){
            if(err){
                return getErrorMessage(err);
            }
            res.render("comments", {
                comments: allComments,
                email: email,
            });
            next();
        });
    });
};

exports.userByEmail = function ( req, res, next){
    var email = req.session.email;
    Student.
        findOne({email: email}, (err, student) => {
            if(err) {return getErrorMessage(err);}
            req.id = student._id;
            console.log(req.id);
        }).then (function (){
            Comment.find({
                student: req.id
            }, (err, comments) =>{
                if(err) { return getErrorMessage(err);}
                res.render('comments', {
                    comments : comments,
                    email : email
                });
            });
        });
};*/