const express = require('express');

const app = express();

let rH1 = (req,res,next) => { 
        console.log("Handling Request No - 1");
        //res.send("Handling Request No - 1");
        next();

    };

let rH2 = (req,res,next) => { 
        console.log("Handling Request No - 2");
        //res.send("Handling Request No - 2");
        next();

    };

let rH3 = (req,res,next) => { 
        console.log("Handling Request No - 3");
        //res.send("Handling Request No - 3");
        next();

    };

let rH4 = (req,res,next) => { 
        console.log("Handling Request No - 4");
        res.send("Handling Request No - 4");
        //next();

    };
    

app.use('/user',[rH1,rH2],rH3,rH4);

app.listen(3004,() => {
    console.log("Server is successfully listening on port 3004");
});