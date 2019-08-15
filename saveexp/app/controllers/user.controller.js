var User = require('mongoose').model('User');

exports.create=function(req,res,next){//create user
    var user = new User(req.body);

    user.save(function(err){
        if(err){
            return next(err);
        }else{
            res.json(user);
        }
    });
};

exports.list=function(req,res,next){//select user
    User.find({},function(err,users){
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    });
};

exports.read = function(req,res){
   res.json(req.user);
};

exports.update = function(req,res,next){
    User.findOneAndUpdate({
        userName:req.user.userName
    },req.body,function(err,users){
        if(err){
            return next(err);
        }else{
            res.json(users);
        }
    });
};

exports.delete = function(req,res,next){
    req.user.remove(function(err){
        if(err){
            return next(err);
        }else{
            res.json(req.user);
        }
    });
};

exports.userByUsername = function(req,res,next,username){
    User.findOne({
        userName:username
    },function(err,users){
        if(err){
            return next(err);
        }else{
            req.user = users;
            next();
        }
    });
};



exports.login=function(req,res){
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();

    if (errors){
        res.render('index',{
            title:'There have been validation errors: ' + JSON.stringify(errors[0].msg),
            isLoggedIn:false
        });
        return;
    } //ดัก error ก่อน

    if(req.body.remember === 'remember'){
        req.session.remember = true;
        req.session.email = req.body.email;
    }
    console.log(req.body);
    console.log('Email:'+req.body.email);
    console.log('Password:'+req.body.password); // print ค่าต่างๆในbody ออกมา

    res.render('index',{//ข้อมูลที่ใส่มาไม่error ให้ login ผ่าน
        
        title:'Loged in as: '+ req.body.email,
        isLoggedIn:true
    });
};

exports.logout=function(req,res){
    req.session=null;
    res.render('index',{
        title:'See you again later',
        isLoggedIn:false
    });

};

exports.renderSignup =  function(req,res){
    res.render('signup',{
        title:'sign up'
    });
};

exports.signup = function(req,res,next){
    console.log(req.body);
    if(!req.user){
        var user = new User(req.body);
        user.provider = 'local';

        user.save(function(err){
            if(err) {
                return res.redirect('/signup');
            }else{
                req.login(user,function(er){
                    if(er) return next(er);
                    return res.redirect('/');
                });
            }
            
        });
    }else{
        return res.redirect('/');
    }
};