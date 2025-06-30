        const cart = document.getElementById("Cart");
        // Create an initial message for an empty cart
        let emptyCartMessage = document.createElement("p");
        emptyCartMessage.classList.add("empty-cart-message");
        emptyCartMessage.innerText = "Your cart is empty.";
        cart.appendChild(emptyCartMessage)
        // Get all product containers
        const productContainers = document.querySelectorAll(".product");
        // main functions is the parent of display all works of other functions.
        // so well help to get the error if happened 
        function main(){
            cartControll()
            visibilityOfNav()
            userSign()
            searchInput()
            // Iterate over each product container and set up its behavior
            productContainers.forEach(setupProduct);
        }
        // display the cart
        function cartControll(){
            const icon=document.getElementsByTagName("i")[5];
            const content1=document.getElementById("content-dimension1");
            const content2=document.getElementById("content-dimension2");
            icon.onclick=()=>{
                content1.style.display="block"
                content2.style.display="none"
            }
        }
        function visibilityOfNav(){
            let spans=document.getElementsByTagName("span")[2]
            let list=document.getElementsByTagName("div")[15];
            spans.onclick=()=>{
                list.classList.toggle("is-visible");
            }
        }
        // Log in page
        function userSign(){
            const icon=document.getElementsByTagName("i")[3];
            const form=document.getElementsByClassName("container-form")[0]
            const content1=document.getElementById("content-dimension1");
            const content2=document.getElementById("content-dimension2");
            icon.onclick=()=>{
                content2.style.display="none"
                form.style.display='block'
                document.body.style.cssText="display:flex;justify-content: center;    background-color: rgb(115, 46, 199);"
            }
        }
        // create inputt to search for any product inside application
function searchInput() {
    const icon = document.getElementsByTagName("i")[4];
    const shadow = document.getElementById("shadow");
    const shadow2 = document.getElementById("shadow2");

    // Create input, button, and close once
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search here...";
    input.id = "page-searching";
    input.classList.add("page-searching");

    let button = document.createElement("button");
    button.innerText = "Search";
    button.classList.add("btn-search");

    let close = document.createElement("p");
    close.innerText = "X";
    close.classList.add("close-search");

    shadow.appendChild(input);
    shadow.appendChild(button);
    shadow.appendChild(close);

    // Show modal
    icon.onclick = () => {
        shadow.style.display = "block";
        shadow2.style.display = "block";
    };

    // Hide modal
    close.onclick = () => {
        shadow.style.display = "none";
        shadow2.style.display = "none";
    };

    // Search logic
button.onclick = () => {
    const inputValue = input.value.trim().toLowerCase();
    let found = false;
    const features=document.querySelectorAll(".featured");
    features.forEach((feature) => {
        const searchMessage = feature.querySelector(".search-message");
        if (searchMessage) {
            const messageText = searchMessage.textContent.trim().toLowerCase();
            
            if (messageText === inputValue) {
                console.log("Match found:", messageText);
                found = true;
                // Optional: show only matching feature
                feature.style.display = "block";
            } else {
                // Optional: hide non-matching
                feature.style.display = "none";
            }
        }
    });

    if (!found) {
        alert("No match found");
    }
};

}
            //to make users sure that their Items in the cart
            // so it`s an alert for users
            function referenceCart(){
                let iconLogo=document.getElementsByTagName("div")[15];
                iconLogo.style.position="relative"
                let referenceCartParagraph=document.createElement("p")
                referenceCartParagraph.classList.add("reference-cart")
                referenceCartParagraph.id= "reference-cart"
                iconLogo.appendChild(referenceCartParagraph) 
                return referenceCartParagraph;
            }
            referenceCart()
        // This array will hold references to the cloned images in the cart
        let savedImagesInCart = [];

        function setupProduct(container) {
            // Get the appearance div and the image within the current product container
            const appearance = container.querySelector(".apperance");
            const image = container.querySelector("img");

            // Create the "ADD TO CART" link
            const addToCartLink = document.createElement("a");
            addToCartLink.innerHTML = "ADD TO CART";
            addToCartLink.style.display = "none"; // Initially hidden
            addToCartLink.classList.add("add-to-cart-link"); // Add a class for potential styling
            addToCartLink.style.cursor="pointer"
            // Add hover effects to show/hide the "ADD TO CART" link
            appearance.addEventListener("mouseenter", function () {
               addToCartLink.style.cssText = "display:block;animation: appear 0.5s ease-in-out forwards 1; "
            });
            appearance.addEventListener("mouseleave", function () {
                addToCartLink.style.display = "none"                    
            });

            // Handle click event for "ADD TO CART"
            addToCartLink.onclick = function () {
                // If the empty cart message exists, remove it
                if (emptyCartMessage && emptyCartMessage.parentNode === cart) {
                    cart.removeChild(emptyCartMessage);
                    emptyCartMessage = null; // Clear the reference
                    // display the alert cart
                    const referenceCartParagraph=document.getElementById("reference-cart");
                    referenceCartParagraph.style.display="block"
                }

                // Clone the image from the product card
                const imgCopy = image.cloneNode(true);

                // Create a "remove" button for the cart item
                const removeItemBtn = document.createElement("p");
                removeItemBtn.innerText = "Remove";
                removeItemBtn.classList.add("remove-item-btn"); // Add class for styling

                // Create a container for the cart item (image + remove button)
                const cartItemContainer = document.createElement("div");
                cartItemContainer.classList.add("cart-item-container");

                // Set styles for the cloned image in the cart
                imgCopy.style.width = "80px"; // Smaller size for cart
                imgCopy.style.height = "100px";
                imgCopy.style.borderRadius = "0.5rem"; // Rounded corners for cart image

                // Append the cloned image and remove button to the item container
                cartItemContainer.appendChild(imgCopy);
                cartItemContainer.appendChild(removeItemBtn);

                // Append the new cart item container to the main cart div
                cart.appendChild(cartItemContainer);

                // Add the cloned image reference to our tracking array (optional, for state management)
                savedImagesInCart.push(imgCopy);
                // Handle click event for the "remove" button
                removeItemBtn.onclick = function () {
                    // Remove the entire cart item container from the DOM
                    cart.removeChild(cartItemContainer);
                    // If the cart becomes empty after removal, re-add the "empty cart" message
                    if (cart.children.length === 0) {
                        emptyCartMessage = document.createElement("p");
                        emptyCartMessage.classList.add("empty-cart-message");
                        emptyCartMessage.innerText = "Your cart is empty.";
                        cart.appendChild(emptyCartMessage);
                    }
                };
            };

            // Append the "ADD TO CART" link to the product's appearance div
            appearance.appendChild(addToCartLink);
        }
        function createMoreToSee(){
            for(let i=1; i<20;i++){
            let feature=document.createElement("div")
            feature.classList.add("featured")
            let imgContainer=document.createElement("div")
            imgContainer.classList.add("img-container")
            let img=document.createElement("img")
            imgContainer.appendChild(img)
            let textImg=document.createElement("div")
            let pImg=document.createElement("p")
            let price=document.createElement("p")
            textImg.appendChild(pImg)
            textImg.appendChild(price)
            feature.appendChild(imgContainer)
            feature.appendChild(textImg)
            if(i==1) {
                img.src="specific src" 
                pImg.innerText="specific value"
                price.innerHTML="<span>LE </span> <del>LE </del>"
            }else if (i==2){ 
                img.src="other specific src";
            }
                // etc...
        
        }
        }
        createMoreToSee()
main()