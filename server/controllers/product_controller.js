import Product from "../model/ProductModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

// REGISTER

export const createProduct = async (req,res,next)=>{


  console.log(req.isSeller);
    if(!req.isSeller) 
    return res.status(403).send({message:"Only seller can create Product"})

    const newProduct = new Product({
        userId:req.userId,
        ...req.body
    });
    try {
        const saveProduct = await newProduct.save();
        res.status(201).json(saveProduct)
    } catch (error) {
      console.log(error);
        res.status(500).send({message:"something went wrong while creating product please try again after some time"})
    }
}

export const deleteProduct = async (req,res,next)=>{

  try {
      const nproduct = await Product.findById(req.params.id);

      if(nproduct.userId!== nproduct.userId)
      return res.status(403).send("you can delete only your gig");
      await Product.findByIdAndDelete(req.params.id)
      return res.status(200).send("Product deleted successfully done.")
  } catch (error) {
    res.status(500).send({message:"something went wrong while creating product please try again after some time"})
  }

}

export const getProduct = async (req,res,next)=>{
  try {
      const nproduct = await Product.findById(req.params.id);
     if(!nproduct) next(createError(404,"product not found ."))
      res.status(200).send(nproduct)
  } catch (error) {
    res.status(500).send({message:"something went wrong while creating product please try again after some time"})

  }

}

export const getProducts = async (req,res,next)=>{
  const q  =req.query;
  const filter = {
      ...(q.userId && { userId:q.userId} ),
      ...(q.cat && { cat:q.cat} ),
      ...( (q.min||q.max) && {price:{...( q.min && {$gt:q.min} ),...( q.max && {$lt:q.max} )},
  }),
      ...(q.search && { title:{ $regex:q.search, $options: "i" } })
     
  }
  try {
      const nproduct = await Product.find(filter).sort({[q.sort]: -1});
      res.status(200).send(nproduct)
  } catch (error) {
    res.status(500).send({message:"something went wrong while creating product please try again after some time"})
  }

}
