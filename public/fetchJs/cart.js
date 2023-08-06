// // Add event listener for increase button
// function increase(ss) {
//     console.log(ss);
//     $(document).on('click', '.cart-plus', function() {
//     const inputEl = $(this).siblings('.cart-plus-minus-box');
//     console.log(inputEl.val());
//     const currentQuantity = parseInt(inputEl.val());
//     console.log("Current Quantity" + currentQuantity)
//     const newQuantity = currentQuantity + 1;
//     inputEl.val(newQuantity);
//     console.log(newQuantity)
//     updateCart(ss,newQuantity)
// });
// }



// // Add event listener for increase button
$(document).on('click', '.cart-plus', function() {
    const inputEl = $(this).siblings('.cart-plus-minus-box');
    const currentQuantity = parseInt(inputEl.val());
    const newQuantity = currentQuantity + 1;
    const ss = $(this).data('product-id'); // Get the product ID from the button's data attribute
    inputEl.val(newQuantity);
    
    updateCart(ss, newQuantity);

    // location.reload();
});



// // Add event listener for decrease button
// function decrease(ss){
//     $(document).on('click', '.cart-minus',ss, function() {
//     const inputEl = $(this).siblings('.cart-plus-minus-box');
//     const currentQuantity = parseInt(inputEl.val());
//         if (currentQuantity > 1) {
//             const newQuantity = currentQuantity - 1;
//             inputEl.val(newQuantity);
//             console.log(newQuantity);
//             updateCart(ss,newQuantity);
//         }
//     });
// };

$(document).on('click', '.cart-minus', function() {
    const inputEl = $(this).siblings('.cart-plus-minus-box');
    const currentQuantity = parseInt(inputEl.val());
    const newQuantity = Math.max(currentQuantity - 1, 1); // Ensure quantity doesn't go below 1
    const ss = $(this).data('product-id'); // Get the product ID from the button's data attribute
    inputEl.val(newQuantity);
    updateCart(ss, newQuantity);
});



function test(){


    const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
    fetchSession
    .then((res)=>res.json())
    .then((ans)=>{
        const stringData = JSON.stringify(ans)
        const parsedRes = JSON.parse(stringData);
        console.log("kjcdscdsnckwjcn" + parsedRes);
        console.log(parsedRes._id);
        const fetchRes = fetch("https://healthecommerce-production.up.railway.app/api/cart/cartproducts/" + parsedRes._id);
        fetchRes.then((res)=>res.json())
        .then((d)=>{

    

            const res=JSON.stringify(d);
            const cvb = JSON.parse(res)
            console.log("CVB:",cvb)

            if(cvb === null){
                Toastify({
                    text: "Please add products to checkout",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();

                Toastify({
                    text: "Returning to the home page",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();

                setTimeout(()=>{
                    window.location.replace ( "http://localhost:5500")
                }, 1000)
            }


            console.log(cvb.cartProducts);
            $("#cartproducts").html();
            cvb.cartProducts.forEach(function(v,k){
                console.log("Products Soura " + v.product);
                
                // const data = '<tr><td class="cart-product-remove"><a href="javascript:deleteProduct(\''+v.product +'\')">x</a></td><td class="cart-product-image"><a href="product-details.html"><img src="img/product/1.png" alt="#"></a></td><td class="cart-product-info"><h4><a href="product-details.html">'+v.productname+'</a></h4></td><td class="cart-product-price">$'+v.productPrice+'</td><td class="cart-product-quantity"><div class="cart-plus-minus"><button type="button" id="increase" onclick="increase(\''+v.product +'\')" class="cart-plus">+</button><input type="text" value='+v.quantity+' name="qtybutton" class="cart-plus-minus-box"><button type="button" id="decrease"  onclick="decrease(\''+v.product +'\')" class="cart-minus">-</button></div></td><td class="cart-product-subtotal">'+v.quantity*v.productPrice+'</td></tr>'
                // const data = '<tr><td class="cart-product-remove"><a href="javascript:deleteProduct(\''+v.product +'\')">x</a></td><td class="cart-product-image"><a href="product-details.html"><img src="img/product/1.png" alt="#"></a></td><td class="cart-product-info"><h4><a href="product-details.html">'+v.productname+'</a></h4></td><td class="cart-product-price">$'+v.productPrice+'</td><td class="cart-product-quantity"><div class="cart-plus-minus"><button type="button" class="cart-plus" data-product-id="'+ v.product +'">+</button><input type="text" value='+v.quantity+' name="qtybutton" class="cart-plus-minus-box"><button type="button" class="cart-minus">-</button></div></td><td class="cart-product-subtotal">'+v.quantity*v.productPrice+'</td></tr>';
                const data = '<tr><td class="cart-product-remove"><a href="javascript:deleteProduct(\''+v.product +'\')">x</a></td><td class="cart-product-image"><a href="product-details.html"><img src="img/product/1.png" alt="#"></a></td><td class="cart-product-info"><h4><a href="product-details.html">'+v.productname+'</a></h4></td><td class="cart-product-price">$'+v.productPrice+'</td><td class="cart-product-quantity"><div class="cart-plus-minus"><button type="button" class="cart-plus" data-product-id="'+ v.product +'">+</button><input type="text" value='+v.quantity+' name="qtybutton" class="cart-plus-minus-box"><button type="button" class="cart-minus" data-product-id="'+ v.product +'">-</button></div></td><td class="cart-product-subtotal">'+v.quantity*v.productPrice+'</td></tr>';

                $("#cartproducts").append(data);
            })

            $("#cartproducts").prepend('<tr class="cart-coupon-row"><td colspan="6"><div class="cart-coupon"><input id="couponCode" type="text" name="cart-coupon" placeholder="Coupon code"><button id="couponButton" type="submit" class="btn theme-btn-2 btn-effect-2">Apply Coupon</button><button id="coupon_delete" type="submit" style="display:none; margin-top:5px" class="btn theme-btn-2 btn-effect-2">Delete Coupon</button></div></td><td><button type="submit" class="btn theme-btn-2 btn-effect-2-- disabled">Update Cart</button></td>');
            
            // $("#cartproducts").prepend('<tr class="cart-coupon-row"><td colspan="6"><div class="cart-coupon"><input id="couponCode" type="text" name="cart-coupon" placeholder="Coupon code"><button id="couponButton" type="submit" class="btn theme-btn-2 btn-effect-2">Apply Coupon</button><button id="deleteCouponButton" type="button" class="btn theme-btn-2 btn-effect-2-- disabled" style="display:none;">Delete Coupon</button></div></td><td><button type="submit" class="btn theme-btn-2 btn-effect-2-- disabled">Update Cart</button></td>');


            if(cvb.cartItemCount === 0){
                $("#cartproducts").html("");
                $("#cart-table").html("")
                Toastify({
                    text: "Please add products to checkout",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();

                Toastify({
                    text: "Returning to the home page",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();

                setTimeout(()=>{
                    window.location.replace ( "http://localhost:5500")
                }, 1000)
            }

            else{
                
            $("#cart-table").html(`
                <h4>Cart Totals</h4>
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Cart Subtotal</td>
                            <td>$${cvb.totalPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Shipping and Handling</td>
                            <td>$15.00</td>
                        </tr>
                        <tr>
                            <td>Vat</td>
                            <td>$0.00</td>
                        </tr>
                        <tr>
                            <td><strong>Order Total</strong></td>
                            <td><strong>$${(cvb.totalPrice + 15).toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <div class="btn-wrapper text-right">
                    <a href="checkout.html" class="theme-btn-1 btn btn-effect-1">Proceed to checkout</a>
                </div>
            `);
            }

        document.getElementById("couponButton").addEventListener("click", async function () {
                var coupon = document.getElementById("couponCode").value; // Use "value" instead of "val()" to get the input value

                const fetchCoupon = await fetch("https://healthecommerce-production.up.railway.app/api/coupon/getCoupon/" + coupon);

                const fetchCouponJson = await fetchCoupon.json()
                
                const fetchSession = await fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession")

                const fetchsessionJson = await fetchSession.json();

                console.log("Fetch Session" + fetchsessionJson._id)
                

                const fetchCouponUser = await fetch("https://healthecommerce-production.up.railway.app/api/coupon/get/" + fetchsessionJson._id + "/" +fetchCouponJson.couponname ) ;



                const fetchCouponUserJson = await fetchCouponUser.json();

                    // If coupon is valid for the user, show the Delete Coupon button
            if (fetchCouponUserJson) {
                document.getElementById("coupon_delete").style.display = "block";

                document.getElementById("coupon_delete").addEventListener('click',function (){
                    alert("Clicked")
                })
            }

                console.log( "Fetch Coupon User Json" + fetchCouponUserJson.use);


                // checking the use 

                if(fetchCouponUserJson.use === 2){
                    Toastify({
                        text: "Coupon has been used",
                        duration: 3000, // 3 seconds
                        gravity: "top", // Position on the top of the page
                        backgroundColor: "#2a96ff", // Set the background color of the toast
                    }).showToast();
                }

                else{


                    const discount = fetchCouponJson.discount;
    

    

                const updateCoupon  = await fetch("https://healthecommerce-production.up.railway.app/api/coupon/update/" + fetchCouponJson._id,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        use:1,
                    })
                });

                const updateCouponJson = await updateCoupon.json();

                console.log(updateCouponJson);

                if(cvb.totalPrice > 300){
                    var priceafterDiscount = cvb.totalPrice - discount ;

                    console.log("Price after discount" + priceafterDiscount);

                    sessionStorage.setItem('discountPrice' , discount);


                    sessionStorage.setItem('Id',fetchCouponJson._id);
                }

                if(priceafterDiscount > 0){

                    $("#cart-table").empty();


                    $("#cart-table").html();

                    

                    const data = '<h4>Cart Totals</h4><table class="table"><tbody><tr><td>Cart Subtotal</td><td>$'+ priceafterDiscount + '</td></tr><tr><td>Shipping and Handing</td><td>$ ' + 15.00 + '</td></tr><tr><td>Vat</td><td>$ ' + 0.00 + '</td></tr><tr><td><strong>Order Total</strong></td><td><strong>$ ' + (priceafterDiscount + 15.00) + '</strong></td></tr></tbody></table><div class="btn-wrapper text-right"><a href="checkout.html" class="theme-btn-1 btn btn-effect-1">Proceed to checkout</a></div>'

                    $("#cart-table").prepend(data);

                    Toastify({
                        text: "Coupon Applied Successfully",
                        duration: 3000, // 3 seconds
                        gravity: "top", // Position on the top of the page
                        backgroundColor: "#2a96ff", // Set the background color of the toast
                    }).showToast();


                }
                else{
                    $("#cart-table").html();

                    // const data = '<table class="table"><tbody><tr><td>Cart Subtotal</td><td>$'+ priceafterDiscount + '</td></tr><tr><td>Shipping and Handing</td><td>$ ' + 15.00 + '</td></tr><tr><td>Vat</td><td>$ ' + 0.00 + '</td></tr><tr><td><strong>Order Total</strong></td><td><strong>$ ' + (priceafterDiscount + 15.00) + '</strong></td></tr></tbody></table><div class="btn-wrapper text-right"><a href="checkout.html" class="theme-btn-1 btn btn-effect-1">Proceed to checkout</a></div>'

                    const data = '<h4>Cart Totals</h4><table class="table"><tbody><tr><td>Cart Subtotal</td><td>$'+ cvb.totalPrice + '</td></tr><tr><td>Shipping and Handing</td><td>$ ' + 15.00 + '</td></tr><tr><td>Vat</td><td>$ ' + 0.00 + '</td></tr><tr><td><strong>Order Total</strong></td><td><strong>$ ' + (priceafterDiscount + 15.00) + '</strong></td></tr></tbody></table><div class="btn-wrapper text-right"><a href="checkout.html" class="theme-btn-1 btn btn-effect-1">Proceed to checkout</a></div>'

                    $("#cart-table").prepend(data);

                    Toastify({
                        text: "Ammount have to be above 300",
                        duration: 3000, // 3 seconds
                        gravity: "top", // Position on the top of the page
                        backgroundColor: "#2a96ff", // Set the background color of the toast
                    }).showToast();
                }
            }

            });
        })
        .then((result)=>{
            
            console.log("Success1: " , result);
        })
        .catch((error)=>console.log("Error:",error));
    })
}



function deleteProduct(ss){
    console.log("Delete Product :" + ss);

    const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
    fetchSession
    .then((res)=>res.json())
    .then((ans)=>{
        const stringData = JSON.stringify(ans)
        const parsedRes = JSON.parse(stringData);
        console.log("kjcdscdsnckwjcn" + parsedRes);
        console.log(parsedRes._id);
        fetch("https://healthecommerce-production.up.railway.app/api/cart/cartproduct/delete/" + ss , {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                userId:parsedRes._id,
            })
        }).then((res)=>{
            console.log("Success: Soura", res)
        }).catch((error)=>{
            console.log("Error:" + error);
        })
    })

//     $.ajax({
//         url:"https://healthecommerce-production.up.railway.app/api/cart/cartproduct/delete/" + ss,
//         method:'DELETE',
//         success:function(){
//           alert("Record has been deleted")
//         },
//         error:function(error){
//           alert(error)
//         }
//       })
}


function updateCart(product,quantity){
    alert("Done");
    const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
    fetchSession
    .then((res)=>res.json())
    .then((ans)=>{
        const stringData = JSON.stringify(ans)
        const parsedRes = JSON.parse(stringData);
            fetch("https://healthecommerce-production.up.railway.app/api/cart/update-cart-product", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId:parsedRes._id,
                    product:product,
                    quantity:quantity, 
                })
            }).then((data) => {
                console.log("Success:", data);
            }).catch((error) => {
                console.error("Error:", error);
            });
    })
    .catch((error) => {
            console.log("Error3:", error)
    })
}


async function coupon (){
    const couponcode = document.getElementById("couponCode").innerText;
    alert(coupon);
    const coupondata = await fetch("")
}