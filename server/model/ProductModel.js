import mongoose from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
ProductName:{
    type:String,
    required:true,
    
},
img:{
    type:String,
    required:true,
},
RentPrice:{
    type:Number,
    required:true,
},
Category:{
    type:String,
}
,
Desc:{
    type:String,
    required:false,
}
},{
    timestamps:true
});

export default mongoose.model("Product",productSchema)