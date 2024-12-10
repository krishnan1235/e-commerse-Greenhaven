import mongoose from "mongoose";

const loginschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{ 
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true} //it is for because of created as uptated at time will be shown
);

const Users = mongoose.model("login_auth", loginschema);
export default Users;