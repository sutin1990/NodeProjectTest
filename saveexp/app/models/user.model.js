var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    firstName:String,
    lastName: String,
    userName:{type:String,unique:true,required:'Username is required',trim:true},
    Email:{type:String,index:true},
    password:{
        type:String,
        validate:[
            function(password){
                return password && password.length>=6;
            },
            'Password must be at least 6 characters'
        ]
    },
    salt:{
        type:String
    },
    provider:{
        type:String,
        required:'Provider is required'
    },
    providerId:String,
    providerData:{},

    created:{type:Date,default:Date.now}
});

UserSchema.pre('save',function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.method.hashPassword = function(password){
    return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64');
};

/* UserSchema.pre("save",function(next,done){
    if(this.password){
     var salt_ran = new Buffer(this.genRandomString(16));
     var passwordData = this.sha512(this.password, salt_ran);
     console.log('Userpassword :'+this.password);
     console.log('PassowrdHash :'+passwordData.passwordHash);
     console.log('Salt :'+passwordData.salt);
     console.log('============================');
     this.password = passwordData.passwordHash;
     this.salt = passwordData.salt;
    }
    next();
   });
   
   UserSchema.methods.genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
   };
   
   UserSchema.methods.sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return{
     salt:salt,
     passwordHash:value
    };
   }; */

UserSchema.method.authenticate = function(password){
    return this.password === this.hashPassword(password);
};

mongoose.model('User',UserSchema);