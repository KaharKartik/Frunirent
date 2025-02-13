import Order from "../model/OrderModel.js"
import Product from "../model/ProductModel.js"

export const createOrder = async(req,res,next)=>{
    try {
        console.log(req.params.productId);
        const product =await Product.findById(req.params.productId)
        console.log(product);
        if (product) {
            
            const newOrder =  new Order({
                ProductId : product._id,
                img: product.img,
                title:product.ProductName,
                buyerId:req.userId,
                sellerId:product.userId,
                price:product.RentPrice,
                payment_intent:"temperayoff"
            }); 
            const neworder = await newOrder.save();
            return res.status(200).send({success:true,neworder})
        }
        
       
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"something went wrong while creating product please try again after some time"})

    }
}

export const getOrder = async(req,res,next)=>{
    try {
        const orders =await Order.find({
            ...(req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}),
            isCompleted:true});
            res.status(200).send(orders)
    } catch (error) {
        next(error)
    }
}