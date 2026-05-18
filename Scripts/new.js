// script.js

const cartButtons = document.querySelectorAll(".cart");
const cartTitle = document.querySelector(".our_cart");
const cartContainer = document.createElement("div");
document.querySelectorAll("body > div")[1].appendChild(cartContainer);

// Store cart items
let cartItems = [];

// Function to update cart UI
function updateCartUI() {
    cartContainer.innerHTML = "";

    let totalCartPrice = 0;
    let totalItems = 0;

    // Calculate totals
    cartItems.forEach(item => {
        totalItems += item.quantity;
        totalCartPrice += item.quantity * item.price;
    });

    // Update cart title
    cartTitle.textContent = `Your Cart (${totalItems})`;

    // Empty cart message
    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    // Display products
    cartItems.forEach((item, index) => {
        const itemTotal = item.quantity * item.price;

        const itemDiv = document.createElement("div");
        itemDiv.style.marginBottom = "15px";
        itemDiv.style.padding = "10px";
        itemDiv.style.borderBottom = "1px solid #ccc";

        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>${item.description}</p>
            <p>Unit Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${itemTotal.toFixed(2)}</p>
            <button class="remove-btn" data-index="${index}">Remove One</button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    // Show grand total
    const totalDiv = document.createElement("div");
    totalDiv.style.marginTop = "20px";
    totalDiv.style.padding = "15px";
    totalDiv.style.fontWeight = "bold";
    totalDiv.innerHTML = `Grand Total: $${totalCartPrice.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);

    // Remove item functionality
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.dataset.index;

            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            } else {
                cartItems.splice(index, 1);
            }

            updateCartUI();
        });
    });
}

// Add to cart button functionality
cartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const productCard = this.closest(".listproductdiv");

        const name = productCard.querySelector(".productName").textContent.trim();
        const description = productCard.querySelector(".productDescription").textContent.trim();
        const priceText = productCard.querySelector(".productPrice").textContent.trim();
        const price = parseFloat(priceText.replace("$", ""));

        // Check if item already exists
        const existingItem = cartItems.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                name,
                description,
                price,
                quantity: 1
            });
        }

        updateCartUI();
    });
});

// Initialize cart
updateCartUI();