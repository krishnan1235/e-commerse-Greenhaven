import Product from "../models/product.model.js";
import express from "express";

export const postProduct=async(req,res)=>                  
{     
    try {                                                              
    const product=req.body;  // user will send the data          
    if(!product.name||!product.price||!product.image||!product.selling||!product.brand||!product.category||!product.discription)
    {
        res.status(400).json({success:false,message:"provide all fields"});
    }
    const newproduct=new Product(product);
    
        await newproduct.save();
        res.status(201).json({
            success:true,
            data:"Added Successfully!"
        });

    } catch (error) {
        console.log("error occurs:",error.message);
        res.status(500).json({success:false,message:'server error'});
        
    }
};

export const putProduct=async(req,res)=>
    {
        const {id}=req.params;
    
        const products=req.body;
        try {
            const updated=await Product.findByIdAndUpdate(id,products,{new:true});
            res.status(201).json({
                success:true,
                data:updated
            });
        
        } catch (error) {
            res.status(500).json({success:false,message:'server error'});
        }
    };
export const getProduct=async(req,res)=>{
    try{
    const product= await Product.find();// {} means return all the data
    // console.log(product)
    res.status(201).json({
        success:true,
        data:product
    });

    }
    catch(error)
    {
        console.log("error in server");
        res.status(500).json({success:false,message:"srever error"});
    }
};

export const deleteProduct=async(req,res)=>{
  
    const {id}= req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"product deleted"});
    } catch (error) {
        res.status(404).json({success:false,message:"Product not found"});
    }
};