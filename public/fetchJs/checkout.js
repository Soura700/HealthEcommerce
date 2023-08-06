const totalPriceAfterDiscount = sessionStorage.getItem('discountPrice');
const couponId = sessionStorage.getItem('Id');

    document.addEventListener("DOMContentLoaded",async  function () {

        const errorsDiv = document.getElementById('errors');


        const response = await fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession"); //Fetching the session of the user to et th euser id
        const data = await response.json();


        const form = document.getElementById("shippingForm");
        
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent the form from submitting normally
            
            const formData = new FormData(form); // Collect form data
            
            // Convert form data into a JSON object
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });


         const billResponse = await   fetch("https://healthecommerce-production.up.railway.app/api/bill/createbill",{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                        id:data._id,
                        country:formDataObject.country,
                        address:formDataObject.address,
                        town:formDataObject.town,
                        state:formDataObject.state,
                        zip:formDataObject.zip,
                    })
                });

                if(billResponse.ok){
                    Toastify({
                        text: "Shipping details filled successfully",
                        duration: 3000, // 3 seconds
                        gravity: "top", // Position on the top of the page
                        backgroundColor: "#2a96ff", // Set the background color of the toast
                    }).showToast();
    
                }else{
                    // alert("Not Done")
                        const errors = await billResponse.text();
                        console.log(errors);
                        errorsDiv.innerHTML = errors;
                }

            console.log(formDataObject.address); // Display the form data in the browser console
            // You can now process the data or send it to your backend using AJAX
        });
    });




function test(){

    var total = 0;
    const shippingCharge = 15.00;
    var alltotal = 0;
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
            const cvb = JSON.parse(res);

            // console.log("asx sa sa xsa xamxksamxlkas" + cvb)
            if(cvb === null ){

                // // alert("ankc a csajcnasdnsaklndlksandc")
                Toastify({
                    text: "Please Select items from the cart...",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();

                setTimeout(()=>{
                    Toastify({
                        text: "Returnig to the home page",
                        duration: 3000, // 3 seconds
                        gravity: "top", // Position on the top of the page
                        backgroundColor: "#2a96ff", // Set the background color of the toast
                    }).showToast();
                },1000)


                setTimeout(()=>{
                    window.location.replace ("http://localhost:5500");
                },2000)
                // window.location.replace ("http://localhost:5500");

                $("#cart-total").html();
                document.getElementById("cart_title").style.display = "none"

                document.getElementById("payment_method").style.display = "none";
            }

            else{
                $("#cart-total").html();
                cvb.cartProducts.forEach(function(v,k){
                    total = total +  v.quantity*v.productPrice;
    
                    const data = '<tr><td>'+v.productname+'<strong>× '+v.quantity+'</strong></td><td>$'+v.quantity*v.productPrice+'</td></tr>';
                    $("#cart-total").append(data);
                })           
                console.log("total:"+total);
                alltotal = total + shippingCharge;
                $("#cart-total").append('<tr><td>Shipping and Handing</td><td>$15.00</td></tr><tr><td>Vat</td><td>$00.00</td></tr><tr><td><strong>Order Total</strong></td><td id="total"><strong>$'+alltotal+'</strong></td></tr><tr><td><strong>Order Total After Discount</strong></td><td id="total"><strong>$'+ ( alltotal-totalPriceAfterDiscount ) +'</strong></td></tr>')  
            }

            // Assuming the discount is stored in the session as 'discountPrice'..so that it will not take the discount for another order'

            sessionStorage.removeItem('discountPrice');

            // $("#cart-total").html();
            // cvb.cartProducts.forEach(function(v,k){
            //     total = total +  v.quantity*v.productPrice;

            //     const data = '<tr><td>'+v.productname+'<strong>× '+v.quantity+'</strong></td><td>$'+v.quantity*v.productPrice+'</td></tr>';
            //     $("#cart-total").append(data);
            // })           
            // console.log("total:"+total);
            // alltotal = total + shippingCharge;
            // $("#cart-total").append('<tr><td>Shipping and Handing</td><td>$15.00</td></tr><tr><td>Vat</td><td>$00.00</td></tr><tr><td><strong>Order Total</strong></td><td id="total"><strong>$'+alltotal+'</strong></td></tr><tr><td><strong>Order Total After Discount</strong></td><td id="total"><strong>$'+ ( alltotal-totalPriceAfterDiscount ) +'</strong></td></tr>')  


            // Get the value of the "Order Total" and console it
            const orderTotalValue = document.getElementById("total").innerText;
            console.log("Order Total:", orderTotalValue);
        })
        .then((result)=>{
            console.log("Success1: " , result);
        })
        .catch((error)=>console.log("Error:",error));
    })
}


// Cash on delivery 

function cashOnDelivery(){
    alert("Done");
    const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
    fetchSession
    .then((res)=>res.json())
    .then((ans)=>{
        const stringData = JSON.stringify(ans)
        const parsedRes = JSON.parse(stringData);
        // console.log("kjcdscdsnckwjcn Soura      " + parsedRes);
        console.log(parsedRes._id);

        console.log(couponId);

        // If coupon present the the discount will be the coupon dicount ammount .....

        if(couponId){
            alert("Executed if block");

            const couponData = fetch("https://healthecommerce-production.up.railway.app/api/coupon/get/" + couponId)

            couponData.then((res)=>res.json())
            .then( async (d)=>{
                 const data = JSON.stringify(d); 
                 const parsedData = JSON.parse(data);
     
                 console.log( 'parsed data' +parsedData.use + parsedData.discount);


                
                const fetchCart = await fetch ("https://healthecommerce-production.up.railway.app/api/cart/cartproducts/" + parsedRes._id)

                

                const fetchCartJson = fetchCart.json();

                

                


                 fetch("https://healthecommerce-production.up.railway.app/api/create/order",{
                    method:"POST",
                    headers: {
                            "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                        id:parsedRes._id,
                        paymentWay:"COD",
                        discount:parsedData.discount,
                        priceAfterDiscount: (fetchCartJson.totalPrice - parsedData.discount)
                    })
                }).then((data)=>{
        
                    // console.log("Updating the order on succesful order");
        
                    // alert("Data Updatation");
        
                    fetch("https://healthecommerce-production.up.railway.app/api/products/update",{
                        method:"PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({userId:parsedRes._id})
                    }).then((a)=>{
        
                        // Order has been created so deleting the cart
                        alert("Cart Deletion"); 
                         
                        fetch("https://healthecommerce-production.up.railway.app/api/cart/delete/" + parsedRes._id , {
                        method:"DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                     })
                        console.log("Product Update Success" + a)
        
                        const getCoupon = fetch("https://healthecommerce-production.up.railway.app/api/coupon/get/" + couponId);
        
                        getCoupon.then((res)=>res.json())
                        .then((coupon)=>{
                            const stringCoupon = JSON.stringify(coupon); 
                            const stringCouponParse = JSON.parse(stringCoupon);
        
                            console.log("Coupon" + stringCouponParse + stringCouponParse._id);
        
                            // const updateCoupon =
                            // Updating the coupon status to 2
                             fetch('https://healthecommerce-production.up.railway.app/api/coupon/update/' + couponId,{
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    use:2,
                                })
                            }).then((res)=>{

                                console.log("Success");

                                Toastify({
                                    text: "Order Succesfully Created",
                                    duration: 3000, // 3 seconds
                                    gravity: "top", // Position on the top of the page
                                    backgroundColor: "#2a96ff", // Set the background color of the toast
                                }).showToast();

                                
                            })
                        })
        
                    })
                    // console.log("Success:",data);
                }).catch((error)=>{
                    console.log("Error:",error)
                });
            })     
        }

        // Else no coupon present then the discount will be zero


        else{
            alert("Else Block")

            fetch("https://healthecommerce-production.up.railway.app/api/create/order",{
                method:"POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    id:parsedRes._id,
                    paymentWay:"COD",
                    discount:0
                })
            }).then((data)=>{
    
                console.log("Updating the order on succesful order");
    
                alert("Data Updatation");
    
                fetch("https://healthecommerce-production.up.railway.app/api/products/update",{
                    method:"PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({userId:parsedRes._id})
                }).then((a)=>{
    
                    // Order has been created so deleting the cart
                    alert("Cart Deletion"); 
                     
                    fetch("https://healthecommerce-production.up.railway.app/api/cart/delete/" + parsedRes._id , {
                    method:"DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                 })
                    console.log("Product Update Success" + a)
    
                    const getCoupon = fetch("https://healthecommerce-production.up.railway.app/api/coupon/get/" + couponId);
    
                    getCoupon.then((res)=>res.json())
                    .then((coupon)=>{
                        const stringCoupon = JSON.stringify(coupon); 
                        const stringCouponParse = JSON.parse(stringCoupon);
    
                        console.log("Coupon" + stringCouponParse + stringCouponParse._id);
    
                        // const updateCoupon =
                        // Updating the coupon status to 2
                         fetch('https://healthecommerce-production.up.railway.app/api/coupon/update/' + couponId,{
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                use:1,
                            })
                        }).then((res)=>{
                            console.log("Success");
                        })
                    })
    
                })
    
                 .then(response => {
    
                })
                // console.log("Success:",data);
            }).catch((error)=>{
                console.log("Error:",error)
            });    
        }




        // fetch("https://healthecommerce-production.up.railway.app/api/create/order",{
        //     method:"POST",
        //     headers: {
        //             "Content-Type": "application/json",
        //     },
        //     body:JSON.stringify({
        //         id:parsedRes._id,
        //         paymentWay:"COD"
        //     })
        // }).then((data)=>{

        //     console.log("Updating the order on succesful order");

        //     alert("Data Updatation");

        //     fetch("https://healthecommerce-production.up.railway.app/api/products/update",{
        //         method:"PUT",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify({userId:parsedRes._id})
        //     }).then((a)=>{

        //         // Order has been created so deleting the cart
        //         alert("Cart Deletion"); 
                 
        //         fetch("https://healthecommerce-production.up.railway.app/api/cart/delete/" + parsedRes._id , {
        //         method:"DELETE",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //      })
        //         console.log("Product Update Success" + a)

        //         const getCoupon = fetch("https://healthecommerce-production.up.railway.app/api/coupon/get/" + couponId);

        //         getCoupon.then((res)=>res.json())
        //         .then((coupon)=>{
        //             const stringCoupon = JSON.stringify(coupon); 
        //             const stringCouponParse = JSON.parse(stringCoupon);

        //             console.log("Coupon" + stringCouponParse + stringCouponParse._id);

        //             // const updateCoupon =
        //             // Updating the coupon status to 2
        //              fetch('https://healthecommerce-production.up.railway.app/api/coupon/update/' + couponId,{
        //                 method: "PUT",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //                 body: JSON.stringify({
        //                     use:1,
        //                 })
        //             }).then((res)=>{
        //                 console.log("Success");
        //             })
        //         })

        //     })

        //      .then(response => {

        //     })
        //     // console.log("Success:",data);
        // }).catch((error)=>{
        //     console.log("Error:",error)
        // });

        
    })
    .catch((error)=>{
        console.log(error)
    })
}






const payWithCODBtn = document.getElementById("cod-btn");
payWithCODBtn.addEventListener("click", cashOnDelivery);

// Card Payment 2

// const botton = document.getElementById("pay-with-paypal-btn")
// botton.addEventListener("click",()=>{
//     console.log("Chekckout")
//     fetch("https://healthecommerce-production.up.railway.app/api/checkout-session",{
//         method:"POST",
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({
//             items:[
//                 {id:1,quantity:3},
//                 {id:2,quantity:1},
//             ]
//         })
//     }).then(res=>{
//         if(res.ok) return res.json();
//         return res.json().then(json=>Promise.reject(json))//Failure
//     }).then(({url})=>{
//         console.log(url);
//         window.location = url;
//     }).catch((err)=>console.log(err))
// })


// Card Payment 3


// Your frontend JavaScript code


const button = document.getElementById("pay-with-paypal-btn");

button.addEventListener("click", async () => {
try {

const fetchSession = await fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");

const res = await fetchSession.json();

const ans = JSON.stringify(res);

const parsedRes = JSON.parse(ans);
console.log( typeof(parsedRes._id) + parsedRes._id );

// Step 1: Fetch the cart products for the user using the userId
const userId = parsedRes._id; // Replace this with the actual userId (from authentication or other source)


const cartProductsResponse = await fetch("https://healthecommerce-production.up.railway.app/api/cart/cartproducts/" + parsedRes._id);
const cartProductsData = await cartProductsResponse.json();
const resProduct = JSON.stringify(cartProductsData);
const ansData = JSON.parse(resProduct);
console.log(ansData.cartProducts);

// Assuming the response is an array of cart products, you might want to adjust the data structure accordingly
const items = cartProductsData.cartProducts.map((item) => ({
id: item.product._id, // Use the correct identifier for the product, e.g., _id or some other unique identifier
quantity: item.quantity,
}));

// const items = cartProductsData.cartProducts.map((item) => {
//   const imageUrl = validateImageUrl(item.img);
//   return {
//     id: item.product._id,
//     quantity: item.quantity,
//     img: imageUrl,
//   };
// });


console.log("Items" + items);

// Step 2: Use the cart products data to create the checkout session
const checkoutSessionResponse = await fetch("https://healthecommerce-production.up.railway.app/api/checkout-session", {
method: "POST",
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ userId , items }),
});

if (!checkoutSessionResponse.ok) {
const errorData = await checkoutSessionResponse.json();
throw new Error(errorData.message);
}

const { url } = await checkoutSessionResponse.json();
console.log(url);
window.location = url;
} catch (err) {
console.log(err);
}
});