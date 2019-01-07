const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const _     = require('lodash');
const UserSchema = new mongoose.Schema({
    username :{
        type:String,
        unique:true,
        trim:true,
        required:true,
        minlength:1        
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            require:true
        },
        token:{
            type:String,
            require:true
        }
    }]
})

//instance method
UserSchema.methods.toJSON =function(){
    let user = this
    let userObject= user.toObject()
    return _.pick(userObject,['_id','username']);
}

UserSchema.methods.generateAuthToken =function(){
    let user =this;
    let access ='auth'
    let token = jwt.sign({_id:user._id.toHexString() , access}, process.env.SECRET ).toString()

    user.tokens.push({
        access,
        token
    })

   return  user.save().then(()=>{
        return token
    })
}



// Model Method
UserSchema.statics.findByToken =function(token){
    let User =this;
    let decoded;
    try {
        decoded =jwt.verify(token ,process.env.SECRET)
    } catch (error) {
        return Promise.reject()
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
    
}
const  User= mongoose.model('User' ,UserSchema);
module.exports  = {User}