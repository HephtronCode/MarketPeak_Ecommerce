(function ($) {

"use strict";

// NAVBAR
$('.navbar-nav .nav-link').click(function(){
    $(".navbar-collapse").collapse('hide');
});

// PROJECTS IMAGE RESIZE
function NewsImageResize(){      
  var LargeImage = $('.projects-thumb-small .projects-image').height();

  $('.projects-thumb-large').css('height', LargeImage + 'px');
}

$(window).on("resize", NewsImageResize);
$(document).on("ready", NewsImageResize);

$('.custom-link').click(function(){
var el = $(this).attr('href');
var elWrapped = $(el);
var header_height = $('.navbar').height() + 10;

scrollToDiv(elWrapped,header_height);
return false;

function scrollToDiv(element,navheight){
  var offset = element.offset();
  var offsetTop = offset.top;
  var totalScroll = offsetTop-navheight;

  $('body,html').animate({
  scrollTop: totalScroll
  }, 300);
}
});

// Cart functionality
let cart = [];
let wishlist = [];

// Add to cart
function addToCart(productId, name, price, image) {
    const item = {
        id: productId,
        name: name,
        price: price,
        image: image,
        quantity: 1
    };
    
    const existingItem = cart.find(i => i.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }
    
    updateCartCount();
    showNotification('Product added to cart!');
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Add to wishlist
function addToWishlist(productId, name, price, image) {
    const item = {
        id: productId,
        name: name,
        price: price,
        image: image
    };
    
    if (!wishlist.find(i => i.id === productId)) {
        wishlist.push(item);
        showNotification('Product added to wishlist!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification fade-in';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi-check-circle-fill"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Product quick view
function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.dataset.productId;
            const productName = button.dataset.productName;
            const productPrice = button.dataset.productPrice;
            const productImage = button.dataset.productImage;
            
            showQuickViewModal(productId, productName, productPrice, productImage);
        });
    });
}

// Show quick view modal
function showQuickViewModal(productId, name, price, image) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${image}" class="img-fluid" alt="${name}">
                        </div>
                        <div class="col-md-6">
                            <h4 class="price">$${price}</h4>
                            <p class="description">Product description goes here...</p>
                            <div class="quantity-selector mb-3">
                                <label>Quantity:</label>
                                <div class="input-group" style="width: 150px;">
                                    <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(-1)">-</button>
                                    <input type="number" class="form-control text-center" value="1" min="1" id="quantity">
                                    <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(1)">+</button>
                                </div>
                            </div>
                            <button class="btn btn-primary" onclick="addToCart('${productId}', '${name}', ${price}, '${image}')">
                                Add to Cart
                            </button>
                            <button class="btn btn-outline-primary ms-2" onclick="addToWishlist('${productId}', '${name}', ${price}, '${image}')">
                                <i class="bi-heart"></i> Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

// Update quantity in quick view
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let newValue = parseInt(quantityInput.value) + change;
    newValue = Math.max(1, newValue);
    quantityInput.value = newValue;
}

// Initialize product filters
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterProducts(category);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Filter products
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        searchProducts(searchTerm);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase();
            searchProducts(searchTerm);
        }
    });
}

// Search products
function searchProducts(searchTerm) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productName = product.querySelector('h5').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    initQuickView();
    initProductFilters();
    initSearch();
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

})(window.jQuery);


