const router = require("express").Router();
const { authenticate,permission } = require("../../jwt_auth/auth");


router.get("/",[authenticate,permission("USER")],(req,res) => {
    res.json({
        message : "Student records"
    })
})




module.exports = router;