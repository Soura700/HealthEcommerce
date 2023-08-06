const mongoose = require("mongoose");
const Order = require("../models/Order");
const User = require("../models/User");
const router = require("express").Router();
const ObjectId = mongoose.Types.ObjectId;
const Coupon = require("../models/Coupon");



async function fetchUserDetails(userIdObj) {  
    const user = await Order.aggregate([
        {
            $match: { userData: userIdObj }
        },
        {
            $lookup: {
                from: "users", // Collection name for User model (lowercase and plural)
                localField: "userData",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $project:{
                _id:0,
                userDetails:1,
            }
        }
    ]);

    return user; //Return a promise 
}


async function fetchCartDetails(userIdObj) {  
    const order = await Order.aggregate([
        {
            $match: { order: userIdObj }
        },
        {
            $lookup: {
                from: "carts", // Collection name for User model (lowercase and plural)
                localField: "order",
                foreignField: "userId",
                as: "orderDeails"
            }
        },
        {
            $project:{
                _id: 0, // Exclude the _id field from the result
                orderDeails: 1 // Include only the "orderDeails" field in the result
            }
        },
    ]);

    return order; //Return a promise 
}

//The below code is for debug... 

// router.post("/order", async (req, res) => {
//     try {
//       const id = req.body.id;
//       const userIdObj = new ObjectId(id);
//       console.log(userIdObj);
  
//       const newOrder = new Order({
//         userData: userIdObj,
//         // order field should contain a single valid ObjectId
//         order: userIdObj,
//         paymentWay:req.body.paymentWay
//       });
  
//       const order = await newOrder.save();
//       const orderDetails = await fetchCartDetails(userIdObj);
//       const userDetails = await fetchUserDetails(userIdObj);
  
//       newOrder.order_detail = orderDetails; // Fix the field name here
//       newOrder.user_detail = userDetails; // Fix the field name here
  
//       await order.save();
  
//       res.status(200).json(order);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error);
//     }
//   });

// In other words, if there are recently logged-in users, the most recent one is given priority for order creation. If there are no recently logged-in users, the system defaults to creating an order for the user whose ID is provided in the request body.

/*
  
Fetch Recently Logged-in Users:

It calculates a date that is one month ago from the current date.
It queries the MongoDB collection of users to find those whose lastLoginTime is greater than or equal to the calculated date.
The retrieved users are sorted by lastLoginTime in descending order, so the most recently logged-in users come first.
Logs the length and list of recently logged-in users to the console.
User Selection:

It checks if there are any recently logged-in users.
If there are, it sorts the recently logged-in users based on their lastLoginTime in descending order.
The user with the most recent lastLoginTime is selected for the order.
Fallback Logic:

If no recently logged-in users are found, it could fall back to other logic. However, in this code, it directly fetches user details based on the provided user ID.
Order Creation:

A new Order instance is created using the selected user's data and the payment details from the request body.
The new order is saved to the database.
Fetching Additional Details:

The code attempts to fetch cart details and user details associated with the user. The functions fetchCartDetails and fetchUserDetails are expected to return these details.
*/


router.post("/order", async (req, res) => {
    try {
      const id = req.body.id;
      const userIdObj = new ObjectId(id);
      console.log(userIdObj);
  
      // Fetch users whose lastLoginTime is within the last 1 month
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
      const recentlyLoggedInUsers = await User.find({
        lastLoginTime: { $gte: oneMonthAgo }, // Users whose lastLoginTime is greater than or equal to one month ago
      }).sort({ lastLoginTime: -1 }); // Sort by lastLoginTime in descending order (most recent first)
  

      console.log("Length" + recentlyLoggedInUsers.length);


      console.log("Recent Order"+recentlyLoggedInUsers);

      let userToOrder;
  
      if (recentlyLoggedInUsers.length > 0) {


        console.log("Entered");

        // Sort recentlyLoggedInUsers by year, month, and date of lastLoginTime

        recentlyLoggedInUsers.sort((userA, userB) => {

          const dateA = userA.lastLoginTime;
          const dateB = userB.lastLoginTime;

          
  
          // Compare years
          if (dateA.getFullYear() !== dateB.getFullYear()) {
            console.log(" Years are Not same")
            return dateB.getFullYear() - dateA.getFullYear();
          }
  
          // Compare months
          if (dateA.getMonth() !== dateB.getMonth()) {
            console.log(" months are Not same")
            return dateB.getMonth() - dateA.getMonth();
          }
  
          // Compare dates
          return dateB.getDate() - dateA.getDate();
        });
  
        // Select the user with the most recent lastLoginTime (first user in the sorted list)
        userToOrder = recentlyLoggedInUsers[0]; //->Sorting Users by lastLoginTime: Before this line, the code sorts the recentlyLoggedInUsers array in descending order based on the lastLoginTime of each user. This means that the user who logged in most recently will be at the beginning of the array (index 0), followed by users who logged in less recently.

        // Selecting the Most Recent User: By accessing recentlyLoggedInUsers[0], the code is retrieving the first user in the sorted array. Since the array is sorted with the most recent logins first, the user at index 0 will be the one who logged in most recently.

      } else {
        // If no users have logged in within the last 1 month, fall back to other criteria or logic
        // For example, order based on loyalty level, order history, etc.
        // userToOrder = ... (Your logic here)
        // For now, let's simply use the user whose ID was provided in the request body
        userToOrder = await User.findById(userIdObj);
      }


  
      const newOrder = new Order({
        userData: userToOrder._id,
        order: userToOrder._id,
        paymentWay: req.body.paymentWay,
        discount:req.body.discount,
        priceAfterDiscount:req.body.priceAfterDiscount
      });
  
      const order = await newOrder.save();
      const orderDetails = await fetchCartDetails(userToOrder._id);
      const userDetails = await fetchUserDetails(userToOrder._id);
  
      newOrder.order_detail = orderDetails; // Fix the field name here
      newOrder.user_detail = userDetails; // Fix the field name here
  
      await order.save();
  
      res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });


  // Get all order 
  router.get("/getOrders",async (req,res)=>{
    try{
      const {page =1 , limit =4} = req.query;

      // console.log(req.query.page);
      // console.log(req.query.limit)

      const orders = await Order.find().limit(limit*1).skip( (page-1) * limit);
      if(orders){
        res.status(200).json(orders);
      }else{
        res.status(400).json({msg:"No orders are there to show"});
      }
    }catch(error){
      console.log(error)
      res.status(500).json(error);
    }

  })

  router.put("/update", async (req,res)=>{

    const id = req.body.orderId;
    const couponId = req.body.couponId;

    try{
      const coupon = await Coupon.findOne({_id:couponId});

      if(coupon.use === 1){
        const order = await Order.findOne({_id:id}, { totalPriceAfterDiscount: req.body.discountPrice });

        res.status(200).json(order);
      }

      else if(coupon.use ===  2){
        res.status(400).json({msg:"Already used the Coupon"});
      }
      
    }catch(error){
      res.status(500).json(error)
    }
  
    
  })
  

  // Order history bu userDta field in database

  router.get("/:id",async (req,res)=>{
    try{
      const id = req.params.id;
      const orders = await Order.find({userData:id});
      if(orders){
        res.status(200).json(orders);
      }else{
        res.status(400).json({msg:"No orders are there to show"});
      }
    }catch(error){
      res.status(500).json(error);
    }

  })



module.exports = router;




