const express = require('express');
const connectDB = require("./config/database");
const User = require("./Models/user");
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('./utils/validation');

const app = express();

app.use(express.json());
app.post("/signup", async(req,res) =>{
   try{
       //validation of user
       validateSignUpData(req);

       const {firstName,lastName,emailId,password} = req.body;

       //Encrypt the password
       const passwordHash = await bcrypt.hash(password,10);
       console.log(passwordHash);
    
       //creating new instance of the user model
       const newUser = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash
       });

       await newUser.save();
       res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});

app.post("/login", async(req,res) =>{
    try{
       const {emailId, password } = req.body;
       const user = await User.findOne({emailId : emailId});

       if(!user){
         throw new Error("Invalid Credential");
       }

       const isPasswordValid = await bcrypt.compare(password,user.password);

       if(isPasswordValid){
        res.send("Login SuccessFull");
       }else{
        throw new Error("Invalid Credential");
       }

    }catch(err){
       res.status(400).send("Error: " + err.message);
    }
})

//Feed API
app.get("/feed", async(req,res) => {

    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("something went wrong!! data not found");
    }
})


// Delete API
app.delete("/user",async(req,res) =>{

    const userId = req.body.userId;
    try{

        const user = await User.findByIdAndDelete({_id:userId});
       // const user = await User.findByIdAndDelete(userId);  // shorthand version of above 

        res.send("user deleted successfully");

    }catch(err){
        res.status(400).send("Something went wrong");
    }

});

//update user

app.patch("/user/:userId",async (req,res) =>{
    const userId = req.params?.userId;
    const data = req.body;

     try{
        const Allowed_Updates = ["photoUrl","about","gender","age","skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => Allowed_Updates.includes(k));
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }

        if (data?.skills && data.skills.length > 10) {
         throw new Error("Skills cannot be more than 10");
        }

        const updateUser = await User.findByIdAndUpdate(userId,data,{
            new: true, // return updated doc
            runValidators: true,
        })
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated successfully", data: updatedUser });

    }catch(err){
        res.status(400).send("Update Failed"+err.message);
    }
})



connectDB().then(async () => {
    console.log("Database connection established");
   
    app.listen(3004,() => {
    console.log("Server is successfully listening on port 3004");
});

  

})
.catch((err) => {
    console.error("Database can not be connected",err);
});




