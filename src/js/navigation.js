// Select DOM elements
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('#navbar');

// Function to toggle 'active' class
const toggleNavbar = () => {
  navbar.classList.toggle('active');
};

// Add event listener for toggle button
navToggle.addEventListener('click', toggleNavbar);
