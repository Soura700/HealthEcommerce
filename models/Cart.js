const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cartProducts:[
        {
             product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            productname:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                default:1,
            },
            productPrice:{
                type:Number,
                required:true
            },   
             img:{
                type:String,
                required:true,
            },  
        }
    ],
    cartItemCount:{
        type:Number,
        default:0,
    },
    totalPrice:{
        type:Number,
        default:0
    },
    coupon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Coupon',
        default:null
    }
    
},{timestamps:true}
);

module.exports = mongoose.model("Cart",CartSchema);