// Get necessary elements from HTML
const minusButtons = document.querySelectorAll('.minus-button');
const plusButtons = document.querySelectorAll('.plus-button');
const qtyInputs = document.querySelectorAll('input[type="text"]');
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
const bubbleCount = document.querySelector('.bubble-count');
const productRows = document.querySelectorAll('tbody tr');

// Initialize variables
let cartItems = [];
let cartItemCount = 0;

// Function to update bubble count in mini cart
function updateBubbleCount() {
    bubbleCount.textContent = cartItemCount;
}

// Add event listener for minus button
minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Make sure quantity doesn't go negative
        if (qtyInputs[index].value > 0) {
            qtyInputs[index].value--;
        }
    });
});

// Add event listener for plus button
plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        qtyInputs[index].value++;
    });
});

// Add event listener for add to cart button
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Get product information from corresponding row
        const productRow = productRows[index];
        const imageSrc = productRow.querySelector('img').getAttribute('src');
        const title = productRow.querySelector('td:nth-child(2)').textContent;
        const price = productRow.querySelector('td:nth-child(3)').textContent;
        const qty = parseInt(qtyInputs[index].value);

        // Check if quantity is greater than 0
        if (qty > 0) {
            // Add item to cart
            const item = {
                imageSrc: imageSrc,
                title: title,
                price: price,
                qty: qty
            };
            cartItems.push(item);
            cartItemCount += qty;

            // Update bubble count in mini cart
            updateBubbleCount();

            // Reset quantity box
            qtyInputs[index].value = 0;

            // Save cartItems to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Create notification
            const notification = document.createElement('div');
            notification.classList.add('notification');
            notification.innerHTML = `<p>Item ${title} (quantity: ${qty}) has been added to your cart.</p><button class="view-cart-button" onclick="location.href='cart.html'">View Cart</button>`;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.remove();
            }, 15000);
        }
    });
});

// Check if there are saved cartItems in localStorage
if (localStorage.getItem('cartItems')) {
    // If there are, get cartItems and cartItemCount
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartItemCount = cartItems.reduce((total, item) => total + item.qty, 0);

    // Update bubble count in mini cart
    updateBubbleCount();
}
