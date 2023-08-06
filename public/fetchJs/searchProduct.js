async function getProducts(){
    var ss = localStorage.getItem('Product');

    const product = await fetch("http://localhost:5500/api/products/singleProduct/" + ss);

    const productJson = await product.json();

    const result = JSON.stringify(productJson);

    const resParse = JSON.parse(result);

        $("#search-products").html("");

        resParse.forEach(function( v , k ){
            const data = '<div class="col-lg-3--- col-md-4 col-sm-6 col-6" id="top"><div class="ltn__product-item ltn__product-item-2 text-left"><div class="product-img"><a href="product-details.html"><img src="http://localhost:5500/'+v.img+'" alt="#"></a><div class="product-badge"><ul><li class="sale-badge">New</li></ul></div><div class="product-hover-action"><ul><li><a href="#" onclick="singleproduct(\'' + v._id + '\');event.preventDefault();" title="Quick View" data-bs-toggle="modal"data-bs-target="#quick_view_modal"><i class="far fa-eye"></i></a></li><li><a href="#" onclick="addcart(\'' + v._id + '\');viewcart(\'' + v._id + '\'); event.preventDefault();" id="cart-add" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal"><i class="fas fa-shopping-cart"></i></a></li><li><a href="#" onclick="viewWishlist(\'' + v._id + '\');addwishlist(\'' + v._id + '\');event.preventDefault();" title="Wishlist" data-bs-toggle="modal"data-bs-target="#liton_wishlist_modal"><i class="far fa-heart"></i></a></li></ul></div></div><div class="product-info"><div class="product-ratting"><ul><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star-half-alt"></i></a></li><li><a href="#"><i class="far fa-star"></i></a></li></ul></div><h2 class="product-title"><a href="product-details.html">' + v.productname +'</a></h2><div class="product-price"><span>$' + v.price + '</span><del>$46.00</del></div></div></div></div>'
            // const data = '<div class="col-lg-3--- col-md-4 col-sm-6 col-6" id="top"><div class="ltn__product-item ltn__product-item-2 text-left"><div class="product-img"><a href="product-details.html"><img src="http://localhost:5500/'+v.img+'" alt="#"></a><div class="product-badge"><ul><li class="sale-badge">New</li></ul></div><div class="product-hover-action"><ul><li><button onclick="singleproduct(\'' + v._id + '\')" title="Quick View" data-bs-toggle="modal"data-bs-target="#quick_view_modal"><i class="far fa-eye"></i></button></li><li><button onclick="addcart(\'' + v._id + '\');viewcart(\'' + v._id + '\')" id="cart-add" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal"><i class="fas fa-shopping-cart"></i></a></li><li><a href="javascript:viewWishlist(\'' + v._id + '\');javascript:addwishlist(\'' + v._id + '\')"" title="Wishlist" data-bs-toggle="modal"data-bs-target="#liton_wishlist_modal"><i class="far fa-heart"></i></a></li></ul></div></div><div class="product-info"><div class="product-ratting"><ul><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star"></i></a></li><li><a href="#"><i class="fas fa-star-half-alt"></i></a></li><li><a href="#"><i class="far fa-star"></i></a></li></ul></div><h2 class="product-title"><a href="product-details.html">' + v.productname +'</a></h2><div class="product-price"><span>$' + v.price + '</span><del>$46.00</del></div></div></div></div>'

            $('#search-products').append(data)
        })
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
    alert("Done");
    const fetchSession = fetch("http://localhost:5500/api/auth/getSession");
    fetchSession
    .then((res)=>res.json())
    .then((ans)=>{
        const stringData = JSON.stringify(ans)
        const parsedRes = JSON.parse(stringData);
        localStorage.setItem('cart', ss);

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
    })
    .catch((error) => {
            // console.log("Error3:", error)
    })
}



function addwishlist(ss) {
    alert("Done");
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
    alert("Done");
    localStorage.setItem('viewwishlist', ss);
    location.replace('http://localhost:5500/cart.html')
}

function bag(){

    alert("Called Bag");

    const fetchSession = fetch("http://localhost:5500/api/auth/getSession");
    fetchSession
    .then((res)=>res.json())
    .then((ans)=>{
        const stringData = JSON.stringify(ans)
        const parsedRes = JSON.parse(stringData);
        console.log("ITZZZZ"+parsedRes._id);

        // if(parsedRes._id === undefined){
        //     alert("sjndsnls")
        //     window.location.replace("http://localhost:5500/profile-authentication.html");
        // }

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



function utilize_cart_menu(){
    alert("Utilize called ");
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
                console.log("Products Cart" + cvb.cartProducts);
                $("#cart_menu_sidebar").html();
                cvb.cartProducts.forEach(function(v,k){
                    // const data = '<div class="mini-cart-img"><a href="#"><img src="img/product/1.png" alt="Image"></a><span class="mini-cart-item-delete"><i class="icon-cancel"></i></span></div><div class="mini-cart-info"><h6><a href="#">'+v.productname+'</a></h6><span class="mini-cart-quantity">'+v.quantity+' * $'+v.productPrice+'</span></div>'
                    const data = '<div class="mini-cart-item clearfix"><div class="mini-cart-img"><a href="#"><img src="img/product/4.png" alt="Image"></a><span class="mini-cart-item-delete"><i class="icon-cancel"></i></span></div><div class="mini-cart-info"><h6><a href="#">'+v.productname+'</a></h6><span class="mini-cart-quantity">'+v.quantity+' * $'+v.productPrice+'</span></div></div>'
                    $("#cart_menu_sidebar").append(data);
                })
            })
            .then((result)=>{
                console.log("Success2: " , result);
            })
            .catch((error)=>console.log("Error for the cart:",error));
        })
}


document.getElementById('cart-bag').addEventListener('click',bag);