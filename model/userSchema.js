const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    email : {
        type: String, 
        required:true,
        unique:true
    },  
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        enum : ["ADMIN","STAFF","STUDENT"]
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = { User }