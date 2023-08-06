const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products")
const cartRoute = require("./routes/cart");
const cookieParser = require('cookie-parser');
const wishlistRoute = require("./routes/wishlist");
const internship=require("./routes/internship");
const order = require("./routes/order")
const payment = require("./routes/payment");
const couponRoute = require("./routes/coupon");
const sendMail = require("./controllers/sendMail");
const session = require("express-session")
const auth = require("./controllers/authController");
const adminAuth = require("./controllers/adminAuthController");
const MongoStore = require("connect-mongo")(session); // Import the session store
const BillingRoute = require("./routes/billingdetails");


const app = express();

// Step 1:
dotenv.config();
// Step 2:
app.use(express.json());

// Step 3:
app.use(express.static("public"));
app.use("/upload",express.static("upload"));

// Step 4:
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);


app.use(cookieParser());

// Session 
app.use(
  session({
    name: "my_custom_session", // Custom name for the session cookie
    secret: "soura@2004",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // maxAge: 60 * 1000, // 1 minute in milliseconds
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true,
    },
    store: 
    // mongoStore
    new MongoStore({
      // Configure the MongoDB session store
      url: "mongodb+srv://sourabose:al6KdpioGzfcaqOw@cluster0.8h3wpmr.mongodb.net/ecommerce?retryWrites=true&w=majority", 
      collection: "sessions",
      autoRemove: "interval",
      autoRemoveInterval: 1, // Remove expired sessions every 1 minute
      // expires: 60,// Interval in minutes (e.g., remove expired sessions every 15 minutes)
      expires: 15 * 24 * 60, // 15 days in minutes
    }),
  })
);

const PORT = process.env.PORT || 5500;

// // Session 

// app.use(session({
//   secret:process.env.SESSIONSECRET,
//   resave:false,
//   saveUninitialized:false
// },
// ))



app.use(express.static('public'))
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute)
app.use("/api/cart",cartRoute);
app.use("/api/wishlist",wishlistRoute);
app.use("/api/create",order);
app.use("/api/",internship);
app.use("/api",payment)
app.use("/api/coupon",couponRoute);
app.use("/api/bill",BillingRoute);
app.use("/sendMail",sendMail);





// app.get("/autocomplete",(req,res,next)=>{
//   var regex = new RegExp(req.query["term"],'i')

//   var productFilter = Products.find({productname:regex},{'username':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
//   postFilter.exec((err,data)=>{
   
//     var result = [];
//     if(!err){
//       if(data && data.length && data.length>0){
//         data.forEach(products=>{
//           let obj = {
//             id:products._id,
//             label:products.productname
//           };
//           req.session.searchQuery = obj;
//           result.push(obj)
//         });
//       }
//       res.status(200).jsonp(result);
//     }
//   })
// })


app.get("/sendMail",sendMail);



app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/public/index.html")
})
app.get("/productdetails",(req,res)=>{
  res.sendFile(__dirname + "/public/product-details.html")
})
app.get("/auth",auth.isLogout ,  (req,res)=>{
  res.sendFile(__dirname+"/public/profile-authentication.html")
})
app.get("/admin", adminAuth.isLogin , (req,res)=>{
  res.sendFile(__dirname+"/public/admin.html")
})
app.get("/checkout", auth.isLogin , (req,res)=>{
  res.sendFile(__dirname + "/public/checkout.html");
})
app.get("/card",(req,res)=>{
  res.sendFile(__dirname + "/public/card.html");
})

app.get("/cart", auth.isLogin ,(req,res) =>{
  res.sendFile(__dirname + "/public/cart.html");
})

app.get("/products" ,(req,res) =>{
  res.sendFile(__dirname + "/public/productsBySearch.html");
})

app.get("/myProfile" ,  auth.isLogin, (req,res) =>{
  res.sendFile(__dirname + "/public/profile.html");
})


// Connecting to the port
// app.listen(5500,()=>{
//     console.log("Listening to the Port 5500");
// })

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
