const router = require("express").Router();
const Coupon = require("../models/Coupon");
const session = require("express-session");



// router.use(
//     session({
//       name: "my_coupon_session", // Custom name for the session cookie
//       secret: "soura@2004",
//       resave: false,
//       saveUninitialized: false,
//     //   cookie: {
//     //     maxAge: 60 * 1000, // 1 minute in milliseconds
//     //     httpOnly: true,
//     //   },
//     })
//   );

router.post("/create",async (req,res)=>{
    try{
        const newCoupon =  new Coupon({
            couponname: req.body.couponname,
            discount: req.body.discount,
            expiresAt: req.body.expiresAt,
        });
        const coupon = await newCoupon.save();

        res.status(200).json(coupon);

    }catch(error){
        res.status(500).json(error);
    }
});

router.post("/get",async (req,res)=>{
    try{
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    }catch(error){
        res.status(500).json(error);
    }
});


router.get("/getCoupon/:couponname",async (req,res)=>{
    try{
        // const {couponname} = req.params; 
        // console.log(couponname)
        const coupon = await Coupon.findOne({couponname:req.params.couponname});

        if (coupon) {
            res.status(200).json(coupon);
        } else {
            res.status(404).json({ message: "Coupon not found" });
        }
        // res.status(200).json(coupon);
    }catch(error){
        res.status(500).json(error);
    }
});


router.put("/update/:id",async (req,res)=>{
    try{
        const id = req.params.id; 
        const use = req.body.use;
        console.log(use);
        const coupon = await Coupon.findByIdAndUpdate({_id:id} , {use:use});
        if(coupon){
            res.status(200).json(coupon);
        }else{
            res.status(400).json({msg:"Coupon not found"});
        }
    }catch(error){
        res.status(500).json(error);
    }
});


router.delete("/delete/:id",async (req,res)=>{
    try{
        const id = req.params.id; 
        const coupon = await Coupon.findByIdAndDelete({_id:id});
        res.status(200).json({msg:"Deleted Successfully"});
    }catch(error){
        res.status(500).json(error)
    }
})

// Get coupon by id and name
router.get("/get/:id/:couponname",async (req,res)=>{
    try{
        const id = req.params.id; 
        const couponname = req.params.couponname;
        console.log(id);

        const coupon = await Coupon.findOne ( {userId:id, couponname: couponname} );

        res.status(200).json(coupon);
    }catch(error){
        res.status(500).json(error)
    }
})


// Get by coupon id
router.get("/get/:id",async (req,res)=>{
    try{
        const id = req.params.id; 


        const coupon = await Coupon.findOne ( {_id:id});

        res.status(200).json(coupon);
    }catch(error){
        res.status(500).json(error)
    }
})




// Exporting the routers
module.exports = router;