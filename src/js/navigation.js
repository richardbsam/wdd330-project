// Select the nav and the toggle button
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

// Add event listener to the toggle button
navToggle.addEventListener('click', () => {
  // Toggle the 'open' class on the nav element
  nav.classList.toggle('open');
});
