import mongoose from "mongoose";

const productschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    selling:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true} 
);

const Product = mongoose.model("e-commerse-website", productschema);
export default Product;