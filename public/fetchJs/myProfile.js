
function test(){

    const fetchSession = fetch("https://healthecommerce-production.up.railway.app/api/auth/getSession");
    fetchSession
    .then((res)=>res.json())
    .then((ans)=>{
        const stringData = JSON.stringify(ans)
        const parsedRes = JSON.parse(stringData);
        console.log("kjcdscdsnckwjcn" + parsedRes);
        console.log(parsedRes._id);
        const fetchRes = fetch("https://healthecommerce-production.up.railway.app/api/create/" + parsedRes._id);
        fetchRes.then((res)=>res.json())
        .then((d)=>{
            const res=JSON.stringify(d);
            const cvb = JSON.parse(res)
            console.log("CVB:",cvb)
            $("#orders").html();
            cvb.forEach(function (order) {


                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ];
                  
                const dateString = order.createdAt;
                const dateObject = new Date(dateString);

                const year = dateObject.getFullYear(); // 2023
                
                const monthIndex = dateObject.getMonth();
                const monthName = monthNames[monthIndex]; // Months are 0-indexed, so add 1
                const day = dateObject.getDate(); // 4

                if(order.status === 0){

                    var delivery = 'pending';


                    console.log(order)
                    order.order_detail.forEach(function (orderDetail) {
                      orderDetail.orderDeails.forEach(function (orderDeail) {
                        orderDeail.cartProducts.forEach(function (cartProduct) {
                          const productName = cartProduct.productname; // Extract the product name
                          console.log("Product Name:", productName);
                          const data = '<ol class="timeline history-timeline"><li class="timeline-block"><div class="timeline-date"><span>Order Date:</span><span> ' + year +  ' </span> ' + monthName + ' ' + day +'<sup>th</sup></div><div class="timeline-icon"><span class="dot-badge"></span></div><div class="timeline-content"><div class="row align-items-center"><div class="col-lg-7 col-md-12"><div class="content"><h3>Delivery: ' + delivery + ' </h3><p>Product: ' + productName + '</p></div></div><div class="col-lg-5 col-md-12"><div class="image"><img src="../../'+cartProduct.img+'"   style="max-width: 100px; max-height: 100px; alt="image"></div></div></div></div></li></ol>'
                          $("#orders").append(data);
                        });
                      });
                    });
                }


                else if(order.status === 1){

                    var delivery = 'Delivered';


                    order.order_detail.forEach(function (orderDetail) {
                        orderDetail.orderDeails.forEach(function (orderDeail) {
                          orderDeail.cartProducts.forEach(function (cartProduct) {
                            const productName = cartProduct.productname; // Extract the product name
                            console.log("Product Name:", productName);
                            const data = '<ol class="timeline history-timeline"><li class="timeline-block"><div class="timeline-date"><span>2010</span> February 20<sup>th</sup></div><div class="timeline-icon"><span class="dot-badge"></span></div><div class="timeline-content"><div class="row align-items-center"><div class="col-lg-7 col-md-12"><div class="content"><h3>Delivery: ' + delivery + ' </h3><p>Product: ' + productName + '</p></div></div><div class="col-lg-5 col-md-12"><div class="image"><img src=https://healthecommerce-production.up.railway.app/'+cartProduct.img+'" alt="image"></div></div></div></div></li></ol>'
                            $("#orders").append(data);
                          });
                        });
                      });
                }

              });
        })
    })
}


  
  document.getElementById("logout").addEventListener('click',function(){
    alert('Clicked');
    fetch('https://healthecommerce-production.up.railway.app/api/auth/logout',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        },
    }).then(()=>{
      window.location.replace = "http://localhost:5500"
      console.log("Success")
    }).catch((error)=>{
      console.log(error)
    })
  })