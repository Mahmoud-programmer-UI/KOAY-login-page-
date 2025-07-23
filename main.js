        const cart = document.getElementById("Cart");
        // Create an initial message for an empty cart
        let emptyCartMessage = document.createElement("p");
        emptyCartMessage.classList.add("empty-cart-message");
        emptyCartMessage.innerText = "Your cart is empty.";
        emptyCartMessage.style.padding="10px 0"
        cart.appendChild(emptyCartMessage)
        // Get all product containers
        const productContainers = document.querySelectorAll(".product");

        // main functions is the parent of display all works of other functions.
        // so well help to get the error if happened 
    function main(){
        cartControll()
        visibilityOfNav()
        userSign()
        referenceCart()
        searchInput()
        // loop over each product container and set up its behavior
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
            let list=document.getElementsByTagName("div")[16];
            spans.onclick=()=>{
                list.classList.toggle("is-visible");
            }
        }
        // Log in page
        function userSign(){
            const icon=document.getElementsByTagName("i")[3];
            const form=document.getElementsByClassName("container-form")[0]
            const content2=document.getElementById("content-dimension2");
            icon.onclick=()=>{
                content2.style.display="none"
                form.style.display='block'
                document.body.style.cssText="display:flex;justify-content: center;background-color: rgb(115, 46, 199);"
            }
        }
        // create inputt to search for any product inside application

        function searchInput() {
            const icon = document.getElementsByTagName("i")[4];
            const shadow = document.getElementById("shadow"); 
            const shadow2 = document.getElementById("shadow2"); 

            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Search here...";
            input.id = "page-searching";
            input.classList.add("page-searching");

            let close = document.createElement("p");
            close.innerText = "X";
            close.classList.add("close-search");

            let containerValues = document.createElement("div"); //container will hold the results of search
            containerValues.classList.add("search-results-container");
            
            shadow.appendChild(input);
            shadow.appendChild(close);
            shadow.appendChild(containerValues);

            const allFeatures = document.querySelectorAll(".featured");
            const searchItemsData = []; //store the value of paragraph`s featured

            // intial values of paragraphes 
            allFeatures.forEach((feature) => {
                const searchMessage = feature.querySelector("p"); // النص الذي نبحث عنه داخل الـ feature
                if (searchMessage) {
                    let p = document.createElement("p");
                    p.innerHTML = searchMessage.textContent;
                    p.classList.add("search-result-item"); 
                    p.style.display = 'none'; 
                    containerValues.appendChild(p);

                    // store lis reference
                    searchItemsData.push({
                        text: searchMessage.textContent.trim().toLowerCase(),
                        liElement: p,
                        featureElement: feature
                    });
                }
            });

            icon.onclick = () => {
                shadow.style.display = "block";
                shadow2.style.display = "block";
                input.value = ''; 
                searchItemsData.forEach(item => {
                    item.liElement.style.display = 'none';
                    // cause of all lis can be showed while input value empty
                });
                // be sure that products are appeared in page
                allFeatures.forEach(feature => {
                    feature.style.display = 'block';
                });
            };

            close.onclick = () => {
                shadow.style.display = "none";
                shadow2.style.display = "none";
                // cleare input for does not take memory
                input.value = '';
                // be sure that products are appeared in page
                allFeatures.forEach(feature => {
                    feature.style.display = 'block';
                });
                // cause of all lis can be showed while input value empty
                searchItemsData.forEach(item => {
                    item.liElement.style.display = 'none';
                });
            };

            input.oninput = () => {
                const inputValue = input.value.trim().toLowerCase();
                let anyMatchFound = false; // for follow the matches in search

                if (inputValue === '') {
                    searchItemsData.forEach(item => {
                        item.liElement.style.display = 'none';
                    });
                    allFeatures.forEach(feature => {
                        feature.style.display = 'block'; 
                    });
                    return;    
                }
                searchItemsData.forEach(item => {
                    const messageText = item.text; 
                    const p = item.liElement;     
                    const feature = item.featureElement;
                    if (messageText.includes(inputValue)) {
                        p.style.display = 'block'; 
                        feature.style.display = 'block';
                        anyMatchFound = true;
                    } else {
                        p.style.display = 'none'; 
                        feature.style.display = 'none'; 
                    }
                });
                // if no matches will warn you
                if (!anyMatchFound) {
                    alert("no match founded")
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
                // If the empty cart message found, remove it
                if (emptyCartMessage && emptyCartMessage.parentNode === cart) {
                    cart.removeChild(emptyCartMessage);
                    cart.removeChild(emptyCartMessage2);
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
                imgCopy.style.width = "80px";
                imgCopy.style.height = "100px";
                imgCopy.style.borderRadius = "0.5rem";
                cartItemContainer.appendChild(imgCopy);
                cartItemContainer.appendChild(removeItemBtn);
                cart.appendChild(cartItemContainer);
                savedImagesInCart.push(imgCopy);
                removeItemBtn.onclick = function () {
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

    main()