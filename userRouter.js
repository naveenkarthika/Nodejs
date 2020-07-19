const router = require("express").Router();
const { User } = require("./model/userSchema");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");



router.post("/register", async function (req, res, next) {
    
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

// router.post("/register",async (req,res) => {
//     // try{
//     //     var emailExist = await User.findOne({email:req.body.email});

//     //     if(emailExist)
//     //     {
//     //         return res.status(400).json("Email already exist");
//     //     }
//     //     //password Hash 
//     //     var hash = await bcryptjs.hash(req.body.password,10);

//     //     const user = new User({
//     //         name:req.body.name,
//     //         eamil:req.body.email,
//     //         password:hash  
//     //     })
//     //     var data = await user.save();
//     //     res.json(data);
//     // }catch(err){
//     //    res.status(400).json(err)
//     // }      
// });

module.exports = router;