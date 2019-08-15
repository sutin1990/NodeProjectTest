module.exports = function(app){
    var index = require('../controllers/index.controller.js');
    app.get('/',index.render);
};