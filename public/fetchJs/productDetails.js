function single(){
    const data = localStorage.getItem('ids');
    console.log("Data:",data);
    const fetchres =fetch("https://healthecommerce-production.up.railway.app/api/products/single/"+data);
    fetchres.then((res)=>res.json())
    .then((d)=>{
        const result = JSON.stringify(d);
        const cvb = JSON.parse(result);


        localStorage.setItem('category',cvb.categories);
        $("#product").html("");
        const data = '<div class="modal-product-info shop-details-info pl-0"><div class="product-ratting"><ul><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star-half-alt"></i></a></li><li><a href="#"><i class="far fa-star"></i></a></li><li class="review-total"> <a href="#"> ( 95 Reviews )</a></li></ul></div><h3>'+cvb.productname+'</h3><div class="product-price"><span>$'+cvb.price+'</span><del>$65.00</del></div><div class="modal-product-meta ltn__product-details-menu-1"><ul><li><strong>Categories:</strong><span><a href="#">face-mask</a><a href="#">ppe-kit</a><a href="#">safety-suits</a></span></li></ul></div><div class="ltn__product-details-menu-2"><ul><li><a href="#" onclick="addcart(\'' + cvb._id + '\');viewcart(\'' + cvb._id + '\');event.preventDefault();" id="cart-add" class="theme-btn-1 btn btn-effect-1" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal"><i class="fas fa-shopping-cart"></i><span>ADD TO CART</span></a></li></ul></div><div class="ltn__product-details-menu-3"><ul><li><a href="#" class="" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal"><i class="far fa-heart"></i><span>Add to Wishlist</span></a></li><li><a href="#" class="" title="Compare" data-bs-toggle="modal" data-bs-target="#quick_view_modal"><i class="fas fa-exchange-alt"></i><span>Compare</span></a></li><li><span id="status">Status:</span></li></ul></div><hr><div class="ltn__social-media"><ul><li>Share:</li><li><a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a></li><li><a href="#" title="Twitter"><i class="fab fa-twitter"></i></a></li><li><a href="#" title="Linkedin"><i class="fab fa-linkedin"></i></a></li><li><a href="#" title="Instagram"><i class="fab fa-instagram"></i></a></li></ul></div><hr><div class="ltn__safe-checkout"><h5>Guaranteed Safe Checkout</h5><img src="img/icons/payment-2.png" alt="Payment Image"></div></div>'
            $("#product").append(data);
            if(cvb.countInStock === 0 || cvb.countInStock>0){
                if(cvb.countInStock >0){
                    $("#status").append('<span class="badge bg-success">Available</span>');
                }else if(cvb.countInStock <=0){
                    $("#status").append('<span class="badge bg-danger">Out Of Stock</span>')
                    document.getElementById("cart").style.display = "none";  
                }
            }
        })
    .then((result)=>{
        // console.log("Success1: " , result);
    })
    .catch((error)=>console.log("Error:",error));
    }

    function viewcart(ss) {
        localStorage.setItem('cart', ss);
        const fetchRes = fetch("https://healthecommerce-production.up.railway.app/api/products/single/" + ss);
        fetchRes.then((res) => res.json())
            .then((d) => {
                const result = JSON.stringify(d);
                const cvb = JSON.parse(result);
              
                $("#cart_data").html("");
                const data = '<h5><a href="product-details.html">' + cvb.productname + '</a></h5><p class="added-cart"><i class="fa fa-check-circle"></i> Successfully added to your Cart</p><div class="btn-wrapper"><a href="cart.html" class="theme-btn-1 btn btn-effect-1">View Cart</a><a href="checkout.html" class="theme-btn-2 btn btn-effect-2">Checkout</a></div>'
                // const data = '<h5><a href="product-details.html">' + cvb.productname + '</a></h5><p class="added-cart"><i class="fa fa-check-circle"></i> Successfully added to your Cart</p><div class="btn-wrapper"><a href="javascript:view()" class="theme-btn-1 btn btn-effect-1">View Cart</a><a href="checkout.html" class="theme-btn-2 btn btn-effect-2">Checkout</a></div>'
                $("#cart_data").append(data);
            })
            .then((result) => {
                // console.log("Success2:", result)
            })
            .catch((error) => {
                // console.log("Error:", error)
            })
    }
    function view() {
        location.replace('https://healthecommerce-production.up.railway.app/cart.html')
    }
    

    

    function get(){
        const ss = localStorage.getItem('category')
        const fetchCategory=fetch("https://healthecommerce-production.up.railway.app/api/products/" + ss);
        fetchCategory.then((result)=>result.json())
        .then((ans)=>{
            const categoryString = JSON.stringify(ans)
            const categoryParse = JSON.parse(categoryString);
            $("#related-product").html('');
            categoryParse.forEach(function(v,k){
                const data = '<div class="ltn__product-item ltn__product-item-3 text-center"><div class="product-img"><a href="product-details.html"><img src="img/product/7.png" alt="#"></a><div class="product-badge"><ul><li class="sale-badge">New</li></ul></div><div class="product-hover-action"><ul><li><a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal"><i class="far fa-eye"></i></a></li><li><a href="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal"><i class="fas fa-shopping-cart"></i></a></li><li><a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal"><i class="far fa-heart"></i></a></li></ul></div></div><div class="product-info"><div class="product-ratting"><ul><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star-half-alt"></i></a></li><li><a href="#"><i class="far fa-star"></i></a></li></ul></div><h2 class="product-title"><a href="product-details.html">'+v.productname+'</a></h2><div class="product-price"><span>$'+v.price+'</span><del>$162.00</del></div></div></div>';
                $("#related-product").append(data);
            })
        })
        .then((result)=> console.log("Success1: " , result))
        .catch((error)=>console.log("Error:",error));
    }



    
    function addcart(ss) {

        // console.log("Hitted")
        alert("Hitted")
        const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
        fetchSession
        .then((res)=>res.json())
        .then((ans)=>{
            const stringData = JSON.stringify(ans)
            const parsedRes = JSON.parse(stringData);
            localStorage.setItem('cart', ss);

            if(parsedRes._id === undefined){
                alert("Please Login First")
                window.location.replace("https://healthecommerce-production.up.railway.app/profile-authentication.html");
            }
            else{
                const fetchRes = fetch("https://healthecommerce-production.up.railway.app/api/products/single/" + ss)
                fetchRes.then((res) => res.json())
                    .then((result) => {
                        // console.log("Result", result);
                        fetch("https://healthecommerce-production.up.railway.app/api/cart/add-to-cart", {
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
                            console.log(error)
                            // console.error("Error:", error);
                        });
                    })
            }

        })
        .catch((error) => {
                // console.log("Error3:", error)
        })
    }



    function bag(){

        alert("Called")

        const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
        fetchSession
        .then((res)=>res.json())
        .then((ans)=>{
            const stringData = JSON.stringify(ans)
            const parsedRes = JSON.parse(stringData);
            console.log("ITZZZZ"+parsedRes._id);

            const fetchRes = fetch("https://healthecommerce-production.up.railway.app/api/cart/cartproducts/" + parsedRes._id)
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


    function utilize_cart_menu(){

        alert("Called")
        const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
            fetchSession
            .then((res)=>res.json())
            .then((ans)=>{
                const stringData = JSON.stringify(ans)
                const parsedRes = JSON.parse(stringData);
                console.log("Soura Bose" + parsedRes);
                console.log("Bose" + parsedRes._id);
                
                const fetchRes = fetch("https://healthecommerce-production.up.railway.app/api/cart/cartproducts/" + parsedRes._id);
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

        const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
        fetchSession
        .then((res)=>res.json())
        .then((ans)=>{
            const stringData = JSON.stringify(ans)
            const parsedRes = JSON.parse(stringData);
            console.log("Soura Bose" + parsedRes);
            console.log("Bose" + parsedRes._id);
    
    
            const fetchRes = fetch("https://healthecommerce-production.up.railway.app/api/wishlist/get/wish-list/" + parsedRes._id);
    
    
            fetchRes.then((res)=>res.json())
            .then((d)=>{
                const res=JSON.stringify(d);
                const cvb = JSON.parse(res)
                console.log("CVB Soura :",cvb)
                console.log("Productswishlist" + cvb.wishlistProducts);
                $("#wishlist_products").html();
                cvb.wishlistProducts.forEach(function(v,k){
                    const data = '<h3>My Wishlist</h3><div class="products-cart-content" ><div class="products-cart d-flex align-items-center"><div class="products-image"><a href="#"><img src="../../'+v.img+'"  alt="image"></a></div><div class="products-content"><h3><a href="#">' + v.productname +'</a></h3><div class="products-price"><span>' + v.quantity + '</span><span>x</span><span class="price">$ ' +v.productPrice +'</span></div></div><a href="#" class="remove-btn"><i class="bx bx-trash"></i></a></div></div><div class="products-cart-subtotal"></div><div class="products-cart-btn" style="color: #2a96fa"><a href="https://healthecommerce-production.up.railway.app/cart.html" class="default-btn" style="color: #2a96fa">View Shopping Cart</a></div> '
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
