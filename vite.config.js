import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  

  // Set publicDir to point to src/public, which will contain JSON, images, and partials
  publicDir: "public",

  
  //Modify your vite to reflect the changes in your project structure:
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        product: resolve(__dirname, "src/pet-products/index.html"),
        productListing: resolve(__dirname, "src/product-listing/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        profile: resolve(__dirname, "src/pet-profiles/index.html"),
        contact: resolve(__dirname, "src/contact/index.html"),
      },
    },
  },
});


