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
