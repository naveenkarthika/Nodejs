const mongoose = require("mongoose");

const RecordsSchema = mongoose.Schema({
   
    register_no : {
        type : String,
        required :true
    }, 
    name : {
        type : String,
        required :true
    },
    subject : {
        type : String,
        required :true
    },  
    mark : {
        type : String,
        required : true
    },
    email : {
        type: String, 
        required:true,
        unique:true
    },
    userType : {
        type : String,
        enum : ["STUDENT"]
    }
});

const Records = mongoose.model('Records',RecordsSchema);

module.exports = { Records }