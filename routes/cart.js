const Cart = require("../models/Cart");
const User = require("../models/User");
const router = require("express").Router();
const session = require("express-session");


router.use(session({
  secret:"soura@2004",
  // secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
},
))

// Get the user session data from express session
router.get("/getsession", async (req, res) => {
  if (req.session.user) {
    const user = await User.findById(req.session.user);
    res.status(200).json(user);
  } else {
    res.status(403).redirect("/402/error");
  }
});

// Add-to-cart

router.post("/add-to-cart", async (req, res) => {
  const { userId, cartProducts } = req.body;
  try {
    const existingCart = await Cart.findOne({ userId });
    


        /*
  The findIndex() method is used to search for the product in the cartProducts array. The callback function compares the product field of each element in the array to the product field of the new cartProducts object being added, and returns the index of the matching element.

If the product is already in the cartProducts array (i.e., the findIndex() method returns an index other than -1), the quantity of the existing product is incremented by the quantity value of the new cartProducts object being added.

If the product is not already in the cartProducts array (i.e., the findIndex() method returns -1), the new cartProducts object is added to the end of the cartProducts array using the push() method.
  */

    if (existingCart) {
      const productIndex = existingCart.cartProducts.findIndex(
        (p) => p.product.toString() === cartProducts[0].product.toString()
      );

      if (productIndex !== -1) {
        existingCart.cartProducts[productIndex].quantity =
          cartProducts[0].quantity;
      } else {
        // create new cartProducts object
        const newProduct = {
          product: cartProducts[0].product,
          productname: cartProducts[0].productname,
          quantity: cartProducts[0].quantity,
          productPrice: cartProducts[0].productPrice,
          img: cartProducts[0].img,
        };
        existingCart.cartProducts.push(newProduct);
      }

      // Calculate the total price of products in cartProducts

           /*
      Before saving the existingCart or cart document, loop through the cartProducts array and sum up the quantity values of each element. Assign this sum to the cartItemCount field of the existingCart or cart document.

Save the updated existingCart or cart document.
      */

      let totalPrice = 0;
      for (let i = 0; i < existingCart.cartProducts.length; i++) {
        const product = existingCart.cartProducts[i];
        totalPrice += product.quantity * product.productPrice;
      }

      existingCart.totalPrice = totalPrice;

      // Calculate the cart item count
      let cartItemCount = 0;
      for (let i = 0; i < existingCart.cartProducts.length; i++) {
        cartItemCount += existingCart.cartProducts[i].quantity;
      }
      existingCart.cartItemCount = cartItemCount;

      const savedCart = await existingCart.save();
      res.status(200).json(savedCart);
    } else {
      const cart = new Cart(req.body);

      // Calculate the total price of products in cartProducts
      let totalPrice = 0;
      for (let i = 0; i < cart.cartProducts.length; i++) {
        const product = cart.cartProducts[i];
        totalPrice += product.quantity * product.productPrice;
      }

      cart.totalPrice = totalPrice;

      // Calculate the cart item count
      let cartItemCount = 0;
      for (let i = 0; i < cart.cartProducts.length; i++) {
        cartItemCount += cart.cartProducts[i].quantity;
      }
      cart.cartItemCount = cartItemCount;

      const savedCart = await cart.save();
      res.status(200).json(savedCart);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});




// Get products by user
router.get("/cartproducts/:userId", async (req, res) => {
  const { userId } = req.params;

  console.log(typeof(userId));
  
  try {
    const products = await Cart.findOne({ userId });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


// Delete cart product

// Here we canot use the deleteOne or deleteById because it is used to delete the collection it canot delete the object from the array
// so the whole collection will be deleted to avoid the problem i have used $pull operator that will pull the product by it's id
// provided in the parameter and will update after pulling the product  

// router.put("/cartproduct/delete/:product", async (req,res)=>{
//   const { userId } = req.body;
//   const { product } = req.params;
//   try{
//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       { $pull: { cartProducts: { product: product } } },
//       { new: true }
//     );
//     res.status(200).json(cart);
//   } catch(error){
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

// 
router.put("/cartproduct/delete/:product", async (req, res) => {
  const { userId } = req.body;
  const { product } = req.params;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productToRemove = cart.cartProducts.find(
      (cartProduct) => cartProduct.product.toString() === product
    );

    if (!productToRemove) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Calculate the new cart item count and total price
    const updatedCartItemCount = cart.cartItemCount - productToRemove.quantity;
    const updatedTotalPrice =
      cart.totalPrice - productToRemove.quantity * productToRemove.productPrice;

    // Remove the product from cartProducts array...It will check the id of the product that i want to remove to the iterated product id..if it is matched then removed ..other wise 
    // Create a new array ..so new array is created an updatd with the older one..
    cart.cartProducts = cart.cartProducts.filter(
      (cartProduct) => cartProduct.product.toString() !== product
    );

    cart.cartItemCount = updatedCartItemCount;
    cart.totalPrice = updatedTotalPrice;

    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});



// Update the cart
router.put("/update-cart-product", async (req, res) => {
  const { userId, product, quantity , totalPriceAfterDiscount} = req.body;
  try {
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) 
    {
      // existingCart.totalPriceAfterDiscount = totalPriceAfterDiscount; //Update the totalPriceAfterDiscount

      // const savedCart = await existingCart.save();

      // res.status(200).json(savedCart)

      const productIndex = existingCart.cartProducts.findIndex(
        (p) => p.product.toString() === product.toString()
      );
      if (productIndex !== -1) {

        // Get the current quantity, price, and quantity in the cart of the product
        const currentQuantity = existingCart.cartProducts[productIndex].quantity;
        const productPrice = existingCart.cartProducts[productIndex].productPrice;
        
        // Calculate the difference in quantity
        const quantityDifference = quantity - currentQuantity ; 


         // Update the quantity of the product in the cart
        existingCart.cartProducts[productIndex].quantity = quantity;

        
        // Update the total price by adding the value of the product based on the quantity change
        existingCart.totalPrice += quantityDifference * productPrice;

        let cartItemCount = 0;
        for (let i = 0; i < existingCart.cartProducts.length; i++) {
          cartItemCount += existingCart.cartProducts[i].quantity;
        }
        existingCart.cartItemCount = cartItemCount;
        const savedCart = await existingCart.save();
        res.status(200).json(savedCart);
      } else {
        console.log("fuck")
        res.status(401).json({ message: "Product not found in cart" });
      }
    } else {
      res.status(400).json({ message: "Cart not found" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


// Update the discount price

router.put("/update-cart-discountPrice", async (req, res) => {
  const { userId, totalPriceAfterDiscount } = req.body;
  try {
    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      // Update the totalPriceAfterDiscount field
      existingCart.totalPriceAfterDiscount = totalPriceAfterDiscount;

      const savedCart = await existingCart.save();
      res.status(200).json(savedCart);
    } else {
      res.status(400).json({ message: "Cart not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Delete cart

router.delete("/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(typeof(userId))

    // Validate userId format (you can implement your own validation logic here)
   

    // Check if a user exists with the given userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find and delete the cart for the user
    const cart = await Cart.findOneAndDelete({ userId });

    // If the cart is not found, return an appropriate response
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Return a success response
    res.status(200).json({ success: true, message: "Cart has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



module.exports = router;
