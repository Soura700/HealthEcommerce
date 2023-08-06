const mongoose = require("mongoose");
const router = require("express").Router();
const ObjectId = mongoose.Types.ObjectId;
const stripe = require("stripe")("sk_test_51NXlH8SCjxVrmpGJqbSL4tInAQBRGpSY0FL26khuSmr01NSFgXYABDHGXwoLsRe6O7MidOz0zqR5G2lYJME3Cszp00aTXsERic")
const Cart = require("../models/Cart");




// const storeItems = new Map([
//   [1, { priceInCents: 10000 , name: "Learn React"}],
//   [2, { priceInCents: 20000 ,name: "Learn CSS"}]
// ])

// Payment 2

// router.post("/checkout-session", async (req,res)=>{
//   const userId = req.body.userId;
//   console.log(userId);
//   try{
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: req.body.items.map(item=>{
//         const storeItem = storeItems.get(item.id)
//         return{
//           price_data :{
//             currency :'usd',
//             product_data:{
//               name:storeItem.name
//             },
//             unit_amount:storeItem.priceInCents,
//           },
//           quantity:item.quantity
//         }
//       }),
//       success_url: 'http://localhost:5500',
//       cancel_url: "http://localhost:5500/checkout"
//     })
//     res.json({url:session.url});
//   }
//   catch(error)
//   {
//     console.log(error)
//     res.status(500).json(error)
//   }

// })

// Endpoint to handle webhook events
router.post('/webhook', async (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    // Invalid signature
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Handle successful checkout session
    // Here you can update your database, mark orders as paid, etc.
  }

  res.json({ received: true });
});


// Payment 3


router.post("/checkout-session", async (req, res) => {
  const  userId  = req.body.userId; // Assuming you're passing the userId in the request body

  try {
    // Fetch the cart products for the user from the database
    const cart = await Cart.findOne({ userId }).populate('cartProducts.product');

    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user." });
    }


    const lineItems = cart.cartProducts.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productname,
            // images: [item.img],
          },
          unit_amount: item.productPrice * 100, // Stripe requires the price in cents
        },
        quantity: item.quantity,
      };
    });


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:5500",
      cancel_url: "http://localhost:5500/checkout",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


module.exports = router;