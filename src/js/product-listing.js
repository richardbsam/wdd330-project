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



// Function to fetch pet food product data from Open Pet Food Facts API
async function fetchPetFoodProduct() {
  const apiUrl = 'https://world.openpetfoodfacts.org/api/v0/product/20106836.json';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const productData = await response.json();
    displayProductData(productData.product);
  } catch (error) {
    console.error('Error fetching product data:', error);
    document.getElementById('product-details').textContent = 'Failed to load product details.';
  }
}

// Function to display product details on the webpage
function displayProductData(product) {
  const productDetailsContainer = document.getElementById('product-details');

  // Clear any existing content
  productDetailsContainer.innerHTML = '';

  // Create HTML content with product data
  const productContent = `
    <div class="product-card">
      <img src="${product.image_url || ''}" alt="${product.product_name || 'Product Image'}" class="product-image" />
      <h2>${product.product_name || 'No Product Name Available'}</h2>
      <p><strong>Brand:</strong> ${product.brands || 'No Brand Available'}</p>
      <p><strong>Ingredients:</strong> ${product.ingredients_text || 'No Ingredients Available'}</p>
      <p><strong>Categories:</strong> ${product.categories || 'No Categories Available'}</p>
      <p><strong>Quantity:</strong> ${product.quantity || 'No Quantity Available'}</p>
      <p><strong>Origin:</strong> ${product.countries_tags?.join(', ') || 'No Origin Information Available'}</p>
      <p><strong>Nutriscore:</strong> ${product.nutrition_grades || 'Not Rated'}</p>
    </div>
  `;

  // Insert content into the container
  productDetailsContainer.innerHTML = productContent;
}

// Initialize fetching the product data when the page loads
document.addEventListener('DOMContentLoaded', fetchPetFoodProduct);




