const mongoose = require("mongoose")

const CouponSchema = new mongoose.Schema({

    couponname:{
        type:String,
        required:true,
        // unique:true,
        uppercase:true
    },
    discount:{
        type:Number,
        required:true,
        // unique:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    use:{
        type:Number, // 0->Not applied  1->pending (pending for the checkout...and buying ) 2->  used   (will not be able to use for second time)
        default:0
    },userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true}

);

module.exports = mongoose.model("Coupon",CouponSchema);