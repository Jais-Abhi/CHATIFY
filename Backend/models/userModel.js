import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    name :{
        type : String,
        default :null
    },
    profile :{
        path : {
            type :  String,
            default :null
        },
        filename :{
            type : String,
            default : null
        }
    }
},{timestamps : true})

const User = mongoose.model("User",userSchema)

export default User