const mongoose = require('mongoose');

 const validator = require('validator');

 const bcrypt = require('bcryptjs');

 const jwt = require('jsonwebtoken');

 const crypto = require('crypto');

const userSchema = new mongoose.Schema({

   
    enrollment_id:{
        type:String,
        required:[true,"Please Enter Your Email Address"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please Enter password"],
        minLength:[8,"Password should be greater than 8 passwords"],
        select: false, 
    },
    
    role:{
        type:String,
        default:"user",
    },
   
});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password =await bcrypt.hash(this.password,10);

});

userSchema.methods.getJWTToken = function () { 
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });

};



userSchema.methods.comparePassword = async function(enteredPassword){
    
     return await bcrypt.compare(enteredPassword,(this.password));
}

// userSchema.methods.getResetPasswordToken = function (){
//     const resetToken = crypto.randomBytes(20).toString("hex");
    
//     this.resetPasswordToken = crypto
//                               .createHash("sha256")
//                               .update(resetToken)
//                               .digest('hex');

//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     return resetToken;
// }

module.exports = mongoose.model("User",userSchema);