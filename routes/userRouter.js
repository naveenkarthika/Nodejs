const router = require("express").Router();
const { User } = require("../model/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.post("/register", async function (req, res, next) {
    req.body.userType = "USER";
    
    bcryptjs.genSalt(10, function (err, salt) {
        if (err) throw err;
        bcryptjs.hash(req.body.password, salt, async function (err, hash) {
            if (err) throw err;
            req.body.password = hash;
            let user = new User(req.body);
            try {
                var emailExist = await User.findOne({ email: req.body.email });

                if (emailExist) {
                    res.status(400).json({
                        message:"Email already exist"
                    });
                }
                await user.save();
                res.status(200).json({
                    message: "User Created",
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "User not created",
                });
            }
        });
    });
});

router.post("/login",async (req,res) => {
    console.log(req.body)
    let user = await User.findOne({ email: req.body.email });
    if(user){
        bcryptjs.compare(req.body.password,user.password, function (err,result){
            if(err) throw err;
            if(result){
                jwt.sign({ id:user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" },
                    function (err,token){
                        if(err) throw err;
                        res.status(200).json({
                            message: "Correct",
                            token : token
                        })
                })
            }else{
                res.status(400).json({
                    message: "Password Wrong"
                })
            }
        })  
    }else{
        res.status(401).json({
            message: "User not found"
        })
    }

});

router.get("/info",async (req,res) => {
    let userData = await User.find().select(['-password']);
    res.json(userData)
});


module.exports = router;