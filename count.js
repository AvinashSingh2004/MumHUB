// Get the elements to display pageviews and visits
const pageviewsCount = document.getElementById('pageviews-count');
const visitsCount = document.getElementById('visits-count');

// Debounce variables
let lastCall = 0; // Declare lastCall before using it
const debounceDelay = 10; // 1 second

// Function to update the counter
function updateCounter(type) {
    console.log('updateCounter called with type:', type); // Log the call
    const now = Date.now();
    
    // Prevent rapid calls
    if (now - lastCall < debounceDelay) return; 
    lastCall = now;

    // Fetch the updated counts from the server
    fetch('http://127.0.0.1:3002/api?' + type)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Update the displayed counts
            pageviewsCount.textContent = data.pageviews;
            visitsCount.textContent = data.visits;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Check if this is a new visit and update the session storage
if (sessionStorage.getItem('visit') === null) {
    // New visit and pageview
    updateCounter('type=visit-pageview');
    sessionStorage.setItem('visit', 'x'); // Set the session storage item to indicate a visit
} else {
    // Pageview
    updateCounter('type=pageview');
}