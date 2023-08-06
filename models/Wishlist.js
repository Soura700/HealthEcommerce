const mongoose = require("mongoose")

const WishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    wishlistProducts:[
        {
             product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                default:1,
            },
            productname:{
                type:String,
                required:true,
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
    wishlistItemCount:{
        type:Number,
        default:0,
    },
},{timestamps:true}
);

module.exports = mongoose.model("Wishlist",WishlistSchema);