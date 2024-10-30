
        function toggleDetails(petId) {
            const petDetails = document.getElementById(petId);
            if (petDetails.style.display === "none" || petDetails.style.display === "") {
                petDetails.style.display = "block"; // Show pet details
            } else {
                petDetails.style.display = "none"; // Hide pet details
            }
        }
