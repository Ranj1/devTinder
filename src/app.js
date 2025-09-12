const express = require('express');

const app = express();



app.use('/hello',(req,res) => {

    res.send("Hello from the server ranjana ");

});

app.use('/namaste',(req,res) => {

     res.send("Namaste from the server");


});
app.use('/',(req,res) => {

     res.send("Home from the server");

});


app.listen(3004,() => {
    console.log("Server is successfully listening on port 3004");
});