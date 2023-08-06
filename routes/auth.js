const express = require("express")
const router = express();
const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const argon2 = require("argon2")
const Coupon = require("../models/Coupon")
const session = require("express-session");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session); // Import the session store

const nodemailer = require("nodemailer");
const sendMail = require("../controllers/sendMail");
const { check, validationResult } = require("express-validator");



router.set('view engine', 'ejs');


router.use(
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





router.use(cookieParser());



// Register->First checks by the phone or emial..if exists tgen error ..other wise create the user
// hah the password..
// Coupon names arrya is there where the common coupons are there,then by map it creates coupon for each user and 
// inserting them in the coupon collection
router.post("/register",
  [
    check('username', 'The usernme must be +3 characters long')
      .exists()
      .isLength({ min: 3 }),
    check('email', 'Email is not valid')
      .notEmpty()
      .withMessage('Email cannot be empty'),
    check('phone', 'Email is not valid')
      .notEmpty()
      .withMessage('Phone No. cannot be empty'),
    check('password', '')
      .isLength({ min: 8, max: 32 })
      .withMessage('Passowrd must be in range of 8 to 32')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least one numeric character')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Password must contain at least one special character')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    const errorMessages = errors.array().map(error => `<div class="alert alert-warning" role="alert">${error.msg}</div>`).join('');
    if (!errors.isEmpty()) {
      // return res.status(422).json({
      //     errors:errors.array()
      // });
      return res.status(400).send(errorMessages);
    }
    else {
      try {
        const existingUserByEmail = await User.findOne({ email: req.body.email });
        const existingUserByPhone = await User.findOne({ phone: req.body.phone });

        if (existingUserByEmail) {
          return res.status(400).json({ error: "Email already exists" });
        }

        if (existingUserByPhone) {
          return res.status(401).json({ error: "Phone number already exists" });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPass = await bcrypt.hash(req.body.password, salt);

        // const hashedPass = await argon2.hash(req.body.password);

        const newUser = new User({
          username: req.body.username,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
        });

        const user = await newUser.save();

        console.log("User id: " + user._id);

        const couponNames = ["FIRSTORDER50", "HOLI50"];

        const coupons = couponNames.map((couponName) => {
          return new Coupon({
            couponname: couponName,
            discount: 100,
            expiresAt: new Date(),
            use: 0,
            userId: user._id,
          });
        });

        const savedCoupons = await Coupon.insertMany(coupons);

        res.status(200).json({ user, savedCoupons });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
      }
    }

  });



router.post('/login', [
  check('username', 'Email is not valid')
    .notEmpty()
    .withMessage('Email cannot be empty'),
  check('email', 'Email is not valid')
    .notEmpty()
    .withMessage('Email cannot be empty'),
  // check('role','')
  //   .notEmpty()
  //   .withMessage('Role cannot be empty'),
  check('password', '')
    .notEmpty()
    .withMessage('Password No. cannot be empty'),
],
  async (req, res) => {

    const errors = validationResult(req)
    const errorMessages = errors.array().map(error => `<div class="alert alert-warning" role="alert">${error.msg}</div>`).join('');
    if (!errors.isEmpty()) {
      // return res.status(422).json({
      //     errors:errors.array()
      // });
      return res.status(400).send(errorMessages);
    }
    else {
      try {



        // Get the current date and time
        const current_time = new Date();

        // Calculate the time before which sessions are considered expired (1 minute ago)
        const expiredBefore = new Date(current_time - 1 * 60 * 1000);


        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        // console.log("Today" + today) ; 

        // console.log(dateTime);

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(400).json({ error: 'Wrong Credentials' });
        }

        // const validate = await argon2.verify(req.body.password, user.password);

        const validate = req.body.password === user.password;
        

        if (!validate) {
          return res.status(400).json({ error: 'Wrong Credentials' });
        }



        if (user.isAdmin === 1) {
          // Generate JWT token with long expiration time (15 days)
          const jwtToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '15d' });

          user.token = jwtToken;
          user.status = 1;

          await user.save();

          // Set the session token in an HttpOnly cookie with 15 days expiration
          res.cookie('session_token', jwtToken, { httpOnly: true, expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) });

          const session_expires = req.session.cookie.expires;

          console.log("Session _ expires: " + session_expires);


          user.curretnLoginTime = current_time;
          user.lastLoginTime = session_expires;

          await user.save();


          // Store the userId in the 'sessions' collection
          const sessionsCollection = mongoose.connection.collection('sessions');

          // await sessionsCollection.updateOne(
          //   { session_id: req.sessionID }, // Find the session document based on the session ID
          //   { $set: { userId: user._id.toString(), createdAt: new Date()} }, // Set the userId and createdAt in the session document
          //   { upsert: true } // If the session document doesn't exist, create a new one
          // );

          await sessionsCollection.deleteMany({ createdAt: { $lt: expiredBefore } });

          const { password, ...other } = user._doc;
          req.session.admin = user._id;
          // res.redirect("/admin")
          res.status(200).json(other)
        }


        // For customer
        else {
          // Generate JWT token with long expiration time (15 days)
          const jwtToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '15d' });

          user.token = jwtToken;
          user.status = 1;

          await user.save();

          // Set the session token in an HttpOnly cookie with 15 days expiration
          res.cookie('session_token', jwtToken, { httpOnly: true, expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) });

          const session_expires = req.session.cookie.expires;

          console.log("Session _ expires: " + session_expires);


          user.curretnLoginTime = current_time;
          user.lastLoginTime = session_expires;

          await user.save();


          // Store the userId in the 'sessions' collection
          const sessionsCollection = mongoose.connection.collection('sessions');

          // await sessionsCollection.updateOne(
          //   { session_id: req.sessionID }, // Find the session document based on the session ID
          //   { $set: { userId: user._id.toString(), createdAt: new Date()} }, // Set the userId and createdAt in the session document
          //   { upsert: true } // If the session document doesn't exist, create a new one
          // );

          await sessionsCollection.deleteMany({ createdAt: { $lt: expiredBefore } });

          const { password, ...other } = user._doc;
          req.session.user = user._id;
          // res.redirect("/")
          res.status(200).json(other);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

    }

  });



// // Get the user session data from express session
router.get("/getSession", async (req, res) => {

  // console.log(req.session.user);
  try {
    const userId = req.session.user;

    if (userId) {
      const user = await User.findById(userId);
      if (user) {

        const session_expires = req.session.cookie.expires;

        console.log("Session:" + session_expires);
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }

    } else {
      res.status(401).json({ message: "User not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ message: "User is not logged in...", error });
  }
});



// Fetch Cookie 
router.get("/check-cookie", (req, res) => {
  // Check if the session_token cookie exists
  if (req.cookies.session_token) {
    res.send("Cookie exists: " + req.cookies.session_token);
  } else {
    res.send("Cookie does not exist or has expired");
  }
});



// Forgot password

router.post("/forgot-password", async (req, res) => {

  // console.log(req.session.user);
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email })


    if (user) {

      // Create a one time link for 15 min validation 



      const secret = process.env.JWT_SECRET + user.password;

      const payload = {
        email: user.email,
        id: user._id
      }


      const jwtToken = jwt.sign(payload, secret, { expiresIn: '15m' });


      const emailContent = `Hello, Please click the link to reset your password: http://localhost:5500/api/auth/reset-password/${user._id}/${jwtToken}`;


      await sendMail(email, emailContent);


      //   Toastify({
      //     text: "Link has been send",
      //     duration: 3000, // 3 seconds
      //     gravity: "top", // Position on the top of the page
      //     backgroundColor: "#2a96ff", // Set the background color of the toast
      // }).showToast();

      console.log(emailContent);

      res.json({ msg: 'Password reset link sent successfully!' });

    }

    else {
      //   Toastify({
      //     text: "User not registered",
      //     duration: 3000, // 3 seconds
      //     gravity: "top", // Position on the top of the page
      //     backgroundColor: "#2a96ff", // Set the background color of the toast
      // }).showToast();

      res.status(400).json({ msg: "User is not registered..." })
    }

  }

  catch (error) {
    console.log(error)
    res.status(500).json({ message: "User is not logged in...", error });
  }
});


// router.get("/reset-password/:id/:token", async (req,res)=>{

//   const {id,token} = req.params;

//   const user = await User.findOne({_id:id});

//   if(user){

//     alert("Valid")

//     console
//     .log("Valid User");

//     res.status(200).json({msg:"Valid User"})

//     const secret = process.env.JWT_SECRET + user.password;

//     try{
//       const payload = jwt.verify(token , secret);
//       res.render('reset-password', {email:user.email} );
//     }catch(error){
//       console.log(error)
//       res.status(401).json(error)
//     }
//   }
//   else{
//     res.status(400).json({msg:"Invalid User"})
//   }
//   res.send(req.params);
// })

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ status: "User not exists!!!" });
  }
  try {
    const secret = process.env.JWT_SECRET + user.password
    const payload = jwt.verify(token, secret)
    res.render('reset-password', { username: user.username })
    // res.redirect('/resetPassword')
    // res.send("Verified");
  } catch (error) {
    res.status(500).json(error);
  }
})


// Change the password
router.post("/reset-password/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  console.log(id)
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ status: "User not exists!!!" });
  }
  const secret = process.env.JWT_SECRET + user.password
  try {
    const payload = jwt.verify(token, secret)
    
    // const salt = await bcrypt.genSalt(12);
    // const hashedPass = await bcrypt.hash(req.body.password, salt);

    const hashedPass = await argon2.hash(req.body.password);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hashedPass,
        },
      },
    );
    res.json({ msg: "Password Updated" })
    // }
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})


router.post('/logout', async (req, res) => {
  try {

    const userId = req.session.user || req.session.admin;

    await User.findByIdAndUpdate( userId , { $set : { status: 0 } });

    // Clear the user's session and token
    req.session.destroy();
    res.clearCookie('session_token');

    // You can also update the user's last logout time or perform any other necessary actions here

    res.redirect('/')
    // res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Exporting the routers
module.exports = router;