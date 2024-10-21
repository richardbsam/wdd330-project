import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector("#cartTotal");
    const itemNumElement = document.querySelector("#num-items");

    // Check that both elements are not null
    if (!summaryElement || !itemNumElement) {
        console.error("Element not found: ", summaryElement, itemNumElement);
        return; // Stops execution if no element is found
    }

    itemNumElement.innerText = this.list.length;

    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = "$" + this.itemTotal.toFixed(2);

    // Call the calculateTotal function after the itemTotal calculation is complete.
    this.calculateOrderTotal(); 
}

  calculateOrderTotal() {
    this.shipping = 10 + (this.list.length - 1) * 2; // Base shipping cost
    this.tax = (this.itemTotal * 0.06).toFixed(2); // 6% tax rate
    this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // Use direct selectors to ensure correct access
    const shipping = document.querySelector("#shipping");
    const tax = document.querySelector("#tax");
    const orderTotal = document.querySelector("#orderTotal");

    // Check that the returned value is not null before attempting to access innerText.
    if (shipping && tax && orderTotal) {
        shipping.innerText = "$" + this.shipping.toFixed(2);
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    } else {
        console.error("One or more elements not found: ", shipping, tax, orderTotal);
    }
}

async checkout() {
    const formElement = document.forms["checkout"];
    const json = formDataToJSON(formElement);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
        const res = await services.checkout(json);
        console.log("Response from server:", res);
        console.log("Error message from server:", res.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์

        // เปลี่ยนการตรวจสอบเงื่อนไข
        if (res.orderId) {  // ตรวจสอบว่ามี orderId หมายถึงการสั่งซื้อสำเร็จ
            alert("Order placed successfully! Order ID: " + res.orderId);
            // Redirect to confirmation page if needed
        } else {
            alert("There was an error processing your order: " + res.message);
        }
    } catch (err) {
        console.log(err);
        alert("Something went wrong. Please try again later.");
    }
}
}
