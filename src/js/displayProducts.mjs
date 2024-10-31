// src/js/displayProducts.mjs

// Fetch main product categories
export async function fetchProductCategories() {
    try {
      const response = await fetch('/json/product.json'); // Relative path in public folder
      const categories = await response.json();
      displayCategories(categories);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    }
  }
  
  // Function to display product categories
  function displayCategories(categories) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear any previous content
  
    categories.forEach(category => {
      const categoryCard = document.createElement('div');
      categoryCard.classList.add('category-card');
      categoryCard.innerHTML = `
        <img src="${category.image}" alt="${category.name}" class="category-image" />
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <button class="view-details" data-link="${category.link}">View ${category.name}</button>
      `;
  
      productList.appendChild(categoryCard);
    });
  
    // Add event listeners for each button to fetch category details
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', () => {
        const categoryLink = button.getAttribute('data-link');
        fetchCategoryDetails(categoryLink);
      });
    });
  }
  
  // Fetch details of a specific category
  async function fetchCategoryDetails(link) {
    try {
      const response = await fetch(link);
      const categoryDetails = await response.json();
      displayCategoryDetails(categoryDetails);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  }
  
  // Function to display category details
  function displayCategoryDetails(details) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = `<h2>${details.category}</h2>`; // Set category name as heading
  
    details.items.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.classList.add('product-card');
      itemCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="product-image" />
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="product-price">${item.price}</p>
      `;
  
      productList.appendChild(itemCard);
    });
  }
  
  // Initialize fetching product categories on page load
  document.addEventListener('DOMContentLoaded', fetchProductCategories);
  