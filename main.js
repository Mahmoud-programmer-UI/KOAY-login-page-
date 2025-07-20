        const cart = document.getElementById("Cart");
        // Create an initial message for an empty cart
        let emptyCartMessage = document.createElement("p");
        let emptyCartMessage2 = document.createElement("a");
        emptyCartMessage.classList.add("empty-cart-message");
        emptyCartMessage2.classList.add("empty-cart-message2");
        emptyCartMessage.innerText = "Your cart is empty.";
        emptyCartMessage2.innerText = "continue shopping";
        emptyCartMessage.style.padding="10px 0"
        emptyCartMessage2.style.cssText="text-decoration: underline;color: black; display block;cursor:pointer"
        cart.appendChild(emptyCartMessage)
        cart.appendChild(emptyCartMessage2)
        // Get all product containers
        const productContainers = document.querySelectorAll(".product");
        // Get all product containers
        const features=document.querySelectorAll(".featured");

        // main functions is the parent of display all works of other functions.
        // so well help to get the error if happened 
        function main(){
            cartControll()
            visibilityOfNav()
            userSign()
            referenceCart()
            searchInput()
            createMoreToSee()
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
            const content2=document.getElementById("content-dimension2");
            icon.onclick=()=>{
                content2.style.display="none"
                form.style.display='block'
                document.body.style.cssText="display:flex;justify-content: center;background-color: rgb(115, 46, 199);"
            }
        }
        // create inputt to search for any product inside application
// ... (الكود الخاص بك قبل دالة searchInput)

function searchInput() {
    const icon = document.getElementsByTagName("i")[4];
    const shadow = document.getElementById("shadow"); // هذا هو العنصر الذي يحتوي على حقل البحث والـ li's
    const shadow2 = document.getElementById("shadow2"); // هذا هو عنصر الظل الذي يملأ الشاشة

    // إنشاء input, button, و close مرة واحدة
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search here...";
    input.id = "page-searching";
    input.classList.add("page-searching");

    let close = document.createElement("p");
    close.innerText = "X";
    close.classList.add("close-search");

    let containerValues = document.createElement("div"); // هذا سيحتوي على الـ li's الناتجة عن البحث
    containerValues.classList.add("search-results-container"); // أضف كلاس لتنسيقه
    
    shadow.appendChild(input);
    shadow.appendChild(close);
    shadow.appendChild(containerValues); // أضف الحاوية للنتائج

    // تخزين مراجع لجميع عناصر الـ featured والـ li's التي سننشئها
    const allFeatures = document.querySelectorAll(".featured");
    const searchItemsData = []; // لتخزين البيانات الأساسية للبحث (p.textContent من كل feature)

    // إنشاء الـ li's مرة واحدة عند تهيئة دالة searchInput
    allFeatures.forEach((feature) => {
        const searchMessage = feature.querySelector("p"); // النص الذي نبحث عنه داخل الـ feature
        if (searchMessage) {
            let p = document.createElement("p");
            p.innerHTML = searchMessage.textContent;
            p.classList.add("search-result-item"); // أضف كلاس لتنسيق عناصر النتائج
            p.style.display = 'none'; // أخفِها مبدئيًا
            containerValues.appendChild(p);

            // تخزين مرجع الـ li والـ feature والنص المرتبط بهما
            searchItemsData.push({
                text: searchMessage.textContent.trim().toLowerCase(),
                liElement: p,
                featureElement: feature
            });
        }
    });

    // إظهار المودال (نافذة البحث)
    icon.onclick = () => {
        shadow.style.display = "block";
        shadow2.style.display = "block";
        input.value = ''; // مسح حقل البحث عند الفتح
        // إخفاء جميع عناصر النتائج عند فتح مربع البحث فارغًا
        searchItemsData.forEach(item => {
            item.liElement.style.display = 'none';
            // لا تخفي الـ feature هنا، لأنها قد تكون مرئية في الصفحة الأصلية
        });
        // تأكد من أن جميع الـ features مرئية في الصفحة الأصلية عند فتح البحث
        allFeatures.forEach(feature => {
            feature.style.display = 'block';
        });
    };

    // إخفاء المودال (نافذة البحث)
    close.onclick = () => {
        shadow.style.display = "none";
        shadow2.style.display = "none";
        input.value = ''; // مسح حقل البحث عند الإغلاق
        // عند الإغلاق، يجب التأكد من أن جميع الـ features مرئية في الصفحة الرئيسية مرة أخرى
        allFeatures.forEach(feature => {
            feature.style.display = 'block';
        });
        // إخفاء الـ li's الموجودة في نافذة البحث
        searchItemsData.forEach(item => {
            item.liElement.style.display = 'none';
        });
    };

    // منطق البحث
    input.oninput = () => {
        const inputValue = input.value.trim().toLowerCase();
        let anyMatchFound = false; // لتتبع ما إذا تم العثور على أي تطابقات

        // إذا كان حقل البحث فارغًا، أخفِ كل الـ li's في نافذة البحث وأظهِر كل الـ features في الصفحة الأصلية
        if (inputValue === '') {
            searchItemsData.forEach(item => {
                item.liElement.style.display = 'none';
            });
            allFeatures.forEach(feature => {
                feature.style.display = 'block'; // أظهِر كل الـ features في الصفحة الأصلية
            });
            // إذا كنت تريد إظهار رسالة "لا يوجد بحث" بدلاً من إخفاء كل شيء، يمكنك تعديل هذا.
            // حاليًا، هذا يختفي كل النتائج عندما يكون البحث فارغًا.
            return; // توقف عن تنفيذ بقية الدالة
        }

        // تكرار على البيانات المخزنة (التي تم إنشاؤها مرة واحدة)
        searchItemsData.forEach(item => {
            const messageText = item.text; // النص المحفوظ من الـ p
            const p = item.liElement;     // عنصر الـ li المرتبط
            const feature = item.featureElement; // عنصر الـ feature المرتبط

            if (messageText.includes(inputValue)) {
                p.style.display = 'block'; // أظهر عنصر الـ li داخل نافذة البحث
                feature.style.display = 'block'; // أظهر عنصر الـ feature في الصفحة الأصلية
                anyMatchFound = true;
            } else {
                p.style.display = 'none'; // أخفِ عنصر الـ li داخل نافذة البحث
                feature.style.display = 'none'; // أخفِ عنصر الـ feature في الصفحة الأصلية
            }
        });

        // رسالة "لا يوجد تطابق"
        // يمكنك إظهار رسالة داخل containerValues بدلاً من alert
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
                // If the empty cart message exists, remove it
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
main()
