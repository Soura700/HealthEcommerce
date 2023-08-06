const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Number,
        default:0 ///For futute purpose
    },
    token:{
        type:String,
        default:'',
        unique:true,
    },
    isAdmin:{
        type:Number,
        default:0
    },
    curretnLoginTime:{
        type : Date,
        default:null,
    },
    lastLoginTime:{
        type:Date,
        default:null
    }
},{timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);