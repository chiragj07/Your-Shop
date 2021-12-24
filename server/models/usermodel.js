const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const userSchema = new mongoose.Schema({
        name: {
            type: String,
            minlength: 3,
            require: true,
            lowercase:true
        },
        email:{
            type:String,
            unique:true,
            require: [true,'email is required'],
            lowercase:true,
            validate(val){
                if(!validator.isEmail(val)){
                    throw new Error( 'not a valid email')
                }
            }
        },
        password:{
            minlength:[8,'password must be of 8 characters'],
            type:String,
            require: [true,'password is required'],
        },
        cart: [
            

        ],
        salt: String,
        hash:String
        
    }

)
userSchema.pre('save', async function (next){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, `sha256`).toString(`hex`);
    this.hash = this.password;
    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        var newPass = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha256`).toString(`hex`);
        const checkPassword = newPass=== user.password;
        if(checkPassword){
            return user;

        }else{
            throw new Error('invalid password');
        }

    }
    else{
        throw new Error('invalid email');

    }
}

const User = mongoose.model('user', userSchema);

module.exports= User;