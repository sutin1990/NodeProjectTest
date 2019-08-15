exports.render=function(req,res){
    //res.send('Hello World');
   /* var isLoggedIn = false;
    
    if(typeof req.session.remember !== 'undefined'){
        isLoggedIn=req.session.remember;
    }*/
    
    res.render('index',{ 
        title:'Hello World',
        username:req.user ? req.user.username:''
        //message:'How are thingsxxxx',
        //isLoggedIn:isLoggedIn
    })
    //res.render('index', { title: 'Hello World', message: 'How are things'})
};