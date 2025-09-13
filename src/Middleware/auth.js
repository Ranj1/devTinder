

 const adminAuth= (req,res,next) => {

    console.log("Admin auth is getting checked");

    const token = req.body.token;

    console.log(token);

    const isAdminAuthorized = token === 'xyz'

    if(!isAdminAuthorized){

        res.status(401).send("unauthorized User");

    }else{
        next();
    }

};

 const userAuth= (req,res,next) => {

    console.log("User auth is getting checked");

    const token = req.body.token;

    console.log(token);

    const isAdminAuthorized = token === 'xyz'

    if(!isAdminAuthorized){

        res.status(401).send("unauthorized User");

    }else{
        next();
    }

};


module.exports  = {
    adminAuth:adminAuth,
    userAuth : userAuth

}