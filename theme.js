function toggleTheme() {
        const body = document.body;
        const header = document.querySelector('header.navbar'); // Select the header
    
        // Toggle dark theme class
        body.classList.toggle('dark-theme');
        if (header) {
            header.classList.toggle('dark-theme'); // Toggle dark theme on the header
        }
    
        // Save the theme preference in local storage
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}
    
    // Function to load the theme on page load
    function loadTheme() {
        const theme = localStorage.getItem('theme');
        const body = document.body;
        const header = document.querySelector('header.navbar'); // Select the header
    
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (header) {
                header.classList.add('dark-theme'); // Apply dark theme to the header
            }
        } else {
            body.classList.remove('dark-theme');
            if (header) {
                header.classList.remove('dark-theme'); // Remove dark theme from the header
            }
        }
    }
    
    // Call loadTheme on page load
    document.addEventListener('DOMContentLoaded', loadTheme);

    // Select all buttons and relevant elements
const buttons = document.querySelectorAll('.download-btn, .info-btn, .send-btn, .bttn, .bton, .bten, .btnn, .btun, .btn, #calculateButton, .btn-add, .btn-remove, .btn-share, .btn-calculate');

// Add touch event listeners to each button
buttons.forEach(button => {
    button.addEventListener('touchstart', function() {
        this.classList.add('active'); // Add active class on touch
    });

    button.addEventListener('touchend', function() {
        this.classList.remove('active'); // Remove active class when touch ends
    });

    button.addEventListener('touchcancel', function() {
        this.classList.remove('active'); // Remove active class if touch is canceled
    });
});