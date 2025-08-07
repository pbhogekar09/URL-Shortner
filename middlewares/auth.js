const {getUser} = require("../service/auth");

function checkForAuthentication(req,res,next){

    const tokenCookie = req.cookies?.token;
    req.user = null; // Initialize user to null

    if(!tokenCookie)  return next();
    

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user; // Attach user to request object
    return next();
}

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) 
            return res.redirect("/login");
      
        if(!roles.includes(req.user.role))
            return res.end("Unautharized");
        
        return next();
    };
}

module.exports = { checkForAuthentication,restrictTo };