const Billing = require("../models/Billing");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const ObjectId = mongoose.Types.ObjectId;
const {check,validationResult} = require("express-validator");


// function 

async function fetchUserDetails(userIdObj) {  


    // console.log("Type" + userIdObj + typeof(userIdObj));

    const user = await Billing.aggregate([
        {
            $match: { userId: userIdObj }
        },
        {
            $lookup: {
                from: "users", // Collection name for User model (lowercase and plural)
                localField: "userId",
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



router.post("/createbill", [
    check('country','')
    .exists()
    .notEmpty()
    .withMessage('Country cannot be empty'),
  check('address','')
    .notEmpty()
    .withMessage('Address cannot be empty'),
  check('state','')
    .notEmpty()
    .withMessage('State cannot be empty'),
  check('zip','')
    .notEmpty()
    .withMessage('Zipcode cannot be empty'),
  check('town','')
    .notEmpty()
    .withMessage('Town cannot be empty'),
],
async (req,res)=>{
    const errors = validationResult(req)
    const errorMessages = errors.array().map(error => `<div class="alert alert-warning" role="alert">${error.msg}</div>`).join('');
    if(!errors.isEmpty()){
    //   return res.status(422).json({
    //       errors:errors.array()
    //   });
    console.log(errorMessages)
      return res.status(400).send(errorMessages);
    }

    else{
        const {country , address , town , state , zip} = req.body;

        const id = req.body.id;
        const userIdObj = new ObjectId(id);
    
        console.log("Helllo Soura" + userIdObj);
    
        const usertoOrder =  await User.findById(userIdObj);
    
        console.log("Soura 2222" + usertoOrder);
    
        try{
            const newBill = new Billing({
                userId:usertoOrder._id,
                country:country,
                address:address,
                town:town,
                state:state,
                zip:zip
              })
          
              const bill = await newBill.save();
    
              const userDetails = await fetchUserDetails(usertoOrder._id)
    
    
              bill.user_detail = userDetails;
    
              await bill.save();
    
          
              res.status(200).json(bill)
        }catch(error){
    
            console.log(error);
    
            res.status(500).json(error)
        }    
    }
})

module.exports = router;

