const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required:true,
        maxLenth:50,
        minLength:4
    },
    lastName: {
        type: String,

    },
    emailId: {
        type: String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address " + value);
            }
        }
    },
    password: {
        type: String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password " + value);
            }
        }
    },
    age: {
        type: String,
        max:50,
        min:18
    },
    gender: {
        type: String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Gender data is not valid");
                
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://images.unsplash.com/photo-1497316730643-415fac54a2af?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("Not a valid Photo URL");
            }
        }
    },
    about:{
        type:String,
        default: "This ia a default about of the user"

    },
    skills:{
        type:[String]
    }},
    {timestamps:true}
);

userSchema.methods.getJWT = async function (){

    const user = this;

    const token = jwt.sign({_id:user._id},"Ranjana@123$" ,{expiresIn: "1m"});

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
      const user = this;
      const passwordHash = user.password;


      console.log("hello world.  " + passwordInputByUser  + "=============" +passwordHash);
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash); // alaways pass z

    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);