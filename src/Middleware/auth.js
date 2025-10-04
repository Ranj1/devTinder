const jwt = require("jsonwebtoken");
const User = require("../Models/user")

const userAuth= async (req,res,next) => {
     try{
        //Get Token
        let {token} = req.cookies; //// extract the string value
        if(!token){
            throw new Error("Invalid Token");
        }
        
        console.log(token);
        //verify Token
        const decodeObj = jwt.verify(token , "Ranjana@123$");

        const {_id} = decodeObj;
 
        //verify User
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User Not found.")
        }
        req.user = user; // attach user to request (good practice)
        next();
    }catch(err){
        res.status(400).send("Errorrr : " + err)
    }



};


module.exports  = {userAuth : userAuth}