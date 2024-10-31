// Import necessary modules
import ProductData from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";


// Load the header and footer dynamically
loadHeaderFooter();

// Get the category parameter from the URL
const category = getParam("category");

// Create an instance of the ProductData class and pass the category
const dataSource = new ProductData();

// Get the element where the product list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductList class, passing the necessary data
const myList = new ProductList(category, dataSource, listElement);

// Call the init method to render the product list
myList.init();





// src/js/product-listing.js

// Fetch products from the main JSON file
async function fetchProducts() {
  try {
    const response = await fetch('https://world.openpetfoodfacts.org/api/v0/product/20106836.json');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to display the products on the page
function displayProducts(products) {
  const productList = document.getElementById('product-list');

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <button class="view-details" data-link="${product.link}">View Products</button>
    `;

    productList.appendChild(productCard);
  });

  // Add event listeners to buttons
  const viewButtons = document.querySelectorAll('.view-details');
  viewButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productLink = this.getAttribute('data-link');
      fetchProductDetails(productLink);
    });
  });
}

// Fetch details of a specific product category from its JSON file
async function fetchProductDetails(link) {
  try {
    const response = await fetch(link);
    const productDetails = await response.json();

    // Display the category name as the heading
    const categoryHeading = document.getElementById('category-heading');
    categoryHeading.textContent = productDetails.category;

    displayProductDetails(productDetails);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

// Function to display product details and add "Add to Cart" button
function displayProductDetails(details) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Clear previous products

  details.items.forEach(item => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="product-image" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p class="product-price">${item.price}</p>
      <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
    `;

    productList.appendChild(productCard);
  });

  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.getAttribute('data-id');
      const productName = this.getAttribute('data-name');
      const productPrice = this.getAttribute('data-price');
      addToCart({ id: productId, name: productName, price: productPrice });
    });
  });
}

// Function to handle adding products to the cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  alert(`${product.name} has been added to your cart.`);
}

// Initialize fetching the products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);
