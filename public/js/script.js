// Function to handle user logout
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    // If logout is successful, redirect to the home page
    document.location.replace('/');
  } else {
    // If logout fails, display an alert and log the response status text
    alert("You must login first.");
    console.log(response.statusText);
  }
};

// Check if the current URL pathname is '/dashboard'
if (window.location.pathname == '/dashboard') { 
  // If the condition is true, find the element with the ID 'add-post-btn' and remove the 'hide-button' class
  const addPostBtn = document.getElementById('add-post-btn');
  addPostBtn.classList.remove('hide-button');
}
