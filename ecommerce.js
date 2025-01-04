// NEXT : add functionality for faker product data : https://fakerjs.dev/api/commerce.html
//          load product data from faker and render it on the page in products array

// NEXT : add functionality for faker checkout : https://fakerjs.dev/api/finance.html



// SIXTH ITERATION

// Ensure "DOMContentLoaded" is correctly handling product rendering
let products = [];
let cart = [];
let bookmarkedProducts = new Set();

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    setupSearchBar();
    setupCheckoutButton();
    setupFooterToggle();
});

// Fetch product data from products.json
function loadProducts() {
    fetch('./data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            products = data;
            renderTags();
            renderProducts();
        })
        .catch(error => console.error('Error loading products:', error));
}

// Render tags
function renderTags() {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    const tagsContainer = document.getElementById("tags");
    tagsContainer.innerHTML = uniqueCategories
        .map(category => `<span class="tag" onclick="filterByTag('${category}')">${category}</span>`)
        .join("");
}

// Render products
function renderProducts(filteredProducts = products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    const categories = [...new Set(filteredProducts.map(product => product.category))];
    categories.forEach(category => {
        const categorySection = document.createElement("div");
        categorySection.className = "category";
        categorySection.innerHTML = `<h3 class="carousel-track">${category}</h3>`;

        const carousel = document.createElement("div");
        carousel.className = "carousel";
        carousel.innerHTML = `
            <button class="carousel-button prev" onclick="scrollCarousel('${category}', -1)">&#8592;</button>
            <div class="carousel-track" id="carousel-${category}"></div>
            <button class="carousel-button next" onclick="scrollCarousel('${category}', 1)">&#8594;</button>
        `;

        const track = carousel.querySelector(".carousel-track");
        const categoryProducts = filteredProducts.filter(product => product.category === category);

        categoryProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.setAttribute("data-product-id", product.id);
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h5>${product.name}</h5>
                <p class="productDescription">${product.description}</p>
                <div>
                    <p class="price">$${product.price}</p>
                    <i class="bi bi-cart product-cart" style="font-size: 1.5rem; color:#44a27b;"></i>
                    <i class="bi bi-bookmark product-bookmark" style="font-size: 1.5rem; color:#44a27b;"></i>
                </div>
            `;
            track.appendChild(productDiv);
        });

        categorySection.appendChild(carousel);
        productsContainer.appendChild(categorySection);
    });

    setupProductListeners();
}

// Scroll carousel
function scrollCarousel(category, direction) {
    const track = document.getElementById(`carousel-${category}`);
    const scrollAmount = direction * 300;
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

// Setup product event listeners
function setupProductListeners() {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const cartIcon = product.querySelector(".product-cart");
        const bookmarkIcon = product.querySelector(".product-bookmark");
        const productId = product.getAttribute("data-product-id");

        cartIcon.addEventListener("click", () => toggleCart(productId));
        bookmarkIcon.addEventListener("click", () => toggleBookmark(productId));
    });
}

// Toggle cart
function toggleCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartIcon = document.querySelector(`.product[data-product-id="${productId}"] .product-cart`);

    if (cart.includes(product)) {
        cart = cart.filter(p => p.id !== productId);
        cartIcon.classList.remove("bi-cart-check");
        cartIcon.classList.add("bi-cart");
    } else {
        cart.push(product);
        cartIcon.classList.remove("bi-cart");
        cartIcon.classList.add("bi-cart-check");
    }

    renderCart();
}

// Toggle bookmark
function toggleBookmark(productId) {
    const product = products.find(p => p.id === productId);
    const bookmarkIcon = document.querySelector(`.product[data-product-id="${productId}"] .product-bookmark`);

    if (bookmarkedProducts.has(productId)) {
        bookmarkedProducts.delete(productId);
        bookmarkIcon.classList.remove("bi-bookmark-check");
        bookmarkIcon.classList.add("bi-bookmark");
    } else {
        bookmarkedProducts.add(productId);
        bookmarkIcon.classList.remove("bi-bookmark");
        bookmarkIcon.classList.add("bi-bookmark-check");
    }

    updateBookmarkedList();
}

let recentOrders = []
// Render cart
function renderCart(recentOrder) {
    const cartSidebar = document.getElementById("cartSidebar");
    cartSidebar.classList.remove("hidden");

    const cartList = document.getElementById("cartList");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");

    cartList.innerHTML = cart.map(product => `<p><span class="left">${product.name}</span> <span class="right">$${product.price}</span></p>`).join("");

    const subtotal = cart.reduce((sum, product) => sum + parseFloat(product.price), 0);
    const tax = +(subtotal * 0.1).toFixed(2);
    const shipping = +(cart.length > 0 ? (subtotal + tax) * 0.02 : 0).toFixed(2);
    const total = subtotal + tax + shipping;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax}`;
    shippingElement.textContent = `$${shipping}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    if(recentOrders.length > 0){
        document.getElementById("recentOrdersWrapper").classList.remove("hidden");
    }
}

// Update bookmarked list
function updateBookmarkedList() {
    const bookmarkedList = document.querySelector(".bookmarked-list");
    bookmarkedList.innerHTML = "";

    bookmarkedProducts.forEach(productId => {
        const product = products.find(p => p.id === productId);
        const listItem = document.createElement("div");
        listItem.textContent = product.name;
        bookmarkedList.appendChild(listItem);
    });
}

// Setup footer toggle
function setupFooterToggle() {
    const toggleBookmarkFooter = document.querySelector(".toggle-bookmark-footer");
    const bookmarkFooter = document.querySelector(".bookmark-footer");

    toggleBookmarkFooter.addEventListener("click", () => {
        bookmarkFooter.classList.toggle("open");
    });
}

// Setup search bar
function setupSearchBar() {
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        renderProducts(filteredProducts);
    });
}

// Filter by tag
function filterByTag(category) {
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts);
}

// Setup checkout button
function setupCheckoutButton() {
    const checkoutButton = document.getElementById("checkoutButton");
    checkoutButton.addEventListener("click", () => {
        // alert("Order Completed!");
        let orderDate = new Date();
        let order = {orderDate:orderDate, cart:cart}
        let recentOrder = []
        recentOrder.push(order);

        renderCart(recentOrder);
        cart = [];
    });
}





// FIFTH ITERATION

// let products = [];
// let cart = [];
// let bookmarkedProducts = new Set();

// Initialize page
// document.addEventListener("DOMContentLoaded", () => {
//     loadProducts();
//     setupSearchBar();
//     setupCheckoutButton();
//     setupFooterToggle();
// });

// // Fetch product data from products.json
// fetch('./data/products.json')
//   .then((response) => response.json())
//   .then((data) => {
//     products = data;
//     document.addEventListener('DOMContentLoaded', () => {
//       renderTags();
//       renderProducts();
//       setupSearchBar();
//       setupCheckoutButton();
//       setupFooterToggle();
//     });
//   })
//   .catch((error) => console.error('Error loading products:', error));
// // fetch('./data/products.json')
// //   .then((response) => response.json())
// //   .then((data) => {
// //     products = data;
// //     document.addEventListener('DOMContentLoaded', () => {
// //       renderTags();
// //       renderProducts();
// //       setupSearchBar();
// //       setupCheckoutButton();
// //       setupFooterToggle();
// //     });
// //   })
// //   .catch((error) => console.error('Error loading products:', error));

// let cart = [];
// let bookmarkedProducts = new Set();

// // Render tags
// // function renderTags() {
// //     const uniqueCategories = [...new Set(products.map(product => product.category))];
// //     const tagsContainer = document.getElementById("tags");
// //     tagsContainer.innerHTML = uniqueCategories
// //         .map(category => `<span class="tag" onclick="filterByTag('${category}')">${category}</span>`)
// //         .join("");
// // }
// function renderTags() {
//     const uniqueCategories = [...new Set(products.map((product) => product.category))];
//     const tagsContainer = document.getElementById('tags');
//     tagsContainer.innerHTML = uniqueCategories
//         .map(
//         (category) => `<span class="tag" onclick="filterByTag('${category}')">${category}</span>`
//         )
//         .join('');
// }

// // Render products
// // function renderProducts(filteredProducts = products) {
// //     const productsContainer = document.getElementById("products");
// //     productsContainer.innerHTML = "";

// //     const categories = [...new Set(filteredProducts.map(product => product.category))];
// //     categories.forEach(category => {
// //         const categorySection = document.createElement("div");
// //         categorySection.className = "category";
// //         categorySection.innerHTML = `<h3>${category}</h3>`;

// //         const rowDiv = document.createElement("div");
// //         rowDiv.className = "product-row";

// //         const categoryProducts = filteredProducts.filter(product => product.category === category);
// //         categoryProducts.forEach(product => {
// //             const productDiv = document.createElement("div");
// //             productDiv.className = "product";
// //             productDiv.setAttribute("data-product-id", product.id);
// //             productDiv.innerHTML = `
// //                 <img src="${product.image}" alt="${product.name}">
// //                 <h4>${product.name}</h4>
// //                 <p class="price">$${product.price}</p>
// //                 <i class="bi bi-cart product-cart" style="font-size: 1.5rem; color:#44a27b;"></i>
// //                 <i class="bi bi-bookmark product-bookmark" style="font-size: 1.5rem; color:#44a27b;"></i>
// //             `;
// //             rowDiv.appendChild(productDiv);
// //         });

// //         categorySection.appendChild(rowDiv);
// //         productsContainer.appendChild(categorySection);
// //     });

// //     setupProductListeners();
// // }
// function renderProducts(filteredProducts = products) {
//     const productsContainer = document.getElementById('products');
//     productsContainer.innerHTML = '';
  
//     const categories = [...new Set(filteredProducts.map((product) => product.category))];
//     categories.forEach((category) => {
//       const categorySection = document.createElement('div');
//       categorySection.className = 'category';
//       categorySection.innerHTML = `<h3>${category}</h3>`;
  
//       const carousel = document.createElement('div');
//       carousel.className = 'carousel';
//       carousel.innerHTML = `
//         <button class="carousel-button prev" onclick="scrollCarousel('${category}', -1)">&#8592;</button>
//         <div class="carousel-track" id="carousel-${category}"></div>
//         <button class="carousel-button next" onclick="scrollCarousel('${category}', 1)">&#8594;</button>
//       `;
  
//       const track = carousel.querySelector('.carousel-track');
  
//       const categoryProducts = filteredProducts.filter(
//         (product) => product.category === category
//       );
  
//       categoryProducts.forEach((product) => {
//         const productDiv = document.createElement('div');
//         productDiv.className = 'product';
//         productDiv.setAttribute('data-product-id', product.id);
//         productDiv.innerHTML = `
//           <img src="${product.image}" alt="${product.name}">
//           <h4>${product.name}</h4>
//           <p class="price">$${product.price}</p>
//           <i class="bi bi-cart product-cart" style="font-size: 1.5rem; color:#44a27b;"></i>
//           <i class="bi bi-bookmark product-bookmark" style="font-size: 1.5rem; color:#44a27b;"></i>
//         `;
//         track.appendChild(productDiv);
//       });
  
//       categorySection.appendChild(carousel);
//       productsContainer.appendChild(categorySection);
//     });
  
//     setupProductListeners();
//   }

// // Scroll carousel
// function scrollCarousel(category, direction) {
//     const track = document.getElementById(`carousel-${category}`);
//     const scrollAmount = direction * 300; // Adjust scroll amount as needed
//     track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//   }
  
//   // Setup product event listeners
//   function setupProductListeners() {
//     const products = document.querySelectorAll('.product');
  
//     products.forEach((product) => {
//       const cartIcon = product.querySelector('.product-cart');
//       const bookmarkIcon = product.querySelector('.product-bookmark');
//       const productId = product.getAttribute('data-product-id');
  
//       // Cart functionality
//       cartIcon.addEventListener('click', () => toggleCart(productId));
  
//       // Bookmark functionality
//       bookmarkIcon.addEventListener('click', () => toggleBookmark(productId));
//     });
//   }


// // Setup product event listeners
// function setupProductListeners() {
//     const products = document.querySelectorAll(".product");

//     products.forEach(product => {
//         const cartIcon = product.querySelector(".product-cart");
//         const bookmarkIcon = product.querySelector(".product-bookmark");
//         const productId = product.getAttribute("data-product-id");

//         // Cart functionality
//         cartIcon.addEventListener("click", () => toggleCart(productId));

//         // Bookmark functionality
//         bookmarkIcon.addEventListener("click", () => toggleBookmark(productId));
//     });
// }

// // Toggle cart
// function toggleCart(productId) {
//     const product = products.find(p => p.id === productId);
//     const cartIcon = document.querySelector(`.product[data-product-id="${productId}"] .product-cart`);

//     if (cart.includes(product)) {
//         cart = cart.filter(p => p.id !== productId);
//         cartIcon.classList.remove("bi-cart-check");
//         cartIcon.classList.add("bi-cart");
//     } else {
//         cart.push(product);
//         cartIcon.classList.remove("bi-cart");
//         cartIcon.classList.add("bi-cart-check");
//     }

//     renderCart();
// }

// // Toggle bookmark
// function toggleBookmark(productId) {
//     const product = products.find(p => p.id === productId);
//     const bookmarkIcon = document.querySelector(`.product[data-product-id="${productId}"] .product-bookmark`);

//     if (bookmarkedProducts.has(productId)) {
//         bookmarkedProducts.delete(productId);
//         bookmarkIcon.classList.remove("bi-bookmark-check");
//         bookmarkIcon.classList.add("bi-bookmark");
//     } else {
//         bookmarkedProducts.add(productId);
//         bookmarkIcon.classList.remove("bi-bookmark");
//         bookmarkIcon.classList.add("bi-bookmark-check");
//     }

//     updateBookmarkedList();
// }

// // Render cart
// function renderCart() {
//     const cartSidebar = document.getElementById("cartSidebar");
//     cartSidebar.classList.remove("hidden");

//     const cartList = document.getElementById("cartList");
//     const subtotalElement = document.getElementById("subtotal");
//     const taxElement = document.getElementById("tax");
//     const shippingElement = document.getElementById("shipping");
//     const totalElement = document.getElementById("total");

//     cartList.innerHTML = cart.map(product => `<p><span class="left">${product.name}</span>   <span class="right"> $${product.price}</span></p>`).join("");

//     const subtotal = cart.reduce((sum, product) => sum + parseFloat(product.price), 0);
//     const tax = +(subtotal * 0.1).toFixed(2); // 10% tax
//     const shipping = +(cart.length > 0 ? (subtotal + tax) * 0.02 : 0).toFixed(2);
//     const total = subtotal + tax + shipping;

//     subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
//     taxElement.textContent = `$${tax}`;
//     shippingElement.textContent = `$${shipping}`;
//     totalElement.textContent = `$${total.toFixed(2)}`;
// }

// // Update bookmarked list
// function updateBookmarkedList() {
//     const bookmarkedList = document.querySelector(".bookmarked-list");
//     bookmarkedList.innerHTML = ""; // Clear existing list

//     bookmarkedProducts.forEach(productId => {
//         const product = products.find(p => p.id === productId);
//         const listItem = document.createElement("div");
//         listItem.textContent = product.name;
//         bookmarkedList.appendChild(listItem);
//     });
// }

// // Setup footer toggle
// function setupFooterToggle() {
//     const toggleBookmarkFooter = document.querySelector(".toggle-bookmark-footer");
//     const bookmarkFooter = document.querySelector(".bookmark-footer");

//     toggleBookmarkFooter.addEventListener("click", () => {
//         bookmarkFooter.classList.toggle("open");
//     });
// }

// // Setup search bar
// function setupSearchBar() {
//     const searchBar = document.getElementById("searchBar");
//     searchBar.addEventListener("input", () => {
//         const searchTerm = searchBar.value.toLowerCase();
//         const filteredProducts = products.filter(product =>
//             product.name.toLowerCase().includes(searchTerm)
//         );
//         renderProducts(filteredProducts);
//     });
// }

// // Filter by tag
// function filterByTag(category) {
//     const filteredProducts = products.filter(product => product.category === category);
//     renderProducts(filteredProducts);
// }

// // Setup checkout button
// function setupCheckoutButton() {
//     const checkoutButton = document.getElementById("checkoutButton");
//     checkoutButton.addEventListener("click", () => {
//         alert("Order Completed!");
//         cart = [];
//         renderCart();
//         document.getElementById("cartSidebar").classList.add("hidden");
//     });
// }





// FOURTH ITERATION
// const products = [
//     { id: 1, name: "Laptop", category: "Electronics", price: 999, image: "laptop.jpg" },
//     { id: 2, name: "Headphones", category: "Electronics", price: 199, image: "headphones.jpg" },
//     { id: 3, name: "Shoes", category: "Fashion", price: 69, image: "shoes.jpg" },
//     { id: 4, name: "T-shirt", category: "Fashion", price: 29, image: "tshirt.jpg" },
// ];


// document.addEventListener("DOMContentLoaded", () => {
//     renderTags();
//     renderProducts();
//     setupSearchBar();
//     setupCheckoutButton();
//     setupFooterToggle();
// });

// let cart = [];
// let bookmarkedProducts = new Set();

// // Render tags
// function renderTags() {
//     const uniqueCategories = [...new Set(products.map(product => product.category))];
//     const tagsContainer = document.getElementById("tags");
//     tagsContainer.innerHTML = uniqueCategories
//         .map(category => `<span class="tag" onclick="filterByTag('${category}')">${category}</span>`)
//         .join("");
// }

// // Render products
// function renderProducts(filteredProducts = products) {
//     const productsContainer = document.getElementById("products");
//     productsContainer.innerHTML = "";

//     const categories = [...new Set(filteredProducts.map(product => product.category))];
//     categories.forEach(category => {
//         const categorySection = document.createElement("div");
//         categorySection.className = "category";
//         categorySection.innerHTML = `<h3>${category}</h3>`;

//         const categoryProducts = filteredProducts.filter(product => product.category === category);
//         const rowDiv = document.createElement("div");
//         rowDiv.className = "product-row";

//         categoryProducts.forEach(product => {
//             const productDiv = document.createElement("div");
//             productDiv.className = "product";
//             productDiv.setAttribute("data-product-id", product.id);
//             productDiv.innerHTML = `
//                 <img src="${product.image}" alt="${product.name}">
//                 <h4>${product.name}</h4>
//                 <p class="price">$${product.price}</p>
//                 <i class="bi bi-cart product-cart" style="font-size: 1.5rem; color:#44a27b;"></i>
//                 <i class="bi bi-bookmark product-bookmark" style="font-size: 1.5rem; color:#44a27b;"></i>
//             `;
//             rowDiv.appendChild(productDiv);
//         });

//         categorySection.appendChild(rowDiv);
//         productsContainer.appendChild(categorySection);
//     });

//     setupProductListeners();
// }

// // Setup product event listeners
// function setupProductListeners() {
//     const products = document.querySelectorAll(".product");

//     products.forEach(product => {
//         const cartIcon = product.querySelector(".product-cart");
//         const bookmarkIcon = product.querySelector(".product-bookmark");
//         const productId = parseInt(product.getAttribute("data-product-id"), 10);

//         // Cart functionality
//         cartIcon.addEventListener("click", () => toggleCart(productId));

//         // Bookmark functionality
//         bookmarkIcon.addEventListener("click", () => toggleBookmark(productId));
//     });
// }

// // Toggle cart
// function toggleCart(productId) {
//     const product = products.find(p => p.id === productId);
//     const cartIcon = document.querySelector(`.product[data-product-id="${productId}"] .product-cart`);

//     if (cart.includes(product)) {
//         cart = cart.filter(p => p.id !== productId);
//         cartIcon.classList.remove("bi-cart-check");
//         cartIcon.classList.add("bi-cart");
//     } else {
//         cart.push(product);
//         cartIcon.classList.remove("bi-cart");
//         cartIcon.classList.add("bi-cart-check");
//     }

//     renderCart();
// }

// // Toggle bookmark
// function toggleBookmark(productId) {
//     const product = products.find(p => p.id === productId);
//     const bookmarkIcon = document.querySelector(`.product[data-product-id="${productId}"] .product-bookmark`);

//     if (bookmarkedProducts.has(productId)) {
//         bookmarkedProducts.delete(productId);
//         bookmarkIcon.classList.remove("bi-bookmark-check");
//         bookmarkIcon.classList.add("bi-bookmark");
//     } else {
//         bookmarkedProducts.add(productId);
//         bookmarkIcon.classList.remove("bi-bookmark");
//         bookmarkIcon.classList.add("bi-bookmark-check");
//     }

//     updateBookmarkedList();
// }

// // Render cart
// function renderCart() {
//     const cartSidebar = document.getElementById("cartSidebar");
//     cartSidebar.classList.remove("hidden");

//     const cartList = document.getElementById("cartList");
//     const subtotalElement = document.getElementById("subtotal");
//     const taxElement = document.getElementById("tax");
//     const shippingElement = document.getElementById("shipping");
//     const totalElement = document.getElementById("total");

//     cartList.innerHTML = cart.map(product => `<p><span class="left">${product.name}</span>   <span class="right"> $${product.price}</span></p>`).join("");

//     const subtotal = cart.reduce((sum, product) => sum + product.price, 0);
//     const tax = +(subtotal * 0.1).toFixed(2); // 10% tax
//     const shipping = +(cart.length > 0 ? (subtotal + tax) * 0.02 : 0).toFixed(2);
//     const total = subtotal + tax + shipping;

//     subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
//     taxElement.textContent = `$${tax}`;
//     shippingElement.textContent = `$${shipping}`;
//     totalElement.textContent = `$${total.toFixed(2)}`;
// }

// // Update bookmarked list
// function updateBookmarkedList() {
//     const bookmarkedList = document.querySelector(".bookmarked-list");
//     bookmarkedList.innerHTML = ""; // Clear existing list

//     bookmarkedProducts.forEach(productId => {
//         const product = products.find(p => p.id === productId);
//         const listItem = document.createElement("div");
//         listItem.textContent = product.name;
//         bookmarkedList.appendChild(listItem);
//     });
// }

// // Setup footer toggle
// function setupFooterToggle() {
//     const toggleBookmarkFooter = document.querySelector(".toggle-bookmark-footer");
//     const bookmarkFooter = document.querySelector(".bookmark-footer");

//     toggleBookmarkFooter.addEventListener("click", () => {
//         bookmarkFooter.classList.toggle("open");
//     });
// }

// // Setup search bar
// function setupSearchBar() {
//     const searchBar = document.getElementById("searchBar");
//     searchBar.addEventListener("input", () => {
//         const searchTerm = searchBar.value.toLowerCase();
//         const filteredProducts = products.filter(product =>
//             product.name.toLowerCase().includes(searchTerm)
//         );
//         renderProducts(filteredProducts);
//     });
// }

// // Filter by tag
// function filterByTag(category) {
//     const filteredProducts = products.filter(product => product.category === category);
//     renderProducts(filteredProducts);
// }

// // Setup checkout button
// function setupCheckoutButton() {
//     const checkoutButton = document.getElementById("checkoutButton");
//     checkoutButton.addEventListener("click", () => {
//         alert("Order Completed!");
//         cart = [];
//         renderCart();
//         document.getElementById("cartSidebar").classList.add("hidden");
//     });
// }


// THIRD ITERATION

// Product Data
// const products = [
//     { id: 1, name: "Laptop", category: "Electronics", price: 999, image: "laptop.jpg" },
//     { id: 2, name: "Headphones", category: "Electronics", price: 199, image: "headphones.jpg" },
//     { id: 3, name: "Shoes", category: "Fashion", price: 69, image: "shoes.jpg" },
//     { id: 4, name: "T-shirt", category: "Fashion", price: 29, image: "tshirt.jpg" },
// ];

// let cart = [];
// let bookmarked = [];
// let bookmarkedProducts = new Set();

// // Initialize page
// document.addEventListener("DOMContentLoaded", () => {
//     renderTags();
//     renderProducts();
//     setupSearchBar();
//     setupCheckoutButton();
//     setupGlobalEventListeners();
//     setupBookmarkFooter();
// });

// // Render tags
// function renderTags() {
//     const uniqueCategories = [...new Set(products.map(product => product.category))];
//     const tagsContainer = document.getElementById("tags");
//     tagsContainer.innerHTML = uniqueCategories
//         .map(category => `<span class="tag" onclick="filterByTag('${category}')">${category}</span>`)
//         .join("");
// }

// // Render products
// function renderProducts(filteredProducts = products) {
//     const productsContainer = document.getElementById("products");
//     productsContainer.innerHTML = "";

//     const categories = [...new Set(filteredProducts.map(product => product.category))];
//     categories.forEach(category => {
//         const categorySection = document.createElement("div");
//         categorySection.className = "category";
//         categorySection.innerHTML = `<h3>${category}</h3>`;

//         const categoryRow = document.createElement("div");
//         categoryRow.className = "category-row"; // Add a row layout
//         categoryRow.style.display = "flex";
//         categoryRow.style.flexWrap = "wrap";
//         categoryRow.style.gap = "1em";

//         const categoryProducts = filteredProducts.filter(product => product.category === category);
//         categoryProducts.forEach(product => {
//             const productDiv = document.createElement("div");
//             productDiv.className = "product";
//             productDiv.setAttribute("data-product-id", product.id);
//             productDiv.innerHTML = `
//                 <img src="${product.image}" alt="${product.name}">
//                 <h4>${product.name}</h4>
//                 <p>$${product.price}</p>
//                 <i class="bi bi-cart product-cart" data-id="${product.id}"></i>
//                 <i class="bi bi-bookmark product-bookmark" data-id="${product.id}"></i>
//             `;
//             categoryRow.appendChild(productDiv);
//         });
//         categorySection.appendChild(categoryRow);
//         productsContainer.appendChild(categorySection);
//     });
// }

// // Search functionality
// function setupSearchBar() {
//     const searchBar = document.getElementById("searchBar");
//     searchBar.addEventListener("input", () => {
//         const searchTerm = searchBar.value.toLowerCase();
//         const filteredProducts = products.filter(product =>
//             product.name.toLowerCase().includes(searchTerm)
//         );
//         renderProducts(filteredProducts);
//     });
// }

// // Filter by tag
// function filterByTag(category) {
//     const filteredProducts = products.filter(product => product.category === category);
//     renderProducts(filteredProducts);
// }

// // Global Event Listeners
// function setupGlobalEventListeners() {
//     document.getElementById("products").addEventListener("click", event => {
//         const productElement = event.target.closest(".product");
//         if (!productElement) return;

//         const productId = parseInt(productElement.getAttribute("data-product-id"));

//         if (event.target.classList.contains("product-cart")) {
//             toggleCart(productId);
//             updateCartIcon(event.target);
//         }

//         if (event.target.classList.contains("product-bookmark")) {
//             toggleBookmark(productId);
//             updateBookmarkIcon(event.target);
//         }
//     });
// }

// // Update Cart Icon
// function updateCartIcon(cartIcon) {
//     const productId = parseInt(cartIcon.closest(".product").getAttribute("data-product-id"));
//     if (cart.find(p => p.id === productId)) {
//         cartIcon.className = "bi bi-cart-check product-cart";
//     } else {
//         cartIcon.className = "bi bi-cart product-cart";
//     }
// }

// // Update Bookmark Icon
// function updateBookmarkIcon(bookmarkIcon) {
//     const productId = parseInt(bookmarkIcon.closest(".product").getAttribute("data-product-id"));
//     if (bookmarked.find(p => p.id === productId)) {
//         bookmarkIcon.className = "bi bi-bookmark-check product-bookmark";
//     } else {
//         bookmarkIcon.className = "bi bi-bookmark product-bookmark";
//     }
// }

// // Toggle cart
// function toggleCart(productId) {
//     const product = products.find(p => p.id === productId);
//     if (cart.includes(product)) {
//         cart = cart.filter(p => p.id !== productId);
//     } else {
//         cart.push(product);
//     }
//     renderCart();
// }

// // Toggle bookmark
// function toggleBookmark(productId) {
//     const product = products.find(p => p.id === productId);
//     if (bookmarked.includes(product)) {
//         bookmarked = bookmarked.filter(p => p.id !== productId);
//     } else {
//         bookmarked.push(product);
//     }
//     updateBookmarkedFooter();
// }

// // Render cart
// function renderCart() {
//     const cartSidebar = document.getElementById("cartSidebar");
//     cartSidebar.classList.remove("hidden");

//     const cartList = document.getElementById("cartList");
//     const subtotalElement = document.getElementById("subtotal");
//     const taxElement = document.getElementById("tax");
//     const totalElement = document.getElementById("total");

//     cartList.innerHTML = cart.map(product => `<li>${product.name} - $${product.price}</li>`).join("");

//     const subtotal = cart.reduce((sum, product) => sum + product.price, 0);
//     const tax = +(subtotal * 0.1).toFixed(2); // 10% tax
//     const shipping = cart.length > 0 ? 10 : 0;
//     const total = subtotal + tax + shipping;

//     subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
//     taxElement.textContent = `$${tax}`;
//     totalElement.textContent = `$${total.toFixed(2)}`;
// }

// // Setup checkout button
// function setupCheckoutButton() {
//     const checkoutButton = document.getElementById("checkoutButton");
//     checkoutButton.addEventListener("click", () => {
//         alert("Order Completed!");
//         cart = [];
//         renderCart();
//         document.getElementById("cartSidebar").classList.add("hidden");
//     });
// }

// // function updateBookmarkedFooter() {
// //     bookmarkedList.innerHTML = "";
// //     bookmarked.forEach(product => {
// //         const listItem = document.createElement("div");
// //         listItem.className = "bookmarked-item";
// //         listItem.innerHTML = `
// //             <img src="${product.image}" alt="${product.name}">
// //             <p>${product.name}</p>
// //         `;
// //         bookmarkedList.appendChild(listItem);
// //     });
// // }

// // Bookmark Footer
// function setupBookmarkFooter() {
//     const toggleBookmarkFooter = document.querySelector(".toggle-bookmark-footer");
//     const bookmarkFooter = document.querySelector(".bookmark-footer");
//     const bookmarkedList = document.querySelector(".bookmarked-list");

//     toggleBookmarkFooter.addEventListener("click", () => {
//         bookmarkFooter.classList.toggle("open");
//     });

//     const updateBookmarkedList = () => {
//         bookmarkedList.innerHTML = ""; // Clear list
//         bookmarked.forEach(product => {
//             const productDiv = document.createElement("div");
//             productDiv.className = "product";
//             productDiv.innerHTML = `
//                 <img src="${product.image}" alt="${product.name}">
//                 <h4>${product.name}</h4>
//             `;
//             bookmarkedList.appendChild(productDiv);
//         });
//     };

//     window.updateBookmarkedList = updateBookmarkedList; // Expose globally
// }




// SECOND ITERATION

// const products = [
    // { id: 1, name: "Laptop", category: "Electronics", price: 999, image: "laptop.jpg" },
    // { id: 2, name: "Headphones", category: "Electronics", price: 199, image: "headphones.jpg" },
    // { id: 3, name: "Shoes", category: "Fashion", price: 69, image: "shoes.jpg" },
    // { id: 4, name: "T-shirt", category: "Fashion", price: 29, image: "tshirt.jpg" },
// ];

// let cart = [];
// let bookmarked = [];

// // Initialize page
// document.addEventListener("DOMContentLoaded", () => {
//     renderTags();
//     renderProducts();
//     setupSearchBar();
//     setupCheckoutButton();
//     setupGlobalEventListeners();
// });

// // Render tags
// function renderTags() {
//     const uniqueCategories = [...new Set(products.map(product => product.category))];
//     const tagsContainer = document.getElementById("tags");
//     tagsContainer.innerHTML = uniqueCategories
//         .map(category => `<span class="tag" onclick="filterByTag('${category}')">${category}</span>`)
//         .join("");
// }

// // Render products
// function renderProducts(filteredProducts = products) {
//     const productsContainer = document.getElementById("products");
//     productsContainer.innerHTML = "";

//     const categories = [...new Set(filteredProducts.map(product => product.category))];
//     categories.forEach(category => {
//         const categorySection = document.createElement("div");
//         categorySection.className = "category";
//         categorySection.innerHTML = `<h3>${category}</h3>`;

//         const categoryProducts = filteredProducts.filter(product => product.category === category);
//         categoryProducts.forEach(product => {
//             const productDiv = document.createElement("div");
//             productDiv.className = "product";
//             productDiv.setAttribute("data-product-id", product.id);
//             productDiv.innerHTML = `
//                 <img src="${product.image}" alt="${product.name}">
//                 <h4>${product.name}</h4>
//                 <p>$${product.price}</p>
//                 <i class="bi bi-cart product-cart"></i>
//                 <i class="bi bi-bookmark product-bookmark"></i>
//             `;
//             categorySection.appendChild(productDiv);
//         });

//         productsContainer.appendChild(categorySection);
//     });
// }

// // Search functionality
// function setupSearchBar() {
//     const searchBar = document.getElementById("searchBar");
//     searchBar.addEventListener("input", () => {
//         const searchTerm = searchBar.value.toLowerCase();
//         const filteredProducts = products.filter(product =>
//             product.name.toLowerCase().includes(searchTerm)
//         );
//         renderProducts(filteredProducts);
//     });
// }

// // Filter by tag
// function filterByTag(category) {
//     const filteredProducts = products.filter(product => product.category === category);
//     renderProducts(filteredProducts);
// }

// // Global Event Listeners
// function setupGlobalEventListeners() {
//     document.getElementById("products").addEventListener("click", event => {
//         const productElement = event.target.closest(".product");
//         if (!productElement) return;

//         const productId = parseInt(productElement.getAttribute("data-product-id"));
//         const product = products.find(p => p.id === productId);

//         if (event.target.classList.contains("product-cart")) {
//             toggleCart(productId);
//             updateCartIcon(event.target);
//         }

//         if (event.target.classList.contains("product-bookmark")) {
//             toggleBookmark(productId);
//             updateBookmarkIcon(event.target);
//         }
//     });
// }

// // Update Cart Icon
// function updateCartIcon(cartIcon) {
//     if (cart.find(p => p.id === parseInt(cartIcon.closest(".product").getAttribute("data-product-id")))) {
//         cartIcon.className = "bi bi-cart-check product-cart";
//     } else {
//         cartIcon.className = "bi bi-cart product-cart";
//     }
// }

// // Update Bookmark Icon
// function updateBookmarkIcon(bookmarkIcon) {
//     if (bookmarked.find(p => p.id === parseInt(bookmarkIcon.closest(".product").getAttribute("data-product-id")))) {
//         bookmarkIcon.className = "bi bi-bookmark-check product-bookmark";
//     } else {
//         bookmarkIcon.className = "bi bi-bookmark product-bookmark";
//     }
// }

// // Toggle cart
// function toggleCart(productId) {
//     const product = products.find(p => p.id === productId);
//     if (cart.includes(product)) {
//         cart = cart.filter(p => p.id !== productId);
//     } else {
//         cart.push(product);
//     }
//     renderCart();
// }

// // Toggle bookmark
// function toggleBookmark(productId) {
//     const product = products.find(p => p.id === productId);
//     if (bookmarked.includes(product)) {
//         bookmarked = bookmarked.filter(p => p.id !== productId);
//     } else {
//         bookmarked.push(product);
//     }
// }

// // Render cart
// function renderCart() {
//     // Same cart rendering logic as before
// }

// // Setup checkout button
// function setupCheckoutButton() {
//     // Same checkout button logic as before
// }



// FIRST ITERATION

// const products = [
//     {
//         id: 1, name: "Laptop", category: "Electronics", price: 999, image: "laptop.jpg"
//     },
//     {
//         id: 2, name: "Headphones", category: "Electronics", price: 199, image: "headphones.jpg"
//     },
//     {
//         id: 3, name: "Shoes", category: "Fashion", price: 69, image: "shoes.jpg"
//     },
//     {
//         id: 4, name: "T-shirt", category: "Fashion", price: 29, image: "tshirt.jpg"
//     },
// ];

// let cart = [];
// let bookmarked = [];

// // Initialize page
// document.addEventListener("DOMContentLoaded", () => {
//     renderTags();
//     renderProducts();
//     setupSearchBar();
//     setupCheckoutButton();
// });

// // Render tags
// function renderTags() {
//     const uniqueCategories = [...new Set(products.map(product => product.category))];
//     const tagsContainer = document.getElementById("tags");
//     tagsContainer.innerHTML = uniqueCategories
//         .map(category => `<span class="tag" onclick="filterByTag('${category}')">${category}</span>`)
//         .join("");
// }

// // Render products
// function renderProducts(filteredProducts = products) {
//     const productsContainer = document.getElementById("products");
//     productsContainer.innerHTML = "";

//     const categories = [...new Set(filteredProducts.map(product => product.category))];
//     categories.forEach(category => {
//         const categorySection = document.createElement("div");
//         categorySection.className = "category";
//         categorySection.innerHTML = `<h3>${category}</h3>`;

//         const categoryProducts = filteredProducts.filter(product => product.category === category);
//         categoryProducts.forEach(product => {
//             const productDiv = document.createElement("div");
//             productDiv.className = "product";
//             productDiv.innerHTML = `
//                 <img src="${product.image}" alt="${product.name}">
//                 <h4>${product.name}</h4>
//                 <p>$${product.price}</p>
//                 <button class="cart-icon" onclick="toggleCart(${product.id})">🛒</button>
//                 <button class="bookmark-icon" onclick="toggleBookmark(${product.id})">🔖</button>
//             `;
//             categorySection.appendChild(productDiv);
//         });

//         productsContainer.appendChild(categorySection);
//     });
// }

// // Search functionality
// function setupSearchBar() {
//     const searchBar = document.getElementById("searchBar");
//     searchBar.addEventListener("input", () => {
//         const searchTerm = searchBar.value.toLowerCase();
//         const filteredProducts = products.filter(product =>
//             product.name.toLowerCase().includes(searchTerm)
//         );
//         renderProducts(filteredProducts);
//     });
// }

// // Filter by tag
// function filterByTag(category) {
//     const filteredProducts = products.filter(product => product.category === category);
//     renderProducts(filteredProducts);
// }

// // Toggle cart
// function toggleCart(productId) {
//     const product = products.find(p => p.id === productId);
//     if (cart.includes(product)) {
//         cart = cart.filter(p => p.id !== productId);
//     } else {
//         cart.push(product);
//     }
//     renderCart();
// }

// // Toggle bookmark
// function toggleBookmark(productId) {
//     const product = products.find(p => p.id === productId);
//     if (bookmarked.includes(product)) {
//         bookmarked = bookmarked.filter(p => p.id !== productId);
//     } else {
//         bookmarked.push(product);
//     }
// }

// // Render cart
// function renderCart() {
//     const cartSidebar = document.getElementById("cartSidebar");
//     cartSidebar.classList.remove("hidden");

//     const cartList = document.getElementById("cartList");
//     const subtotalElement = document.getElementById("subtotal");
//     const taxElement = document.getElementById("tax");
//     const totalElement = document.getElementById("total");

//     cartList.innerHTML = cart.map(product => `<li>${product.name} - $${product.price}</li>`).join("");

//     const subtotal = cart.reduce((sum, product) => sum + product.price, 0);
//     const tax = +(subtotal * 0.1).toFixed(2); // 10% tax
//     const shipping = cart.length > 0 ? 10 : 0;
//     const total = subtotal + tax + shipping;

//     subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
//     taxElement.textContent = `$${tax}`;
//     totalElement.textContent = `$${total.toFixed(2)}`;
// }

// // Setup checkout button
// function setupCheckoutButton() {
//     const checkoutButton = document.getElementById("checkoutButton");
//     checkoutButton.addEventListener("click", () => {
//         alert("Order Completed!");
//         cart = [];
//         renderCart();
//         document.getElementById("cartSidebar").classList.add("hidden");
//     });
// }


// document.addEventListener('DOMContentLoaded', () => {
//     const products = document.querySelectorAll('.product');
    // const bookmarkFooter = document.querySelector('.bookmark-footer');
    // const bookmarkedList = document.querySelector('.bookmarked-list');
    // const toggleBookmarkFooter = document.querySelector('.toggle-bookmark-footer');
    // let bookmarkedProducts = new Set();

//     products.forEach(product => {
//         const cartIcon = product.querySelector('.product-cart');
//         const bookmarkIcon = product.querySelector('.product-bookmark');

//         // Cart functionality
//         cartIcon.addEventListener('mouseover', () => {
//             if (!cartIcon.classList.contains('bi-cart-check')) {
//                 cartIcon.classList.add('bi-cart-plus');
//                 cartIcon.classList.remove('bi-cart');
//             }
//         });

//         cartIcon.addEventListener('mouseout', () => {
//             if (!cartIcon.classList.contains('bi-cart-check')) {
//                 cartIcon.classList.add('bi-cart');
//                 cartIcon.classList.remove('bi-cart-plus');
//             }
//         });

//         cartIcon.addEventListener('click', () => {
//             if (cartIcon.classList.contains('bi-cart-plus')) {
//                 cartIcon.classList.add('bi-cart-check');
//                 cartIcon.classList.remove('bi-cart-plus');
//             } else if (cartIcon.classList.contains('bi-cart-check')) {
//                 cartIcon.classList.add('bi-cart');
//                 cartIcon.classList.remove('bi-cart-check');
//             }
//         });

//         // Bookmark functionality
//         bookmarkIcon.addEventListener('mouseover', () => {
//             if (!bookmarkIcon.classList.contains('bi-bookmark-check')) {
//                 bookmarkIcon.classList.add('bi-bookmark-plus');
//                 bookmarkIcon.classList.remove('bi-bookmark');
//             }
//         });

//         bookmarkIcon.addEventListener('mouseout', () => {
//             if (!bookmarkIcon.classList.contains('bi-bookmark-check')) {
//                 bookmarkIcon.classList.add('bi-bookmark');
//                 bookmarkIcon.classList.remove('bi-bookmark-plus');
//             }
//         });

//         bookmarkIcon.addEventListener('click', () => {
//             const productId = product.getAttribute('data-product-id');
//             if (bookmarkIcon.classList.contains('bi-bookmark-plus')) {
//                 bookmarkIcon.classList.add('bi-bookmark-check');
//                 bookmarkIcon.classList.remove('bi-bookmark-plus');
//                 bookmarkedProducts.add(productId);
//                 updateBookmarkedList();
//             } else if (bookmarkIcon.classList.contains('bi-bookmark-check')) {
//                 bookmarkIcon.classList.add('bi-bookmark');
//                 bookmarkIcon.classList.remove('bi-bookmark-check');
//                 bookmarkedProducts.delete(productId);
//                 updateBookmarkedList();
//             }
//         });
//     });

//     // Toggle bookmark footer
//     toggleBookmarkFooter.addEventListener('click', () => {
//         bookmarkFooter.classList.toggle('open');
//     });

//     // Update bookmarked list in the footer
//     const updateBookmarkedList = () => {
//         bookmarkedList.innerHTML = ''; // Clear existing list
//         bookmarkedProducts.forEach(productId => {
//             const product = document.querySelector(`.product[data-product-id="${productId}"]`);
//             if (product) {
//                 const clonedProduct = product.cloneNode(true);
//                 bookmarkedList.appendChild(clonedProduct);
//             }
//         });
//     };
// });
