// Function to update the autocomplete suggestions in the HTML
    function updateAutocomplete(data) {
        const autocompleteResults = $('#autocompleteResults');
        autocompleteResults.empty(); // Clear previous suggestions
  
        data.forEach(item => {
          const suggestionItem = $('<div>').text(item.productname);
          suggestionItem.on('click', async ()=>{

            localStorage.setItem('Product', item.productname)
          })
          autocompleteResults.append(suggestionItem);

          console.log("Item" + suggestionItem);
        });
      }
  


// $(document).ready(function() {
//     // Handle form submission
//     $('#searchForm').on('submit', function(event) {
//       event.preventDefault(); // Prevent default form submission behavior

//       const searchTerm = $('#search').val(); // Get the search term from the input field

//       // Send AJAX request to the backend API for autocomplete suggestions
//       $.ajax({
//         url: 'http://localhost:5500/api/products/get/autocomplete',
//         method: 'GET',
//         data: { term: searchTerm }, // Send the search term as a query parameter
//         success: function(data) {
//             updateAutocomplete(data)
//           // Handle the response data (autocomplete suggestions) here
//           console.log( "Data" + data); // For example, log the suggestions to the console
//         },
//         error: function(error) {
//           // Handle errors here, if any
//           console.error(error);
//         }
//       });
//     });
//   });


$(document).ready(function() {
    // Handle form submission
    $('#searchForm').on('submit', function(event) {
      event.preventDefault(); // Prevent default form submission behavior
  
      const searchTerm = $('#search').val(); // Get the search term from the input field
  
      // Send AJAX request to the backend API for autocomplete suggestions
      $.ajax({
        url: 'http://localhost:5500/api/products/get/autocomplete',
        method: 'GET',
        data: { term: searchTerm },
        success: function(data) {
          updateAutocomplete(data);
        },
        error: function(error) {
          console.error(error);
        }
      });
    });
  
    // Attach click event handler to autocomplete results
    $('#autocompleteResults').on('click', 'a', function(event) {
    //   event.preventDefault(); // Prevent default link click behavior
  
    //   const suggestionUrl = $(this).attr('href'); // Get the URL from the clicked suggestion
    //   alert(suggestionUrl)
    redirectToCartPage(); // Call function to perform redirection
    });
  
    // Function to perform redirection
    function redirectToCartPage() {
        window.location.href = 'http://localhost:5500/cart.html'; // Redirect to cart.html
      }
  });
  


    function test() {
        const fetchres = fetch("http://localhost:5500/api/products");
        fetchres.then((res) => res.json())
            .then((d) => {
                const result = JSON.stringify(d);
                const cvb = JSON.parse(result);
                $("#row").html("");
                cvb.forEach(function (v, k) {
                    // console.log(v.countInStock)
                    // alert(v.countInStock)
                    // console.log(v.img);
                    const data = '<div class="col-lg-3 col-md-4 col-sm-6 col-6"><div class="ltn__product-item ltn__product-item-3 text-left"><div class="product-img"><a href="product-details.html"><img src="http://localhost:5500/'+v.img+'" alt="#"></a><div class="product-badge"><ul><li class="sale-badge">New</li></ul></div><div class="product-hover-action"><ul><li><button onclick="singleproduct(\'' + v._id + '\')" style="background-color: transparent;" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal"><i class="far fa-eye"></i></button></li><li><button id="cart-add" onclick="addcart(\'' + v._id + '\');viewcart(\'' + v._id + '\')" style="background-color: transparent;" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal"><i class="fas fa-shopping-cart"></i></button></li><li><button onclick="viewWishlist(\'' + v._id + '\');addwishlist(\'' + v._id + '\')" style="background-color: transparent;" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal"><i class="far fa-heart"></i></button></li></ul></div></div><div class="product-info"><div class="product-ratting"><ul><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star-half-alt"></i></a></li><li><a href="#"><i class="far fa-star"></i></a></li></ul></div><h2 class="product-title"><a href="product-details.html">' + v.productname + '</a></h2><div class="product-price"><span>$' + v.price + '</span><del id="alert">$46.00</del></div></div></div>'
                    $("#row").append(data);

                    if (v.countInStock <= 10) {
                        const alertMessage = '<div class="alert alert-danger" role="alert">Hurry...Only '+ v.countInStock +' products left!</div>';
                        $("#alert").append(alertMessage);
                    }
                    else{
                        //For future purpose
                    }


                })
            })
            .then((result) => {
                // console.log("Success1: ", result);
            })
            .catch((error) => console.log("Error:", error)
            );
    }



    function singleproduct(ss) {
        
        const fetchRes = fetch("http://localhost:5500/api/products/single/" + ss);
        fetchRes.then((res) => res.json())
            .then((d) => {
                const result = JSON.stringify(d);
                const cvb = JSON.parse(result);
                // console.log("CVB2:", cvb);
                $("#single").html("");
                // console.log("Hello");
                const data = '<div class="col-lg-6 col-12"><div class="modal-product-img"><img src="img/product/4.png" alt="#"></div></div><div class="col-lg-6 col-12"><div class="modal-product-info"><div class="product-ratting"><ul><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star-half-alt"></i></a></li><li><a href="#"><i class="far fa-star"></i></a></li><li class="review-total"> <a href="#"> ( 95 Reviews )</a></li></ul></div><h3><a href="product-details.html">' + cvb.productname + '</a></h3><div class="product-price"><span>$' + cvb.price + '</span><del>$25.00</del></div><hr><div class="modal-product-brief"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos repellendus repudiandae incidunt quidem pariatur expedita, quo quis modi tempore non.</p></div><div class="modal-product-meta ltn__product-details-menu-1 d-none"><ul><li><strong>Categories:</strong><span><a href="#">Parts</a><a href="#">Car</a><a href="#">Seat</a><a href="#">Cover</a></span></li></ul></div><div class="ltn__product-details-menu-2 d-none"><ul><li><div class="cart-plus-minus"><input type="text" value="02" name="qtybutton" class="cart-plus-minus-box"></div></li><li><a href="#" class="theme-btn-1 btn btn-effect-1" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal"><i class="fas fa-shopping-cart"></i><span>ADD TO CART</span></a></li></ul></div><!-- <hr> --><div class="ltn__product-details-menu-3"><ul><li><a href="#" class="" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal"><i class="far fa-heart"></i><span>Add to Wishlist</span></a></li><li><a href="#" class="" title="Compare" data-bs-toggle="modal" data-bs-target="#quick_view_modal"><i class="fas fa-exchange-alt"></i><span>Compare</span></a></li></ul></div><hr><div class="ltn__social-media"><ul><li>Share:</li><li><a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a></li><li><a href="#" title="Twitter"><i class="fab fa-twitter"></i></a></li><li><a href="#" title="Linkedin"><i class="fab fa-linkedin"></i></a></li><li><a href="#" title="Instagram"><i class="fab fa-instagram"></i></a></li></ul></div><label class="float-end mb-0"><a class="text-decoration" href="javascript:singleitem(\''+cvb._id+'\')"><small>View Details</small></a></label></div></div>'
                // const data = '<div class="col-12"><div class="modal-product-img"><img src="img/product/1.png" alt="#"></div><div class="modal-product-info"><h5><a href="product-details.html">Digital Stethoscope</a></h5><p class="added-cart"><i class="fa fa-check-circle"></i> Successfully added to your Cart</p><div class="btn-wrapper"><a href="cart.html" class="theme-btn-1 btn btn-effect-1">View Cart</a><a href="checkout.html" class="theme-btn-2 btn btn-effect-2">Checkout</a></div></div><!-- additional-info --><div class="additional-info d-none"><p>We want to give you <b>10% discount</b> for your first order, <br> Use discount code at checkout</p><div class="payment-method"><img src="img/icons/payment.png" alt="#"></div></div></div>'
                $("#single").append(data);
                // console.log("Product name:", cvb.productname);
            })
            .then((result) => {
                // console.log("Success2:", result)
            })
            .catch((error) => {
                // console.log("Error:", error)
            })
    }

    function singleitem(ss) {
        localStorage.setItem('ids',ss);
        location.replace('http://localhost:5500/product-details.html')
    }

    function viewcart(ss) {
        localStorage.setItem('cart', ss);
        const fetchRes = fetch("http://localhost:5500/api/products/single/" + ss);
        fetchRes.then((res) => res.json())
            .then((d) => {
                const result = JSON.stringify(d);
                const cvb = JSON.parse(result);
                // console.log("CVB2:", cvb);
                $("#cart").html("");
                const data = '<h5><a href="product-details.html">' + cvb.productname + '</a></h5><p class="added-cart"><i class="fa fa-check-circle"></i> Successfully added to your Cart</p><div class="btn-wrapper"><a href="javascript:view()" class="theme-btn-1 btn btn-effect-1">View Cart</a><a href="checkout.html" class="theme-btn-2 btn btn-effect-2">Checkout</a></div>'
                $("#cart").append(data);
            })
            .then((result) => {
                // console.log("Success2:", result)
            })
            .catch((error) => {
                // console.log("Error:", error)
            })
    }

    function view() {
        location.replace('http://localhost:5500/cart.html')
    }

    
    function addcart(ss) {
        const fetchSession = fetch("http://localhost:5500/api/auth/getSession");
        fetchSession
        .then((res)=>res.json())
        .then((ans)=>{
            const stringData = JSON.stringify(ans)
            const parsedRes = JSON.parse(stringData);
            localStorage.setItem('cart', ss);

            if(parsedRes._id === undefined){
                alert("Please Login First")
                window.location.replace("http://localhost:5500/profile-authentication.html");
            }
            else{
                const fetchRes = fetch("http://localhost:5500/api/products/single/" + ss)
                fetchRes.then((res) => res.json())
                    .then((result) => {
                        // console.log("Result", result);
                        fetch("http://localhost:5500/api/cart/add-to-cart", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                userId:parsedRes._id,
                                cartProducts: [
                                    {
                                        product: result._id,
                                        productname: result.productname,
                                        quantity: result.quantity,
                                        productPrice: result.price,
                                        img: result.img
                                    }
                                ],
                            })
                        }).then((data) => {
                            // console.log("Success:", data);
                        }).catch((error) => {
                            // console.error("Error:", error);
                        });
                    })
            }

        })
        .catch((error) => {
                // console.log("Error3:", error)
        })
    }


    function addwishlist(ss) {
        const fetchSession = fetch("http://localhost:5500/api/auth/getSession");
        fetchSession
        .then((res)=>res.json())
        .then((ans)=>{
            const stringData = JSON.stringify(ans)
            const parsedRes = JSON.parse(stringData);
            localStorage.setItem('cart', ss);
            console.log("ID"+parsedRes._id);
            console.log("ID type"+typeof(parsedRes._id));
            const fetchRes = fetch("http://localhost:5500/api/products/single/" + ss)
        fetchRes.then((res) => res.json())
            .then((result) => {
                console.log("Result", result);
                
                fetch("http://localhost:5500/api/wishlist/add-to-wishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId:parsedRes._id,
                        wishlistProducts: [
                            {
                                product: result._id,
                                productname: result.productname,
                                productPrice: result.price,
                                img: result.img
                            }
                        ],
                    })
                }).then((data) => {
                    console.log("Success:", data);
                }).catch((error) => {
                    console.error("Error:", error);
                });
            })
        })
        .catch((error) => {
                console.log("Error3:", error)
        })
    }

    function viewWishlist(ss) {
        localStorage.setItem('wishlist', ss);
        const fetchRes = fetch("http://localhost:5500/api/products/single/" + ss);
        fetchRes.then((res) => res.json())
            .then((d) => {
                const result = JSON.stringify(d);
                const cvb = JSON.parse(result);
                $("#wishlist").html("");
                const data = ' <h5><a href="product-details.html">' + cvb.productname + '</a></h5><p class="added-cart"><i class="fa fa-check-circle"></i> Successfully added to your Wishlist</p><div class="btn-wrapper"><a href="javascript:viewWishList(\'' + cvb._id + '\')" class="theme-btn-1 btn btn-effect-1">View Wishlist</a></div>'
                $("#wishlist").append(data);
            })
            .then((result) => {
                console.log("Success2:", result)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
        }


    function viewWishList(ss) {

        localStorage.setItem('viewwishlist', ss);
        location.replace('http://localhost:5500/cart.html')
    }

    function bag(){

        const fetchSession = fetch("http://localhost:5500/api/auth/getSession");
        fetchSession
        .then((res)=>res.json())
        .then((ans)=>{
            const stringData = JSON.stringify(ans)
            const parsedRes = JSON.parse(stringData);
            console.log("ITZZZZ"+parsedRes._id);

            const fetchRes = fetch("http://localhost:5500/api/cart/cartproducts/" + parsedRes._id)
            fetchRes.then((res) => res.json())
            .then((result) => {
                const ans = JSON.stringify(result);
                const finalRes = JSON.parse(ans);
                document.querySelector('#bag').innerText = finalRes.cartItemCount;
            })
        })
        .catch((error) => {
                console.log("Error3:", error)
        })
    }


 // Function to check if the session cookie exists and has not expired

 function checkCookie() {
  // Fetch the "check-cookie" API route to check the session_token cookie
  fetch("http://localhost:5500/api/auth/check-cookie")
    .then(response => response.text())
    .then(message =>{
        if(message.includes("Cookie exists: "))
        {
            // alert(message);
            // COOKIE EXISTS
            // CAN MOVE FORWARD
        }

        else {

        // Session token does not exist or has expired, redirect to the login page
        alert("Session token does not exist or has expired. Redirecting to login page...");
        
        // window.location.href = "/login.html"; // Replace "/login.html" with your actual login page URL
      }
    })
    .catch(error => console.error(error));
}

// function checkSession() {
//   // Fetch the "check-cookie" API route to check the session_token cookie
//   fetch("http://localhost:5500/api/auth/getSession")
//     .then(response => response.text())
//     .then(message =>{
//         if(message.includes("User not authenticated"))
//         {
//             alert("if block executed");
//             window.location.replace("http://localhost:5500/profile-authentication.html")
//         }

//         else {

//         // Session token does not exist or has expired, redirect to the login page
//         // alert("Session token does not exist or has expired. Redirecting to login page...");
        
//         // window.location.replace("http://localhost:5500/profile-authentication.html");
//         // window.location.href = "/login.html"; // Replace "/login.html" with your actual login page URL
//       }
//     })
//     .catch(error => console.error(error));
// }



function utilize_cart_menu(){
    const fetchSession = fetch("http://localhost:5500/api/auth/getSession");
        fetchSession
        .then((res)=>res.json())
        .then((ans)=>{
            const stringData = JSON.stringify(ans)
            const parsedRes = JSON.parse(stringData);
            console.log("Soura Bose" + parsedRes);
            console.log("Bose" + parsedRes._id);
            
            const fetchRes = fetch("http://localhost:5500/api/cart/cartproducts/" + parsedRes._id);
            fetchRes.then((res)=>res.json())
            .then((d)=>{
                const res=JSON.stringify(d);
                const cvb = JSON.parse(res)
                console.log("CVB Soura :",cvb)
                if(cvb == null){
                        $("#cart_menu_sidebar").html();
                        const data = '<h5>Cart is empty</h5>'
                        $("#cart_menu_sidebar").append(data);
                }

                if(cvb.cartItemCount ===0 ){
                    $("#cart_menu_sidebar").html();
                    const data = '<h5>Cart is empty</h5>'
                    $("#cart_menu_sidebar").append(data);
                }

 
                var price = cvb.totalPrice;
                $("#cart_menu_sidebar").html();
                cvb.cartProducts.forEach(function(v,k){
                    // const data = '<div class="mini-cart-img"><a href="#"><img src="img/product/1.png" alt="Image"></a><span class="mini-cart-item-delete"><i class="icon-cancel"></i></span></div><div class="mini-cart-info"><h6><a href="#">'+v.productname+'</a></h6><span class="mini-cart-quantity">'+v.quantity+' * $'+v.productPrice+'</span></div>'
                    // const data = '<div class="ltn__utilize-menu-head"><span class="ltn__utilize-menu-title">Cart</span><button class="ltn__utilize-close">×</button></div><div class="mini-cart-product-area ltn__scrollbar"><div class="mini-cart-item clearfix"><div class="mini-cart-img"><a href="#"><img src="img/product/4.png" alt="Image"></a><span class="mini-cart-item-delete"><i class="fa-solid fa-xmark fa-2xs"></i></span></div><div class="mini-cart-info"><h6><a href="#">'+v.productname+'</a></h6><span class="mini-cart-quantity">'+v.quantity+' * $'+v.productPrice+'</span></div></div></div/><div class="mini-cart-sub-total"><h5>Subtotal: <span>$' + price +'</span></h5></div><div class="btn-wrapper"><a href="cart.html" class="theme-btn-1 btn btn-effect-1">View Cart</a><a href="cart.html" class="theme-btn-2 btn btn-effect-2">Checkout</a></div><p>Free Shipping on All Orders Over $100!</p></div>'
                    const data = '<div class="mini-cart-product-area ltn__scrollbar"><div class="mini-cart-item clearfix" id="mini_cart" ><div class="mini-cart-img"><a href="#"><img src="../../'+v.img+'"  alt="Image"></a><span class="mini-cart-item-delete"><i class="fa-solid fa-xmark" ></i></i></span></div><div class="mini-cart-info"><h6><a href="#"> '+v.productname +' </a></h6><span class="mini-cart-quantity">' +v.quantity+' x $' +v.productPrice+ '</span></div></div></div><div class="mini-cart-footer"><div class="mini-cart-sub-total"><h5>Subtotal: <span>$ ' + price +' </span></h5></div><div class="btn-wrapper"><a href="cart.html" class="theme-btn-1 btn btn-effect-1">View Cart</a><a href="cart.html" class="theme-btn-2 btn btn-effect-2">Checkout</a></div><p>Free Shipping on All Orders Over $100!</p></div>'
                    $("#cart_menu_sidebar").append(data);
                })
            })
            .then((result)=>{
                console.log("Success2: " , result);
            })
            .catch((error)=>console.log("Error for the cart:",error));
        })
}



async function wishlist_sidebar(){

    const fetchSession = fetch("http://localhost:5500/api/auth/getSession");
    fetchSession
    .then((res)=>res.json())
    .then((ans)=>{
        const stringData = JSON.stringify(ans)
        const parsedRes = JSON.parse(stringData);
        console.log("Soura Bose" + parsedRes);
        console.log("Bose" + parsedRes._id);


        const fetchRes = fetch("http://localhost:5500/api/wishlist/get/wish-list/" + parsedRes._id);


        fetchRes.then((res)=>res.json())
        .then((d)=>{
            const res=JSON.stringify(d);
            const cvb = JSON.parse(res)
            console.log("CVB Soura :",cvb)
            console.log("Productswishlist" + cvb.wishlistProducts);
            $("#wishlist_products").html();
            cvb.wishlistProducts.forEach(function(v,k){
                const data = '<h3>My Wishlist</h3><div class="products-cart-content" ><div class="products-cart d-flex align-items-center"><div class="products-image"><a href="#"><img src="../../'+v.img+'"  alt="image"></a></div><div class="products-content"><h3><a href="#">' + v.productname +'</a></h3><div class="products-price"><span>' + v.quantity + '</span><span>x</span><span class="price">$ ' +v.productPrice +'</span></div></div><a href="#" class="remove-btn"><i class="bx bx-trash"></i></a></div></div><div class="products-cart-subtotal"></div><div class="products-cart-btn" style="color: #2a96fa"><a href="http://localhost:5500/cart.html" class="default-btn" style="color: #2a96fa">View Shopping Cart</a></div> '
                $("#wishlist_products").append(data);
            })
        })
        .then((result)=>{
            console.log("Success2: " , result);
        })
        .catch((error)=>console.log("Error for the cart:",error));
    })
}




document.getElementById('cart-bag').addEventListener('click',bag);
// document.getElementById('cart-add').addEventListener('click' , )

