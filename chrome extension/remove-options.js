// Function to remove all options except those with value="1" and value="3"
function removeOptions() {
    // Get all <select> elements within the form
    var allSelects = document.querySelectorAll('form table select');

    // Loop through each <select> element
    allSelects.forEach(function(select) {
        // Get all <option> elements within this <select>
        var options = Array.from(select.options); // Convert options collection to an array

        // Loop through all options and remove those not matching "1" or "3"
        options.forEach(function(option) {
            if (option.value !== "1" && option.value !== "3") {
                select.removeChild(option);
            }
        });
    });
}

// Add a mutation observer to ensure changes are captured dynamically
function observeDOMChanges() {
    const observer = new MutationObserver(() => {
        removeOptions();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Call the function and set up the observer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    removeOptions();
    observeDOMChanges();
});