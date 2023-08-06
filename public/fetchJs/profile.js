
document.addEventListener("DOMContentLoaded",async  function () {

    const errorsDiv = document.getElementById('errorsRegister');


    const form = document.getElementById("registerForm");
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        const formData = new FormData(form); // Collect form data
        
        // Convert form data into a JSON object
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });


     const billResponse = await   fetch("http://localhost:5500/api/auth/register",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    username:formDataObject.country,
                    email:formDataObject.address,
                    phone:formDataObject.town,
                    password:formDataObject.state,
                })
            });

            if(billResponse.ok){
                Toastify({
                    text: "Registration successfully",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();


            }
            
            else if(billResponse.status === 400){
                const errors = await billResponse.text();
                console.log(errors);
                // errorsDiv.innerHTML = errors;
                errorsDiv.innerHTML = `<div class="alert alert-warning" role="alert">Email Already registered...Provide another credentials</div>`;

            }

            else if(billResponse.status === 401){
                const errors = await billResponse.text();
                console.log(errors);
                // errorsDiv.innerHTML = errors;
                errorsDiv.innerHTML = `<div class="alert alert-warning" role="alert">Phone no.Already registered...Provide another credentials</div>`;

            }


            else{

                // alert("Not Done")
                    const errors = await billResponse.text();
                    console.log(errors);
                    errorsDiv.innerHTML = errors;
            }

        console.log(formDataObject.address); // Display the form data in the browser console
        // You can now process the data or send it to your backend using AJAX
    });
});

// Login 

document.addEventListener("DOMContentLoaded",async  function () {

    const errorsDiv = document.getElementById('errorsLogin');


    const form = document.getElementById("loginForm");
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        const formData = new FormData(form); // Collect form data
        
        // Convert form data into a JSON object
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        

     const billResponse = await   fetch("http://localhost:5500/api/auth/login",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    username:formDataObject.username,
                    email:formDataObject.email,
                    password:formDataObject.password,
                })
            })


        //     const billJson = billResponse.json();
        //     console.log(billJson.isAdmin);
        // console.log(billResponse.isAdmin);

            

            if(billResponse.ok){
                Toastify({
                    text: "Login successfully",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();

                const responseData = await billResponse.json();
                if (responseData.isAdmin === 1) {
                    // Admin login was successful, redirect to /admin
                    window.location.href = 'http://localhost:5500/admin.html'; // Replace '/admin' with the actual URL for admin panel
                } else {
                    // Customer login was successful, redirect to index.html
                    window.location.href = 'http://localhost:5500/index.html'; // Replace 'index.html' with your actual home page URL
                }
    
            }
            
            else if(billResponse.status === 500){
                const errors = await billResponse.text();
                console.log(errors);
                // errorsDiv.innerHTML = errors;
                errorsDiv.innerHTML = `<div class="alert alert-warning" role="alert">Something went wrong</div>`;

            }

            // else if(billResponse.status === 401){
            //     const errors = await billResponse.text();
            //     console.log(errors);
            //     // errorsDiv.innerHTML = errors;
            //     errorsDiv.innerHTML = `<div class="alert alert-warning" role="alert">Phone no.Already registered...Provide another credentials</div>`;

            // }


            else{

                // alert("Not Done")
                    const errors = await billResponse.text();
                    console.log(errors);
                    errorsDiv.innerHTML = errors;
            }

        console.log(formDataObject); // Display the form data in the browser console
        // You can now process the data or send it to your backend using AJAX
    });
});


$(document).ready(function() {
    // Open the modal when clicking the "Lost your password?" link
    $(".lost-your-password").click(function(e) {
        e.preventDefault();
        $("#passwordModal").css("display", "block");
    });

    // Close the modal when clicking the close button or outside the modal
    $(".close, .modal").click(function() {
        $("#passwordModal").css("display", "none");
    });

    // Prevent the modal from closing when clicking inside the modal content
    $(".modal-content").click(function(e) {
        e.stopPropagation();
    });

    $("#sendMailForm").submit(function(e) {
        e.preventDefault();
        const email = $("#email").val();
        sendForgotPasswordRequest(email);
    });

    // Function to send the "Forgot Password" request to the server
    function sendForgotPasswordRequest(email) {
        $.ajax({
            url: "http://localhost:5500/api/auth/forgot-password", // Update the endpoint based on your server setup
            method: "POST",
            data: { email: email },
            success: function(response) {
                // Email sent successfully, show a success message or do something else
                // console.log("Password reset link sent successfully!");
                Toastify({
                    text: "Password Link send Successfully",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();
                // You can show a success message or close the modal or redirect to another page, etc.
            },
            error: function(err) {
                Toastify({
                    text: "Not found",
                    duration: 3000, // 3 seconds
                    gravity: "top", // Position on the top of the page
                    backgroundColor: "#2a96ff", // Set the background color of the toast
                }).showToast();
                // Error sending email, handle the error
                console.error("Error sending password reset link:", err.responseText);
                // Show an error message or handle the error appropriately
            }
        });
    }
});