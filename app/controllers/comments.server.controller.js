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

exports.display = function(req,res){
    var email = req.session.student.email;
    //var email = 'sergiobtos@hotmail.com';
    var studentId;
    Student.findOne({email: email}, function(err, student){
        if(err){console.log(err);}
        else{studentId = student._id;}
    }).then( () => {
        Comment.find({student: studentId}, function(err, allComments){
            if(err){console.log(err)}
            res.render("comments", {comments: allComments,email: email,});
        });
    });
};

exports.logout = function (req, res) {
    //destroy the session and redirect user to root path
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });   
};