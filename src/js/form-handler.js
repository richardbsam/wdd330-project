// js/form-handler.js
document.getElementById('pet-profile-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);

    // Send form data to the server
    fetch('/api/submit-pet-profile', { // Make sure the URL matches your deployed endpoint
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Assuming the server responds with JSON
        }
        throw new Error('Network response was not ok. Status: ' + response.status);
    })
    .then(data => {
        console.log('Success:', data);
        showFlashMessage('Profile saved successfully!', 'success'); // Show flash message
        document.getElementById('pet-profile-form').reset(); // Reset form fields
    })
    .catch(error => {
        console.error('Error:', error);
        showFlashMessage('There was an error saving the profile: ' + error.message, 'error'); // Show error message
    });
});



// Function to display flash messages
function showFlashMessage(message, type) {
    const flashMessageContainer = document.createElement('div');
    flashMessageContainer.className = `flash-message ${type}`; // Add appropriate class for styling
    flashMessageContainer.textContent = message;

    document.body.appendChild(flashMessageContainer); // Append the message to the body

    // Remove the flash message after 3 seconds
    setTimeout(() => {
        flashMessageContainer.remove();
    }, 3000);
}


