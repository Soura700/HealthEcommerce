const User = require("../models/User");
const router = require("express").Router();
const Wishlist = require("../models/Wishlist")

// Get the user session data from express session 
router.get("/getsession",async (req,res)=>{
    if(req.session.user){
      const user = await User.findById(req.session.user);
      res.status(200).json(user);
    }else{
      res.status(403).redirect("/402/error")
    }
  })


  router.post("/add-to-wishlist", async (req, res) => {
    const { userId, wishlistProducts } = req.body;
    try {
      const existingWishlist = await Wishlist.findOne({ userId });
    /*
    The findIndex() method is used to search for the product in the cartProducts array. The callback function compares the product field of each element in the array to the product field of the new cartProducts object being added, and returns the index of the matching element.
  
  If the product is already in the cartProducts array (i.e., the findIndex() method returns an index other than -1), the quantity of the existing product is incremented by the quantity value of the new cartProducts object being added.
  
  If the product is not already in the cartProducts array (i.e., the findIndex() method returns -1), the new cartProducts object is added to the end of the cartProducts array using the push() method.
    */
      if (existingWishlist) {
        const productIndex = existingWishlist.wishlistProducts.findIndex(
          (p) => p.product.toString() === wishlistProducts[0].product.toString()
        );
        if (productIndex !== -1) {
          existingWishlist.wishlistProducts[productIndex].quantity = wishlistProducts[0].quantity;
        }
         else {
          // create new cartProducts object
          const newProduct = {
            product: wishlistProducts[0].product,
            productname: wishlistProducts[0].productname,
            quantity: wishlistProducts[0].quantity,
            productPrice: wishlistProducts[0].productPrice,
            img: wishlistProducts[0].img
          };
          existingWishlist.wishlistProducts.push(newProduct);
        }
        let wishListItemCount=0;
        for(let i = 0;i<existingWishlist.wishlistProducts.length;i++){
          wishListItemCount += existingWishlist.wishlistProducts[i].quantity;
        }
        existingWishlist.wishlistItemCount = wishListItemCount;
        const savedWishlist = await existingWishlist.save();
        res.status(200).json(savedWishlist);
      }
       else {
        const wishlist = new Wishlist(req.body);
        const savedWishlist = wishlist .save();
        res.status(200).json(savedWishlist);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.get("/get/wish-list/:userId",async (req,res)=>{
  const userId = req.params.userId;

  try{
      const wishlist = await Wishlist.findOne({userId:userId})
      if(wishlist){
        res.status(200).json(wishlist);
      }else{
        res.status(400).json({msg:"Wishlist not found"});
      }
  }catch(error){
    res.status(500).json(error);
  }
})

module.exports = router;