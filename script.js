const products = [
    {
        id: 1,
        name: "Classic Red Roses",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        description: "A timeless arrangement of 12 premium red roses."
    },
    {
        id: 2,
        name: "Spring Tulips",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80",
        description: "Bright and cheerful multi-colored tulips."
    },
    {
        id: 3,
        name: "Elegant Lilies",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1508610048659-a06666ba884c?auto=format&fit=crop&w=600&q=80",
        description: "Pure white lilies, perfect for sophisticated occasions."
    },
    {
        id: 4,
        name: "Wildflower Mix",
        price: 40.00,
        image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=600&q=80",
        description: "A rustic blend of seasonal wildflowers."
    },
    {
        id: 5,
        name: "Bridal Pastel Dream",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1519757020070-79880509424c?auto=format&fit=crop&w=600&q=80",
        description: "Soft pastels and peonies, ideal for weddings."
    },
    {
        id: 6,
        name: "Celebration Brights",
        price: 50.00,
        image: "https://images.unsplash.com/photo-1562690868-60bbe7624cd0?auto=format&fit=crop&w=600&q=80",
        description: "Vibrant and energetic blooms for birthdays."
    }
];

// State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('products');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const modal = document.getElementById('invoice-modal');
const closeModal = document.querySelector('.close-modal');
const invoiceItems = document.getElementById('invoice-items');
const totalPriceEl = document.getElementById('total-price');
const generateInvoiceBtn = document.getElementById('generate-invoice-btn');
const printBtn = document.getElementById('print-btn');

// Render Products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-btn" onclick="addToCart(${product.id})">Add to Request</button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    
    // Simple visual feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Added!";
    btn.style.background = "#d88398";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
    }, 1000);
};

// Update Cart UI
function updateCartUI() {
    cartCount.innerText = cart.length;
}

// Generate Invoice View
function renderInvoice() {
    if (cart.length === 0) {
        invoiceItems.innerHTML = "<p>Your request list is empty.</p>";
        totalPriceEl.innerText = "$0.00";
        return;
    }

    const counts = {};
    cart.forEach(item => {
        counts[item.id] = (counts[item.id] || 0) + 1;
    });

    // Create unique list for display
    const uniqueItems = [...new Set(cart.map(item => item))];
    
    // Filter duplicates based on ID for the list
    const displayedItems = [];
    const seenIds = new Set();
    cart.forEach(item => {
        if(!seenIds.has(item.id)) {
            seenIds.add(item.id);
            displayedItems.push(item);
        }
    });

    let total = 0;
    
    invoiceItems.innerHTML = displayedItems.map(item => {
        const qty = counts[item.id];
        const subtotal = item.price * qty;
        total += subtotal;
        return `
            <div class="invoice-item">
                <span>${item.name} (x${qty})</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
        `;
    }).join('');

    totalPriceEl.innerText = "$" + total.toFixed(2);
}

// Event Listeners
cartBtn.addEventListener('click', () => {
    renderInvoice();
    modal.classList.remove('hidden');
    printBtn.classList.add('hidden'); // Reset print state
    generateInvoiceBtn.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

generateInvoiceBtn.addEventListener('click', () => {
    // Simulate shopkeeper action
    if(cart.length > 0) {
        alert("Invoice generated! Ready for printing.");
        generateInvoiceBtn.classList.add('hidden');
        printBtn.classList.remove('hidden');
    }
});

// Init
renderProducts();
