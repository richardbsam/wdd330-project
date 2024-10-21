import { getLocalStorage, setLocalStorage } from "./utils.mjs"; // Assuming setLocalStorage exists

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="product_pages/${item.Id}.html" class="cart-card__image">
      <img
        src="${item.Images.PrimaryLarge}"
        alt="${item.Name}"
      />
    </a>
    <a href="product_pages/${item.Id}.html">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-index="${index}"> Remove</button> 
  </li>`;
  return newItem;
}

export default class ShoppingCart {
  constructor(key, productListSelector, summarySelector, cartFooterSelector) {
    this.key = key;
    this.productListSelector = productListSelector;
    this.summarySelector = summarySelector;
    this.cartFooterSelector = cartFooterSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);

    // If there are no products in the cart, a message will appear stating "Cart is empty".
    if (!cartItems || cartItems.length === 0) {
      document.querySelector(this.productListSelector).innerHTML = "<p>Your cart is empty</p>";
      document.querySelector(this.cartFooterSelector).classList.add("hide");
      return;
    }

    // Show items in cart
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(this.productListSelector).innerHTML = htmlItems.join("");

    // Show delete product button
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        this.removeItem(index);
      });
    });

    // Show the total price in the cart
    this.renderCartSummary(cartItems);
    document.querySelector(this.cartFooterSelector).classList.remove("hide");
  }

  // Function delete item from cart.
  removeItem(index) {
    let cartItems = getLocalStorage(this.key);
    cartItems.splice(index, 1); // deleted item as index
    setLocalStorage(this.key, cartItems); // update localStorage
    this.renderCartContents(); // refesh cart after deleted
  }

  // Function calculate the cart price 
  renderCartSummary(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(this.summarySelector).textContent = `Total: $${total.toFixed(2)}`;
  }

  init() {
    this.renderCartContents();
  }
}

/*
import { getLocalStorage } from "./utils.mjs";


function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}

export default class ShoppingCart {
    constructor() {
      this.cart = [];
    }

    async init() {
      // Fetch cart items from the data source
      const cartItems = await this.getData();
      if (cartItems) {
        this.renderCart(cartItems);
      }
    }

    async getData() {
      try {
        const response = await fetch("./json/tents.json");
        if (response.ok) {
          const data = await response.json(); // successfully fetched data
          return data;
        } else {

          return null; // return null if fetch fails
        }
      } catch (error) {
        return null; // return null if there's a network error
      }
    }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    if (cartItems.length === 0) {
      document.querySelector(this.parentSelector).innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item)).join("");
    document.querySelector(this.parentSelector).innerHTML = htmlItems;
  }

  updateCartTotal() {
    const cartItems = getLocalStorage(this.key) || [];
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector("#cart-total").textContent = `Total: $${total}`;

    // Show the cart-footer if there are items in the cart
    const cartFooter = document.querySelector(".cart-footer");
    if (cartItems.length > 0) {
      cartFooter.classList.remove("hide");
    } else {
      cartFooter.classList.add("hide");
    }
  }
}
  */
