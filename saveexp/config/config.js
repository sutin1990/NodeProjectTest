//module.exports = require('./env/'+process.env.NODE_ENV+'.js');
module.exports= {
    debug:true,
    mongoUri:'mongodb://localhost/players',
    sessionSecret:'dev_secret_key'
};