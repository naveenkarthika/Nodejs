const jwt = require("jsonwebtoken");

function authenticate(req,res,next){
    if(req.header.authorization){
        jwt.verify(req.header.authorization,process.env.JWT_SECRET,function(err,decsode){
            console.log(decoded);
        })
    }
}

module.exports = authenticate;