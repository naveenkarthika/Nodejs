const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    console.log(req.headers)
    if (req.headers.auth) {

        jwt.verify(req.headers.auth, process.env.JWT_SECRET, function (err, decoded) {
            console.log(decoded);
            if (decoded == undefined) {
                res.status(401).json({
                    message: "Invalid User"
                });
            }
            else {
                req.userId = decoded.id;
                req.userType = decoded.type;
                next();
            }
        });
    } else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }

}

function permission(...allowedUser) {
    const isAllowed = (role) => allowedUser.indexOf(role) > -1;
  return (request, response, next) => {
    if (request.userType && isAllowed(request.userType)) {
      next();
    } else {
     response.status(401).json({
        message: "Permission denied",
      });
    }
  };
}

module.exports = { authenticate, permission };