var comment = require('../controllers/comments.server.controller');

module.exports = function (app){
    app.get("/submit_comments", comment.displayForm );

};