const express = require('express');

const app = express();

app.use('/user',(req,res) => {
    res.send("ha ha ha");
})

app.get('/user',(req,res) => { 

    res.send({'firstName': "Ranjana","LastName": "Tiwari"})
});

app.post('/user',(req,res) => { 

    console.log("Data saved Successfully");
    res.send("Data saved Successfully");

});

app.delete('/user',(req,res) => { 

    console.log("Data deleted Successfully");
    res.send("Data deleted Successfully");

});

app.patch('/user',(req,res) => { 

    console.log("Data patched Successfully");
    res.send("Data patched Successfully");

});

app.put('/user',(req,res) => { 

    console.log("Data put Successfully");
    res.send("Data put Successfully");

});

app.use('/test',(req,res) => {

     res.send("Home from the server");

});



app.listen(3004,() => {
    console.log("Server is successfully listening on port 3004");
});