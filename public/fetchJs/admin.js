var counter = 1;
async function fetchOrder() {

    const fetchOrder = await fetch("http://localhost:5500/api/create/getOrders?page=1");
    const fetchOrderJson = await fetchOrder.json();

    //  fetchOrderJson is an array of objects
    fetchOrderJson.forEach(function (order) {

        // It is the Order id
        const id = order._id

        // console.log("Id" + id)

        const status = order.status;

        // Accessing the cartProducts array inside the order_detail array
        const cartProducts = order.order_detail[0].orderDeails[0].cartProducts;

        // Now you can do whatever you want with the cartProducts array
        console.log("Cart Products for Order: ", cartProducts);
        // For example, you can loop through cartProducts to get each product's details
        cartProducts.forEach(function (product) {
            console.log("Product Name: ", product.productname);
            console.log("Quantity: ", product.quantity);
            console.log("Price: ", product.productPrice);

            $("#table").html();

            const data =  '<tbody><tr><td><img src="img/people.png"><p>'+id+'</p></td><td>01-10-2021</td><td><span class="status completed">' + status + '</span></td></tr></tbody>'

            $("#table").append(data);

           
        });

         // Pagination

        $("pagination").html();
        var pagination = '<li><a id="p1" href="javascript:nextPage(' + counter + ')">' + counter + '</a></li>'
        $("#pagination").append(pagination);

        counter ++ ;

        var num =  '#p' + counter;
        var num1 =  'p' + counter; //Give the id 
        if(!$(num).length)
        {
          var pagination='<a class="page-numbers" id="'+num1+'" href="javascript:nextpage('+counter+')">'+counter+'</a>'
          $("#pagination").append(pagination);
        }

    });
}



async function nextpage(p){
    var c = 0;
    const fetchOrder = await fetch("http://localhost:5500/api/create/getOrders?page=1");
    const fetchOrderJson = await fetchOrder.json();

    //  fetchOrderJson is an array of objects
    fetchOrderJson.forEach(function (order) {

        // It is the Order id
        const id = order._id

        // console.log("Id" + id)

        const status = order.status;

        // Accessing the cartProducts array inside the order_detail array
        const cartProducts = order.order_detail[0].orderDeails[0].cartProducts;

        // Now you can do whatever you want with the cartProducts array
        console.log("Cart Products for Order: ", cartProducts);
        // For example, you can loop through cartProducts to get each product's details
        cartProducts.forEach(function (product) {
            console.log("Product Name: ", product.productname);
            console.log("Quantity: ", product.quantity);
            console.log("Price: ", product.productPrice);

            $("#table").html();

            const data =  '<tbody><tr><td><img src="img/people.png"><p>'+id+'</p></td><td>01-10-2021</td><td><span class="status completed">' + status + '</span></td></tr></tbody>'

            $("#table").append(data);

           
        });
        // Pagiantion 

        counter = p;  
        counter ++;
        var num =  '#p' + counter;
        var num1 =  'p' + counter;
        // For adding next pagination on clicking the previous one ....
        if(c==0){
        if(!$(num).length)
        {
        //   var some='<a class="page-numbers" id="'+num1+'" href="javascript:nextpage('+counter+')">'+counter+'</a>'
          var pagination = '<li><a id=" ' +num1 +' " href="javascript:nextPage(' + counter + ')">' + counter + '</a></li>'
          $("#pagination").append(pagination);
        }
      }
      })
  }
