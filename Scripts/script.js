// script.js

// Select all add-to-cart buttons
const cartButtons = document.querySelectorAll(".cart");

// Select cart display section
const cartTitle = document.querySelector(".our_cart");
const cartContainer = document.createElement("div");
document.querySelectorAll("body > div")[1].appendChild(cartContainer);

// Store cart items
let cartItems = [];

// Function to update cart UI
function updateCartUI() {
    // Update cart count
    cartTitle.textContent = `Your Cart (${cartItems.length})`;

    // Clear old cart display
    cartContainer.innerHTML = "zero";

    // If cart is empty
    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    // Display each cart item
    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.style.marginBottom = "15px";
        itemDiv.style.padding = "10px";
        itemDiv.style.borderBottom = "1px solid #ccc";

        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>${item.description}</p>
            <p>${item.price}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    // Add remove functionality
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.dataset.index;
            cartItems.splice(index, 1);
            updateCartUI();
        });
    });
}

// Add click event to each Add to Cart button
cartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const productCard = this.closest(".listproductdiv");

        const name = productCard.querySelector(".productName").textContent.trim();
        const description = productCard.querySelector(".productDescription").textContent.trim();
        const price = productCard.querySelector(".productPrice").textContent.trim();

        // Add product to cart array
        cartItems.push({
            name,
            description,
            price
        });

        // Refresh cart display
        updateCartUI();
    });
});

// Initialize empty cart
updateCartUI();