const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username:{
        type:String,
        require:[true,"please add the user name "]
    },
    email:{
        type:String,
        require:[true,"please add the User email "],
        unique:[true,'email address already taken ']
    },
    password:{
        type:String,
        require:[true,"please add the User passowrd"]
    }

},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)