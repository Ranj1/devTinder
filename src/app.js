

const express = require('express');
const app = express();

const {adminAuth,userAuth}  = require("./Middleware/auth");

// Parse JSON body
app.use(express.json());

app.use("/admin",adminAuth);


app.post("/user/logIn",userAuth,(req,res) => {
    console.log("User LoggedIn SuccessFully");
    res.send("User LoggedIn SuccessFully"); 
})
app.post("/user/getAllUser",userAuth,(req,res) => {
    console.log("get all user data");
    res.send("get all user data"); 
})

app.post("/admin/getAllData",(req , res) => {
    console.log("get all data");
    res.send("All Data Sent");
});

app.post("/admin/deleteAllUser",(req , res) => {
    res.send("deleted a User");
});

app.listen(3004,() => {
    console.log("Server is successfully listening on port 3004");
});