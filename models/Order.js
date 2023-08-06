const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {

    userData: {
      type: mongoose.Schema.Types.ObjectId, 
      // ref:'User' , //Will refer to the User table and will get the data ... 
      required: true,
    },

    order:{
      type: mongoose.Schema.Types.ObjectId, 
      //Will refer to the Cart collection and will get the data ...
      required: true,
    },
    order_detail:{
      type:Object,
      require:true,
    },
    user_detail:{
      type:Object,
      require:true
    },
    status:{
      type:Number,//0->Not delivered 1->Delivered 2->Cancelled By user 3->Cancelled by company
      default:0
    },
    paymentWay:{
      type:String,
    },
    discount:{
      type:Number,
      default:0,
    },
    priceAfterDiscount:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

