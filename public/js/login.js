// Function to handle the login form submission
const loginFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the user's email and password from the input fields
    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPassword').value.trim();

    // Check if both email and password are provided
    if (email && password) {
        // Send a POST request to the '/api/users/login' endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }), // Convert the data to JSON
            headers: { 'Content-Type': 'application/json' }, // Set the request headers
        });

        // Check if the response was successful (status code 200-299)
        if (response.ok) {
            // Redirect the user to the dashboard page
            document.location.replace('/dashboard');
        } else {
            // Display an error message if the login credentials are incorrect
            alert("Incorrect email or password, please try again.");
        }
    }
};

// Attach the loginFormHandler function to the submit event of the login form
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
