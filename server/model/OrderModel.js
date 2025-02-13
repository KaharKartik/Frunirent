import mongoose from "mongoose";
const {Schema} = mongoose;

const OrderSchema = new Schema({
    ProductId:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:false
    },
    title:{
        type:String,
        required:true

    },
    BuyDate:{
        type:Date,
        require:true
    },
    FirstDate:{
        type:Date,
        require:true
    },
    LastDate:{
        type:Date,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    sellerId:{
        type:String,
        required:true
    },
    buyerId:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default: false
    },

    payment_intent:{
        type:String,
        required:false
    },     
},{
    timestamps:true
});
export default mongoose.model("Order",OrderSchema)