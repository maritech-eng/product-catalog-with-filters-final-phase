// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        rating: 4.5,
        image: "https://via.placeholder.com/300x200/3498db/ffffff?text=Headphones"
    },
    {
        id: 2,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        rating: 4.2,
        image: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=T-Shirt"
    },
    {
        id: 3,
        name: "JavaScript Book",
        price: 39.99,
        category: "books",
        rating: 4.8,
        image: "https://via.placeholder.com/300x200/2ecc71/ffffff?text=Book"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        rating: 4.3,
        image: "https://via.placeholder.com/300x200/9b59b6/ffffff?text=Smart+Watch"
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 79.99,
        category: "home",
        rating: 4.1,
        image: "https://via.placeholder.com/300x200/f39c12/ffffff?text=Coffee+Maker"
    },
    {
        id: 6,
        name: "Jeans",
        price: 49.99,
        category: "clothing",
        rating: 4.0,
        image: "https://via.placeholder.com/300x200/34495e/ffffff?text=Jeans"
    },
    {
        id: 7,
        name: "Python Programming",
        price: 45.99,
        category: "books",
        rating: 4.7,
        image: "https://via.placeholder.com/300x200/1abc9c/ffffff?text=Python+Book"
    },
    {
        id: 8,
        name: "Desk Lamp",
        price: 29.99,
        category: "home",
        rating: 4.4,
        image: "https://via.placeholder.com/300x200/e67e22/ffffff?text=Desk+Lamp"
    },
    {
        id: 9,
        name: "Bluetooth Speaker",
        price: 59.99,
        category: "electronics",
        rating: 4.6,
        image: "https://via.placeholder.com/300x200/3498db/ffffff?text=Speaker"
    },
    {
        id: 10,
        name: "Winter Jacket",
        price: 89.99,
        category: "clothing",
        rating: 4.3,
        image: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=Jacket"
    },
    {
        id: 11,
        name: "Garden Tools Set",
        price: 34.99,
        category: "home",
        rating: 4.2,
        image: "https://via.placeholder.com/300x200/2ecc71/ffffff?text=Garden+Tools"
    },
    {
        id: 12,
        name: "Web Development Guide",
        price: 55.99,
        category: "books",
        rating: 4.9,
        image: "https://via.placeholder.com/300x200/9b59b6/ffffff?text=Web+Dev+Book"
    }
];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const productCount = document.getElementById('product-count');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-by');
const ratingFilter = document.getElementById('rating-filter');
const resetButton = document.getElementById('reset-filters');

// Initialize
function init() {
    displayProducts(products);
    setupEventListeners();
}

// Display products
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    
    productCount.textContent = `${productsToDisplay.length} products`;
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Generate star rating HTML
    const stars = generateStarRating(product.rating);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-price">$${product.price}</div>
        <div class="product-rating">${stars} (${product.rating})</div>
    `;
    
    return card;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    // Half star
    if (halfStar) {
        stars += '½';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

// Filter products based on current filters
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    
    const priceRange = document.querySelector('input[name="price"]:checked').value;
    const minRating = parseFloat(ratingFilter.value);
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        // Category filter
        if (!selectedCategories.includes(product.category)) {
            return false;
        }
        
        // Price filter
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            if (product.price < min || product.price > max) {
                return false;
            }
        }
        
        // Rating filter
        if (product.rating < minRating) {
            return false;
        }
        
        // Search filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    // Sort products
    const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
    
    displayProducts(sortedProducts);
}

// Sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
        default:
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    return sorted;
}

// Reset all filters
function resetFilters() {
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    
    // Reset radio buttons
    document.querySelector('input[name="price"][value="all"]').checked = true;
    
    // Reset select and search
    ratingFilter.value = '0';
    searchInput.value = '';
    sortSelect.value = 'name';
    
    filterProducts();
}

// Setup event listeners
function setupEventListeners() {
    // Filter events
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    document.querySelectorAll('input[name="price"]').forEach(radio => {
        radio.addEventListener('change', filterProducts);
    });
    
    ratingFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    sortSelect.addEventListener('change', filterProducts);
    resetButton.addEventListener('click', resetFilters);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);