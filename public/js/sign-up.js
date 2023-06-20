// Function to handle user sign up
const signUpHandler = async (event) => {
    event.preventDefault();
  
    // Get the values of username, email, and password from the input fields
    const name = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (name && email && password) {
      // If all fields are filled, send a POST request to '/api/users' with the user data
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Log the response for debugging purposes
      console.log(response);
  
      if (response.ok) {
        // If sign up is successful, redirect to the dashboard page
        document.location.replace('/dashboard');
      } else {
        // If sign up fails, display an alert with the response status text
        alert(response.statusText);
      }
    }
  };
  
  // Attach the signUpHandler function to the submit event of the '.signup-form' element
  document.querySelector('.signup-form').addEventListener('submit', signUpHandler);
  