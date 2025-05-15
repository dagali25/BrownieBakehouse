document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    let cart = [];
    
    // Toggle cart sidebar
    cartIcon.addEventListener('click', function() {
        cartSidebar.style.right = '0';
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.style.right = '-100%';
    });
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemType = this.getAttribute('data-item');
            let item = {};
            
            switch(itemType) {
                case 'Brownie Box':
                    const brownieQty = document.getElementById('brownieBox').value;
                    if (brownieQty === '0') return;
                    
                    item = {
                        name: 'Brownie Box',
                        quantity: brownieQty,
                        price: 28 * parseInt(brownieQty),
                        details: `${brownieQty} box(es) of 16 brownies`
                    };
                    break;
                    
                case 'Brownie Box + Strawberries':
                    const brownieStrawQty = document.getElementById('brownieStrawberries').value;
                    if (brownieStrawQty === '0') return;
                    
                    item = {
                        name: 'Brownie Box + Strawberries',
                        quantity: brownieStrawQty,
                        price: 35 * parseInt(brownieStrawQty),
                        details: `${brownieStrawQty} box(es) of 16 brownies with chocolate strawberries`
                    };
                    break;
                    
                case 'Mini Fruit Tarts':
                    const tartsQty = document.getElementById('fruitTarts').value;
                    if (tartsQty === '0') return;
                    
                    const price = tartsQty === '9' ? 10 : 18;
                    const count = tartsQty === '9' ? '9' : '18';
                    
                    item = {
                        name: 'Mini Fruit Tarts',
                        quantity: 1,
                        price: price,
                        details: `${count} mini fruit tarts`
                    };
                    break;
                    
                case 'Trifle Shots':
                    const trifleQty = document.getElementById('trifleQuantity').value;
                    if (trifleQty === '0') return;
                    
                    const flavor1 = document.getElementById('trifleFlavor1').value;
                    const flavor2 = document.getElementById('trifleFlavor2').value;
                    
                    if (!flavor1) {
                        alert('Please select at least one flavor');
                        return;
                    }
                    
                    let flavors = flavor1;
                    if (flavor2) flavors += `, ${flavor2}`;
                    
                    item = {
                        name: 'Trifle Shots',
                        quantity: trifleQty,
                        price: 48 * parseInt(trifleQty),
                        details: `${trifleQty} box(es) of 24 shots (${flavors})`
                    };
                    break;
                    
                case 'Cheesecake Shots':
                    const cheesecakeQty = document.getElementById('cheesecakeQuantity').value;
                    if (cheesecakeQty === '0') return;
                    
                    const cFlavor1 = document.getElementById('cheesecakeFlavor1').value;
                    const cFlavor2 = document.getElementById('cheesecakeFlavor2').value;
                    
                    if (!cFlavor1) {
                        alert('Please select at least one flavor');
                        return;
                    }
                    
                    let cFlavors = cFlavor1;
                    if (cFlavor2) cFlavors += `, ${cFlavor2}`;
                    
                    item = {
                        name: 'Cheesecake Shots',
                        quantity: cheesecakeQty,
                        price: 48 * parseInt(cheesecakeQty),
                        details: `${cheesecakeQty} box(es) of 24 shots (${cFlavors})`
                    };
                    break;
                    
                case 'Classic Dessert Shots':
                    const classicQty = document.getElementById('classicQuantity').value;
                    if (classicQty === '0') return;
                    
                    const clFlavor1 = document.getElementById('classicFlavor1').value;
                    const clFlavor2 = document.getElementById('classicFlavor2').value;
                    
                    if (!clFlavor1) {
                        alert('Please select at least one flavor');
                        return;
                    }
                    
                    let clFlavors = clFlavor1;
                    if (clFlavor2) clFlavors += `, ${clFlavor2}`;
                    
                    item = {
                        name: 'Classic Dessert Shots',
                        quantity: classicQty,
                        price: 48 * parseInt(classicQty),
                        details: `${classicQty} box(es) of 24 shots (${clFlavors})`
                    };
                    break;
            }
            
            addToCart(item);
        });
    });
    
    function addToCart(item) {
        cart.push(item);
        updateCart();
        
        // Reset selectors
        document.querySelectorAll('.quantity-select').forEach(select => {
            select.value = '0';
        });
        
        document.querySelectorAll('.flavor-select').forEach(select => {
            select.value = '';
        });
    }
    
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            cartCount.textContent = '0';
            cartTotal.textContent = '£0';
            return;
        }
        
        let total = 0;
        let itemCount = 0;
        
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">${item.details}</div>
                </div>
                <div class="cart-item-price">£${item.price}</div>
                <button class="remove-item" data-index="${index}">&times;</button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            
            total += item.price;
            itemCount += parseInt(item.quantity);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
        
        cartCount.textContent = itemCount;
        cartTotal.textContent = `£${total}`;
    }
    
    // WORKING WhatsApp Checkout Functionality
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        // Build the order message with proper line breaks
        let message = `Hello Brownie Bakehouse,\n\nI would like to place an order:\n\n`;
        
        cart.forEach(item => {
            message += `• ${item.name}\n`;
            message += `  - ${item.details}\n`;
            message += `  - Price: £${item.price}\n\n`;
        });
        
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        message += `*TOTAL: £${totalPrice}*\n\n`;
        message += 'Please let me know how to proceed with payment and delivery. Thank you!';
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Create WhatsApp URL with international number format
        const whatsappUrl = `https://wa.me/447869990011?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.location.href = whatsappUrl;
    });
    
    // WORKING WhatsApp Contact Button
    whatsappBtn.addEventListener('click', function() {
        // Simple contact URL without message
        const whatsappUrl = 'https://wa.me/447869990011';
        window.location.href = whatsappUrl;
    });
    
    // Image gallery modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');

    // Make gallery items clickable
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                modal.style.display = 'block';
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                captionText.textContent = img.alt;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
document.addEventListener('DOMContentLoaded', function() {
    // [Previous cart and UI code remains exactly the same until the checkoutBtn event listener]

    // WORKING WhatsApp Checkout with Order Details
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        // Build the order summary
        let orderSummary = `*NEW ORDER*%0A%0A`;
        orderSummary += `*Customer Order Details*%0A`;
        
        // Add each cart item to the summary
        cart.forEach((item, index) => {
            orderSummary += `%0A*Item ${index + 1}*: ${item.name}%0A`;
            orderSummary += `- Details: ${item.details}%0A`;
            orderSummary += `- Price: £${item.price}%0A`;
        });
        
        // Calculate and add total
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        orderSummary += `%0A*TOTAL: £${totalPrice}*%0A%0A`;
        
        // Add delivery instructions prompt
        orderSummary += `Please reply with:%0A`;
        orderSummary += `1. Delivery address%0A`;
        orderSummary += `2. Preferred delivery date/time%0A`;
        orderSummary += `3. Any special instructions%0A%0A`;
        orderSummary += `Thank you!`;
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/447869990011?text=${orderSummary}`;
        
        // Open WhatsApp with order details
        window.open(whatsappUrl, '_blank');
    });

    // [Rest of your existing code remains the same]
+});