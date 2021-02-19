const student = require('../controllers/student.server.controller');
const comment = require('../controllers/comments.server.controller');

module.exports = function (app){

    app.get('/', student.render);
    app.get('/logout', student.render);

    app.get('/signin', student.signInView);
    app.post('/signin', student.findById);

    app.get('/signup', student.signUpView);
    app.post('/signup', student.create);

    app.get('/students', student.getAllStudents);
    
};