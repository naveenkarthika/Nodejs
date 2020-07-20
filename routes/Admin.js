const router = require("express").Router();


router.get("/",(req,res) => {
    res.json({
        message : "Admin panel"
    })
})




module.exports = router;