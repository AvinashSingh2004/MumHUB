function toggleTheme() {
        const body = document.body;
        const header = document.querySelector('header.navbar'); // Select the header
    
        // Toggle dark theme class
        body.classList.toggle('dark-theme');
        if (header) {
            header.classList.toggle('dark-theme'); // Toggle dark theme on the header
        }
    
        // Save the theme preference in local storage
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark'); // Save theme preference
        } else {
            localStorage.setItem('theme', 'light'); // Save theme preference
        }
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